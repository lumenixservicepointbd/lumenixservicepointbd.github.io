"use strict";

(function () {

    const SYSTEM_KEY = "lumenixSystemData";

    const MAP = {

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


    const originalGet =
        Storage.prototype.getItem;

    const originalSet =
        Storage.prototype.setItem;


    function readSystem() {

        try {

            const raw =
                originalGet.call(
                    localStorage,
                    SYSTEM_KEY
                );

            if (!raw) {
                return null;
            }

            return JSON.parse(raw);

        } catch (error) {

            return null;
        }
    }


    function writeSystem(data) {

        try {

            originalSet.call(
                localStorage,
                SYSTEM_KEY,
                JSON.stringify(data)
            );

            return true;

        } catch (error) {

            console.error(
                "LUMENIX profile bridge save error:",
                error
            );

            return false;
        }
    }


    function getMappedValue(key) {

        const mapping = MAP[key];

        if (!mapping) {
            return null;
        }


        const system =
            readSystem();

        if (!system) {
            return null;
        }


        const section =
            mapping[0];

        const collection =
            mapping[1];


        if (
            !system[section] ||
            !Array.isArray(
                system[section][collection]
            )
        ) {
            return [];
        }


        return JSON.stringify(
            system[section][collection]
        );
    }


    function setMappedValue(
        key,
        value
    ) {

        const mapping = MAP[key];

        if (!mapping) {
            return false;
        }


        let system =
            readSystem();


        if (!system) {

            system = {

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

        }


        const section =
            mapping[0];

        const collection =
            mapping[1];


        try {

            const parsed =
                JSON.parse(value);


            if (!Array.isArray(parsed)) {
                return false;
            }


            system[section][collection] =
                parsed;


            writeSystem(system);

            return true;

        } catch (error) {

            return false;
        }
    }


    Storage.prototype.getItem =
        function (key) {

            if (MAP[key]) {

                const mapped =
                    getMappedValue(key);

                if (mapped !== null) {
                    return mapped;
                }

            }


            return originalGet.call(
                this,
                key
            );
        };


    Storage.prototype.setItem =
        function (key, value) {

            if (MAP[key]) {

                if (
                    setMappedValue(
                        key,
                        value
                    )
                ) {
                    return;
                }

            }


            return originalSet.call(
                this,
                key,
                value
            );
        };


    window.LumenixProfileBridge = {

        enabled: true,

        mappings: MAP,

        sync: function () {

            return readSystem();
        }

    };

})();
