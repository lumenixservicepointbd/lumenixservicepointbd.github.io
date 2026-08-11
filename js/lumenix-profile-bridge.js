"use strict";

(function () {

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


    function safeParse(value, fallback) {

        try {

            const parsed =
                JSON.parse(value);

            return parsed;

        } catch (error) {

            return fallback;

        }

    }


    function loadSystem() {

        const raw =
            localStorage.getItem(
                SYSTEM_KEY
            );

        if (!raw) {

            return JSON.parse(
                JSON.stringify(
                    DEFAULT_DATA
                )
            );

        }


        const saved =
            safeParse(
                raw,
                null
            );


        if (!saved) {

            return JSON.parse(
                JSON.stringify(
                    DEFAULT_DATA
                )
            );

        }


        return mergeDefaults(
            DEFAULT_DATA,
            saved
        );

    }


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


        Object.keys(saved || {})
            .forEach(
                function (section) {

                    if (
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
                    ).forEach(
                        function (collection) {

                            if (
                                Array.isArray(
                                    saved[section][collection]
                                )
                            ) {

                                result[section][collection] =
                                    saved[section][collection];

                            }

                        }
                    );

                }
            );


        return result;

    }


    function saveSystem(data) {

        localStorage.setItem(
            SYSTEM_KEY,
            JSON.stringify(data)
        );

    }


    function migrateLegacyData() {

        const system =
            loadSystem();


        let changed = false;


        Object.keys(
            LEGACY_MAP
        ).forEach(
            function (legacyKey) {

                const raw =
                    localStorage.getItem(
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
                                    return item.id;
                                }
                            )
                    );


                oldData.forEach(
                    function (item) {

                        if (
                            item &&
                            item.id &&
                            existingIds.has(
                                item.id
                            )
                        ) {
                            return;
                        }


                        current.push(
                            item
                        );


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


    function getCollection(
        key
    ) {

        const mapping =
            LEGACY_MAP[key];


        if (!mapping) {
            return null;
        }


        const system =
            loadSystem();


        return system[
            mapping[0]
        ][
            mapping[1]
        ];

    }


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


    function createId(
        prefix
    ) {

        return (
            prefix +
            "-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 7)
        );

    }


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
                system[section][collection]
            )
        ) {
            return null;
        }


        const newRecord = {

            id:
                record.id ||
                createId(
                    "LUX"
                ),

            createdAt:
                record.createdAt ||
                new Date()
                    .toISOString(),

            ...record

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


    function getRecords(
        section,
        collection
    ) {

        const system =
            loadSystem();


        if (
            !system[section] ||
            !Array.isArray(
                system[section][collection]
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


    function findRecord(
        section,
        collection,
        id
    ) {

        const records =
            getRecords(
                section,
                collection
            );


        return records.find(
            function (item) {

                return (
                    item.id === id
                );

            }
        ) || null;

    }


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
                system[section][collection]
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
                        item.id === id
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

            ...updates,

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
                system[section][collection]
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

                    return (
                        item.id !== id
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
     * Legacy localStorage compatibility.
     * Existing profile pages can continue
     * using their old STORAGE_KEY values.
     */

    const originalGetItem =
        Storage.prototype.getItem;


    const originalSetItem =
        Storage.prototype.setItem;


    Storage.prototype.getItem =
        function (key) {

            if (
                LEGACY_MAP[key]
            ) {

                migrateLegacyData();

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


    Storage.prototype.setItem =
        function (key, value) {

            if (
                LEGACY_MAP[key]
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
     * Public API
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
     * Run migration once when bridge loads.
     */

    migrateLegacyData();


})();
