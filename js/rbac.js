/* =========================================================
   LUMENIX V5.1
   RBAC CORE
   Role Based Access Control
   ========================================================= */

"use strict";

(function () {

    const STORAGE = {
        SESSION: "lumenix_session",
        USERS: "lumenix_users"
    };


    /* =====================================================
       ROLES
       ===================================================== */

    const ROLES = {
        SUPER_ADMIN: "super_admin",
        ADMIN: "admin",
        MANAGER: "manager",
        SUPERVISOR: "supervisor",
        TECHNICIAN: "technician",
        PARTNER: "partner",
        DEALER: "dealer",
        CUSTOMER: "customer"
    };


    /* =====================================================
       MODULES
       ===================================================== */

    const MODULES = {

        DASHBOARD: "dashboard",

        PROJECTS: "projects",

        LIGHTING: "lighting",

        SERVICE_POINT: "service_point",

        TRAINING: "training",

        CONTRACTORS: "contractors",

        CUSTOMERS: "customers",

        TECHNICIANS: "technicians",

        PARTNERS: "partners",

        DEALERS: "dealers",

        INVENTORY: "inventory",

        ACCOUNTS: "accounts",

        ATTENDANCE: "attendance",

        PAYMENTS: "payments",

        REPORTS: "reports",

        USERS: "users",

        SETTINGS: "settings"

    };


    /* =====================================================
       SUPER ADMIN
       সব permission
       ===================================================== */

    const ALL_MODULES =
        Object.values(MODULES);


    /* =====================================================
       DEFAULT ROLE PERMISSIONS
       ===================================================== */

    const DEFAULT_PERMISSIONS = {

        [ROLES.SUPER_ADMIN]:
            ALL_MODULES,


        [ROLES.ADMIN]: [

            MODULES.DASHBOARD,
            MODULES.PROJECTS,
            MODULES.LIGHTING,
            MODULES.SERVICE_POINT,
            MODULES.TRAINING,
            MODULES.CONTRACTORS,
            MODULES.CUSTOMERS,
            MODULES.TECHNICIANS,
            MODULES.PARTNERS,
            MODULES.DEALERS,
            MODULES.INVENTORY,
            MODULES.ACCOUNTS,
            MODULES.ATTENDANCE,
            MODULES.PAYMENTS,
            MODULES.REPORTS

        ],


        [ROLES.MANAGER]: [

            MODULES.DASHBOARD,
            MODULES.PROJECTS,
            MODULES.CUSTOMERS,
            MODULES.PARTNERS,
            MODULES.DEALERS,
            MODULES.INVENTORY,
            MODULES.ACCOUNTS,
            MODULES.REPORTS

        ],


        [ROLES.SUPERVISOR]: [

            MODULES.DASHBOARD,
            MODULES.PROJECTS,
            MODULES.SERVICE_POINT,
            MODULES.TECHNICIANS,
            MODULES.ATTENDANCE,
            MODULES.REPORTS

        ],


        [ROLES.TECHNICIAN]: [

            MODULES.DASHBOARD,
            MODULES.SERVICE_POINT,
            MODULES.TECHNICIANS

        ],


        [ROLES.PARTNER]: [

            MODULES.DASHBOARD,
            MODULES.SERVICE_POINT,
            MODULES.PARTNERS

        ],


        [ROLES.DEALER]: [

            MODULES.DASHBOARD,
            MODULES.LIGHTING,
            MODULES.DEALERS

        ],


        [ROLES.CUSTOMER]: [

            MODULES.DASHBOARD,
            MODULES.LIGHTING,
            MODULES.SERVICE_POINT,
            MODULES.CUSTOMERS

        ]

    };


    /* =====================================================
       PROJECTS
       ===================================================== */

    const PROJECTS = {

        LIGHTING: "lumenix_lighting",

        SERVICE_POINT: "lumenix_service_point",

        TRAINING: "lumenix_training",

        CONTRACTORS: "ms_fardin_contractors"

    };


    /* =====================================================
       SESSION
       ===================================================== */

    function getSession() {

        try {

            const session =
                localStorage.getItem(
                    STORAGE.SESSION
                );

            if (!session) {
                return null;
            }

            return JSON.parse(session);

        } catch (error) {

            console.error(
                "LUMENIX session error:",
                error
            );

            return null;
        }
    }


    function setSession(user) {

        const session = {

            userId: user.id,

            username: user.username,

            name: user.name,

            role: user.role,

            permissions:
                user.permissions ||
                DEFAULT_PERMISSIONS[user.role] ||
                [],

            loginAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            STORAGE.SESSION,
            JSON.stringify(session)
        );

        return session;

    }


    function clearSession() {

        localStorage.removeItem(
            STORAGE.SESSION
        );

    }


    /* =====================================================
       CURRENT USER
       ===================================================== */

    function currentUser() {

        return getSession();

    }


    function currentRole() {

        const session =
            getSession();

        return session
            ? session.role
            : null;

    }


    /* =====================================================
       PERMISSION CHECK
       ===================================================== */

    function hasPermission(
        moduleName
    ) {

        const session =
            getSession();


        if (!session) {
            return false;
        }


        if (
            session.role ===
            ROLES.SUPER_ADMIN
        ) {

            return true;

        }


        return (
            Array.isArray(
                session.permissions
            ) &&
            session.permissions.includes(
                moduleName
            )
        );

    }


    /* =====================================================
       SUPER ADMIN CHECK
       ===================================================== */

    function isSuperAdmin() {

        return (
            currentRole() ===
            ROLES.SUPER_ADMIN
        );

    }


    /* =====================================================
       PAGE PROTECTION
       ===================================================== */

    function requireLogin(
        redirect = "admin.html"
    ) {

        const session =
            getSession();


        if (!session) {

            window.location.href =
                redirect;

            return false;

        }


        return true;

    }


    function requirePermission(
        moduleName,
        redirect = "dashboard.html"
    ) {

        if (!requireLogin()) {
            return false;
        }


        if (
            !hasPermission(
                moduleName
            )
        ) {

            alert(
                "আপনার এই module ব্যবহারের permission নেই।"
            );

            window.location.href =
                redirect;

            return false;

        }


        return true;

    }


    /* =====================================================
       USERS
       ===================================================== */

    function getUsers() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    STORAGE.USERS
                ) || "[]"
            );

        } catch (error) {

            return [];

        }

    }


    function saveUsers(users) {

        localStorage.setItem(
            STORAGE.USERS,
            JSON.stringify(users)
        );

    }


    function getUserByUsername(
        username
    ) {

        return getUsers().find(
            user =>
                user.username ===
                username
        );

    }


    function createUser(data) {

        const users =
            getUsers();


        const exists =
            users.some(
                user =>
                    user.username ===
                    data.username
            );


        if (exists) {

            return {
                success: false,
                message:
                    "Username already exists."
            };

        }


        const role =
            data.role ||
            ROLES.CUSTOMER;


        const permissions =
            role === ROLES.SUPER_ADMIN
                ? ALL_MODULES
                : (
                    data.permissions ||
                    DEFAULT_PERMISSIONS[role] ||
                    []
                );


        const user = {

            id:
                "LUM-USER-" +
                String(
                    users.length + 1
                ).padStart(5, "0"),

            username:
                data.username,

            password:
                data.password,

            name:
                data.name || data.username,

            role,

            permissions,

            active:
                data.active !== false,

            createdAt:
                new Date().toISOString()

        };


        users.push(user);

        saveUsers(users);


        return {
            success: true,
            user
        };

    }


    /* =====================================================
       UPDATE USER PERMISSIONS
       ===================================================== */

    function updateUserPermissions(
        userId,
        permissions
    ) {

        const users =
            getUsers();


        const user =
            users.find(
                item =>
                    item.id === userId
            );


        if (!user) {

            return {
                success: false,
                message: "User not found."
            };

        }


        if (
            user.role ===
            ROLES.SUPER_ADMIN
        ) {

            user.permissions =
                ALL_MODULES;

        } else {

            user.permissions =
                Array.isArray(
                    permissions
                )
                    ? permissions
                    : [];

        }


        saveUsers(users);


        return {
            success: true,
            user
        };

    }


    /* =====================================================
       UPDATE USER ROLE
       ===================================================== */

    function updateUserRole(
        userId,
        role
    ) {

        const users =
            getUsers();


        const user =
            users.find(
                item =>
                    item.id === userId
            );


        if (!user) {

            return {
                success: false,
                message: "User not found."
            };

        }


        user.role =
            role;


        user.permissions =
            role === ROLES.SUPER_ADMIN
                ? ALL_MODULES
                : (
                    DEFAULT_PERMISSIONS[role] ||
                    []
                );


        saveUsers(users);


        return {
            success: true,
            user
        };

    }


    /* =====================================================
       REMOVE USER
       ===================================================== */

    function deleteUser(
        userId
    ) {

        const users =
            getUsers();


        const user =
            users.find(
                item =>
                    item.id === userId
            );


        if (!user) {
            return false;
        }


        if (
            user.role ===
            ROLES.SUPER_ADMIN
        ) {

            return false;

        }


        const updated =
            users.filter(
                item =>
                    item.id !== userId
            );


        saveUsers(updated);

        return true;

    }


    /* =====================================================
       INITIAL SUPER ADMIN
       ===================================================== */

    function initializeSuperAdmin() {

        const users =
            getUsers();


        const superAdminExists =
            users.some(
                user =>
                    user.role ===
                    ROLES.SUPER_ADMIN
            );


        if (
            superAdminExists
        ) {

            return;

        }


        createUser({

            username: "admin",

            password: "12345",

            name: "Super Administrator",

            role:
                ROLES.SUPER_ADMIN,

            permissions:
                ALL_MODULES

        });

    }


    /* =====================================================
       EXPORT
       ===================================================== */

    window.LumenixRBAC = {

        ROLES,

        MODULES,

        PROJECTS,

        DEFAULT_PERMISSIONS,

        ALL_MODULES,

        getSession,

        setSession,

        clearSession,

        currentUser,

        currentRole,

        hasPermission,

        isSuperAdmin,

        requireLogin,

        requirePermission,

        getUsers,

        getUserByUsername,

        createUser,

        updateUserPermissions,

        updateUserRole,

        deleteUser,

        initializeSuperAdmin

    };


    initializeSuperAdmin();


})();
