"use strict";

(function () {

    const STORAGE_KEY = "lumenixSystemData";

    const defaultData = {
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


    function cloneDefaultData() {
        return JSON.parse(
            JSON.stringify(defaultData)
        );
    }


    function loadData() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {
                return cloneDefaultData();
            }

            const parsed =
                JSON.parse(saved);

            return mergeData(
                cloneDefaultData(),
                parsed
            );

        } catch (error) {

            console.error(
                "LUMENIX data load error:",
                error
            );

            return cloneDefaultData();
        }
    }


    function mergeData(base, saved) {

        Object.keys(base).forEach(
            function (key) {

                if (
                    saved &&
                    typeof saved[key] === "object"
                ) {

                    if (
                        Array.isArray(
                            base[key]
                        )
                    ) {

                        if (
                            Array.isArray(
                                saved[key]
                            )
                        ) {
                            base[key] =
                                saved[key];
                        }

                    } else {

                        base[key] =
                            mergeData(
                                base[key],
                                saved[key]
                            );
                    }
                }
            }
        );

        return base;
    }


    function saveData(data) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );

            return true;

        } catch (error) {

            console.error(
                "LUMENIX data save error:",
                error
            );

            return false;
        }
    }


    function generateId(prefix) {

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

        const data = loadData();

        if (
            !data[section] ||
            !Array.isArray(
                data[section][collection]
            )
        ) {
            return null;
        }


        const newRecord = {
            id: generateId(
                record.idPrefix ||
                "LUX"
            ),

            createdAt:
                new Date().toISOString(),

            ...record
        };


        delete newRecord.idPrefix;


        data[section][collection].push(
            newRecord
        );


        saveData(data);

        return newRecord;
    }


    function getRecords(
        section,
        collection
    ) {

        const data = loadData();

        if (
            !data[section] ||
            !Array.isArray(
                data[section][collection]
            )
        ) {
            return [];
        }

        return data[section][collection];
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
                return item.id === id;
            }
        ) || null;
    }


    function updateRecord(
        section,
        collection,
        id,
        updates
    ) {

        const data = loadData();

        if (
            !data[section] ||
            !Array.isArray(
                data[section][collection]
            )
        ) {
            return null;
        }


        const index =
            data[section][collection]
                .findIndex(
                    function (item) {
                        return item.id === id;
                    }
                );


        if (index === -1) {
            return null;
        }


        data[section][collection][index] = {
            ...data[section][collection][index],
            ...updates,
            updatedAt:
                new Date().toISOString()
        };


        saveData(data);

        return data[section][collection][index];
    }


    function deleteRecord(
        section,
        collection,
        id
    ) {

        const data = loadData();

        if (
            !data[section] ||
            !Array.isArray(
                data[section][collection]
            )
        ) {
            return false;
        }


        const oldLength =
            data[section][collection]
                .length;


        data[section][collection] =
            data[section][collection]
                .filter(
                    function (item) {
                        return item.id !== id;
                    }
                );


        if (
            data[section][collection]
                .length === oldLength
        ) {
            return false;
        }


        saveData(data);

        return true;
    }


    function getSummary() {

        const data = loadData();

        return {

            lighting: {
                dealers:
                    data.lighting.dealers.length,

                customers:
                    data.lighting.customers.length,

                orders:
                    data.lighting.orders.length,

                payments:
                    data.lighting.payments.length,

                replacements:
                    data.lighting.replacements.length
            },

            service: {
                partners:
                    data.service.partners.length,

                technicians:
                    data.service.technicians.length,

                customers:
                    data.service.customers.length,

                requests:
                    data.service.requests.length,

                payments:
                    data.service.payments.length,

                replacements:
                    data.service.replacements.length
            }

        };
    }


    window.LumenixData = {

        load: loadData,

        save: saveData,

        add: addRecord,

        get: getRecords,

        find: findRecord,

        update: updateRecord,

        remove: deleteRecord,

        summary: getSummary,

        generateId: generateId

    };

})();
