"use strict";

(function () {

    /*
     * =========================================================
     * LUMENIX DATA BRIDGE
     * Central System + Legacy localStorage Compatibility
     * =========================================================
     */

    const SYSTEM_KEY = "lumenixSystemData";

    const LEGACY_MAP = {

        lumenixLightingDealers: [
            "lighting",
            "dealers"
        ],

        lumenixLightingCustomers: [
            "lighting",
            "customers"
        ],

        lumenixShopkeeperPartners: [
            "service",
            "partners"
        ],

        lumenixServiceTechnicians: [
            "service",
            "technicians"
        ],

        lumenixServiceCustomers: [
            "service",
            "customers"
        ]

    };


    /*
     * =========================================================
     * KEEP ORIGINAL STORAGE METHODS
     * =========================================================
     */

    const originalGetItem =
        Storage.prototype.getItem;

    const originalSetItem =
        Storage.prototype.setItem;

    const originalRemoveItem =
        Storage.prototype.removeItem;


    /*
     * =========================================================
     * DEFAULT SYSTEM
     * =========================================================
     */

    const DEFAULT_DATA = {

        lighting: {

            dealers: [],
            customers: [],
            orders: [],
            payments: [],
            returns: [],
            replacements: []

        },

        service: {

            partners: [],
            technicians: [],
            customers: [],
            requests: [],
            payments: [],
            replacements: [],
            history: []

        }

    };


    /*
     * =========================================================
     * SAFE JSON PARSER
     * =========================================================
     */

    function safeParse(
        value,
        fallback
    ) {

        try {

            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {
                return fallback;
            }

            const parsed =
                JSON.parse(value);

            return parsed;

        } catch (error) {

            return fallback;

        }

    }


    /*
     * =========================================================
     * DEEP DEFAULT CLONE
     * =========================================================
     */

    function cloneDefaults() {

        return JSON.parse(
            JSON.stringify(
                DEFAULT_DATA
            )
        );

    }


    /*
     * =========================================================
     * MERGE SYSTEM DATA
     * =========================================================
     */

    function mergeDefaults(
        defaults,
        saved
    ) {

        const result =
            JSON.parse(
                JSON.stringify(
                    defaults
                )
            );


        if (
            !saved ||
            typeof saved !== "object"
        ) {

            return result;

        }


        Object.keys(saved)
            .forEach(
                function (section) {

                    if (
                        !saved[section] ||
                        typeof saved[section] !==
                        "object"
                    ) {
                        return;
                    }


                    if (
                        !result[section]
                    ) {

                        result[section] =
                            saved[section];

                        return;

                    }


                    Object.keys(
                        saved[section]
                    )
                    .forEach(
                        function (collection) {

                            if (
                                Array.isArray(
                                    saved[
                                        section
                                    ][
                                        collection
                                    ]
                                )
                            ) {

                                result[
                                    section
                                ][
                                    collection
                                ] =
                                    saved[
                                        section
                                    ][
                                        collection
                                    ];

                            }

                        }
                    );

                }
            );


        return result;

    }


    /*
     * =========================================================
     * LOAD SYSTEM
     * IMPORTANT:
     * Uses ORIGINAL getItem to avoid bridge recursion.
     * =========================================================
     */

    function loadSystem() {

        const raw =
            originalGetItem.call(
                localStorage,
                SYSTEM_KEY
            );


        if (!raw) {

            return cloneDefaults();

        }


        const saved =
            safeParse(
                raw,
                null
            );


        if (!saved) {

            return cloneDefaults();

        }


        return mergeDefaults(
            DEFAULT_DATA,
            saved
        );

    }


    /*
     * =========================================================
     * SAVE SYSTEM
     * IMPORTANT:
     * Uses ORIGINAL setItem.
     * =========================================================
     */

    function saveSystem(
        data
    ) {

        originalSetItem.call(
            localStorage,
            SYSTEM_KEY,
            JSON.stringify(data)
        );

    }


    /*
     * =========================================================
     * LEGACY MIGRATION
     * IMPORTANT:
     * NEVER use overridden localStorage.getItem here.
     * =========================================================
     */

    function migrateLegacyData() {

        const system =
            loadSystem();


        let changed = false;


        Object.keys(
            LEGACY_MAP
        )
        .forEach(
            function (legacyKey) {

                const raw =
                    originalGetItem.call(
                        localStorage,
                        legacyKey
                    );


                if (!raw) {
                    return;
                }


                const oldData =
                    safeParse(
                        raw,
                        []
                    );


                if (
                    !Array.isArray(
                        oldData
                    ) ||
                    oldData.length === 0
                ) {

                    return;

                }


                const section =
                    LEGACY_MAP[
                        legacyKey
                    ][0];


                const collection =
                    LEGACY_MAP[
                        legacyKey
                    ][1];


                if (
                    !system[section] ||
                    !Array.isArray(
                        system[
                            section
                        ][
                            collection
                        ]
                    )
                ) {

                    return;

                }


                const current =
                    system[
                        section
                    ][
                        collection
                    ];


                const existingIds =
                    new Set(
                        current
                            .map(
                                function (item) {

                                    return item &&
                                        item.id
                                        ? String(
                                            item.id
                                        )
                                        : null;

                                }
                            )
                            .filter(Boolean)
                    );


                oldData.forEach(
                    function (item) {

                        if (
                            !item ||
                            typeof item !==
                            "object"
                        ) {

                            return;

                        }


                        const itemId =
                            item.id
                            ? String(
                                item.id
                            )
                            : null;


                        if (
                            itemId &&
                            existingIds.has(
                                itemId
                            )
                        ) {

                            return;

                        }


                        current.push(
                            item
                        );


                        if (itemId) {

                            existingIds.add(
                                itemId
                            );

                        }


                        changed = true;

                    }
                );

            }
        );


        if (changed) {

            saveSystem(
                system
            );

        }


        return system;

    }


    /*
     * =========================================================
     * GET LEGACY COLLECTION
     * =========================================================
     */

    function getCollection(
        key
    ) {

        const mapping =
            LEGACY_MAP[key];


        if (!mapping) {

            return null;

        }


        /*
         * First migrate old records safely.
         */

        const system =
            migrateLegacyData();


        if (
            !system[mapping[0]] ||
            !Array.isArray(
                system[
                    mapping[0]
                ][
                    mapping[1]
                ]
            )
        ) {

            return [];

        }


        return system[
            mapping[0]
        ][
            mapping[1]
        ];

    }


    /*
     * =========================================================
     * SET LEGACY COLLECTION
     * =========================================================
     */

    function setCollection(
        key,
        value
    ) {

        const mapping =
            LEGACY_MAP[key];


        if (!mapping) {

            return false;

        }


        const system =
            loadSystem();


        if (
            !system[mapping[0]]
        ) {

            system[mapping[0]] = {};

        }


        system[
            mapping[0]
        ][
            mapping[1]
        ] =
            Array.isArray(value)
                ? value
                : [];


        saveSystem(
            system
        );


        return true;

    }


    /*
     * =========================================================
     * ID GENERATOR
     * =========================================================
     */

    function createId(
        prefix
    ) {

        return (
            String(prefix || "LUX") +
            "-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 8)
        );

    }


    /*
     * =========================================================
     * ADD RECORD
     * =========================================================
     */

    function addRecord(
        section,
        collection,
        record
    ) {

        const system =
            loadSystem();


        if (
            !system[section] ||
            !Array.isArray(
                system[
                    section
                ][
                    collection
                ]
            )
        ) {

            return null;

        }


        const newRecord = {

            id:
                record &&
                record.id
                    ? record.id
                    : createId("LUX"),

            createdAt:
                record &&
                record.createdAt
                    ? record.createdAt
                    : new Date()
                        .toISOString(),

            ...(record || {})

        };


        system[
            section
        ][
            collection
        ].push(
            newRecord
        );


        saveSystem(
            system
        );


        return newRecord;

    }


    /*
     * =========================================================
     * GET RECORDS
     * =========================================================
     */

    function getRecords(
        section,
        collection
    ) {

        const system =
            loadSystem();


        if (
            !system[section] ||
            !Array.isArray(
                system[
                    section
                ][
                    collection
                ]
            )
        ) {

            return [];

        }


        return system[
            section
        ][
            collection
        ];

    }


    /*
     * =========================================================
     * FIND RECORD
     * =========================================================
     */

    function findRecord(
        section,
        collection,
        id
    ) {

        if (
            id === null ||
            id === undefined
        ) {

            return null;

        }


        const records =
            getRecords(
                section,
                collection
            );


        return (
            records.find(
                function (item) {

                    return (
                        item &&
                        String(item.id) ===
                        String(id)
                    );

                }
            ) || null
        );

    }


    /*
     * =========================================================
     * UPDATE RECORD
     * =========================================================
     */

    function updateRecord(
        section,
        collection,
        id,
        updates
    ) {

        const system =
            loadSystem();


        if (
            !system[section] ||
            !Array.isArray(
                system[
                    section
                ][
                    collection
                ]
            )
        ) {

            return null;

        }


        const index =
            system[
                section
            ][
                collection
            ].findIndex(
                function (item) {

                    return (
                        item &&
                        String(item.id) ===
                        String(id)
                    );

                }
            );


        if (index === -1) {

            return null;

        }


        system[
            section
        ][
            collection
        ][index] = {

            ...system[
                section
            ][
                collection
            ][index],

            ...(updates || {}),

            updatedAt:
                new Date()
                    .toISOString()

        };


        saveSystem(
            system
        );


        return system[
            section
        ][
            collection
        ][index];

    }


    /*
     * =========================================================
     * REMOVE RECORD
     * =========================================================
     */

    function removeRecord(
        section,
        collection,
        id
    ) {

        const system =
            loadSystem();


        if (
            !system[section] ||
            !Array.isArray(
                system[
                    section
                ][
                    collection
                ]
            )
        ) {

            return false;

        }


        const before =
            system[
                section
            ][
                collection
            ].length;


        system[
            section
        ][
            collection
        ] =
            system[
                section
            ][
                collection
            ].filter(
                function (item) {

                    return !(
                        item &&
                        String(item.id) ===
                        String(id)
                    );

                }
            );


        if (
            system[
                section
            ][
                collection
            ].length === before
        ) {

            return false;

        }


        saveSystem(
            system
        );


        return true;

    }


    /*
     * =========================================================
     * LEGACY localStorage GET INTERCEPTOR
     * =========================================================
     */

    Storage.prototype.getItem =
        function (key) {

            if (
                Object.prototype.hasOwnProperty.call(
                    LEGACY_MAP,
                    key
                )
            ) {

                return JSON.stringify(
                    getCollection(
                        key
                    )
                );

            }


            return originalGetItem.call(
                this,
                key
            );

        };


    /*
     * =========================================================
     * LEGACY localStorage SET INTERCEPTOR
     * =========================================================
     */

    Storage.prototype.setItem =
        function (key, value) {

            if (
                Object.prototype.hasOwnProperty.call(
                    LEGACY_MAP,
                    key
                )
            ) {

                const parsed =
                    safeParse(
                        value,
                        []
                    );


                setCollection(
                    key,
                    parsed
                );


                return;

            }


            return originalSetItem.call(
                this,
                key,
                value
            );

        };


    /*
     * =========================================================
     * LEGACY REMOVE SUPPORT
     * =========================================================
     */

    Storage.prototype.removeItem =
        function (key) {

            if (
                Object.prototype.hasOwnProperty.call(
                    LEGACY_MAP,
                    key
                )
            ) {

                setCollection(
                    key,
                    []
                );

                return;

            }


            return originalRemoveItem.call(
                this,
                key
            );

        };


    /*
     * =========================================================
     * PUBLIC LUMENIX API
     * =========================================================
     */

    window.LumenixData = {

        load:
            loadSystem,

        save:
            saveSystem,

        migrate:
            migrateLegacyData,

        add:
            addRecord,

        get:
            getRecords,

        find:
            findRecord,

        update:
            updateRecord,

        remove:
            removeRecord,

        generateId:
            createId

    };


    /*
     * =========================================================
     * INITIAL MIGRATION
     * =========================================================
     */

    migrateLegacyData();


})();
