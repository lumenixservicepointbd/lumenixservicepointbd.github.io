/* =====================================
LUMENIX V5.1
USER MANAGEMENT + RBAC
===================================== */

"use strict";

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================
        SECURITY
        ===================================== */

        const loggedIn =
            localStorage.getItem(
                "adminLoggedIn"
            );

        const currentRole =
            localStorage.getItem(
                "currentUserRole"
            );


        /*
        Only Super Admin can manage users.
        */

        if (
            loggedIn !== "true" ||
            currentRole !== "super_admin"
        ) {

            alert(
                "Access Denied. Super Admin permission required."
            );

            window.location.href =
                "dashboard.html";

            return;

        }


        /* =====================================
        STORAGE
        ===================================== */

        const STORAGE_KEY =
            "lumenix_users";


        /* =====================================
        DEFAULT SUPER ADMIN
        ===================================== */

        const defaultSuperAdmin = {

            id:
                "LSP-U-00001",

            name:
                "Super Administrator",

            username:
                "admin",

            password:
                "12345",

            role:
                "super_admin",

            projects: [
                "lighting",
                "service_point",
                "call_center",
                "training",
                "contractor"
            ],

            modules: [
                "dashboard",
                "customers",
                "dealers",
                "technicians",
                "services",
                "inventory",
                "accounts",
                "attendance",
                "projects",
                "reports",
                "settings"
            ],

            status:
                "Active"

        };


        /* =====================================
        LOAD USERS
        ===================================== */

        function loadUsers() {

            try {

                const saved =
                    localStorage.getItem(
                        STORAGE_KEY
                    );


                if (!saved) {

                    return [
                        defaultSuperAdmin
                    ];

                }


                const parsed =
                    JSON.parse(saved);


                if (
                    !Array.isArray(parsed) ||
                    parsed.length === 0
                ) {

                    return [
                        defaultSuperAdmin
                    ];

                }


                /*
                Make sure Super Admin
                always exists.
                */

                const hasSuperAdmin =
                    parsed.some(
                        function (user) {

                            return (
                                user.role ===
                                "super_admin"
                            );

                        }
                    );


                if (!hasSuperAdmin) {

                    parsed.unshift(
                        defaultSuperAdmin
                    );

                }


                return parsed;

            } catch (error) {

                console.warn(
                    "Could not load LUMENIX users.",
                    error
                );

                return [
                    defaultSuperAdmin
                ];

            }

        }


        let users =
            loadUsers();


        function saveUsers() {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(users)
            );

        }


        saveUsers();


        /* =====================================
        ELEMENTS
        ===================================== */

        const tableBody =
            document.getElementById(
                "usersTableBody"
            );


        const modal =
            document.getElementById(
                "userModal"
            );


        const form =
            document.getElementById(
                "userForm"
            );


        const searchInput =
            document.getElementById(
                "userSearch"
            );


        const addUserBtn =
            document.getElementById(
                "addUserBtn"
            );


        const closeModalBtn =
            document.getElementById(
                "closeUserModal"
            );


        const cancelBtn =
            document.getElementById(
                "cancelUserBtn"
            );


        const backDashboardBtn =
            document.getElementById(
                "backDashboardBtn"
            );


        const toast =
            document.getElementById(
                "toast"
            );


        /* =====================================
        HELPERS
        ===================================== */

        function escapeHTML(value) {

            return String(
                value ?? ""
            )

                .replace(
                    /&/g,
                    "&amp;"
                )

                .replace(
                    /</g,
                    "&lt;"
                )

                .replace(
                    />/g,
                    "&gt;"
                )

                .replace(
                    /"/g,
                    "&quot;"
                )

                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        function showToast(message) {

            if (!toast) return;

            toast.textContent =
                message;

            toast.classList.add(
                "show"
            );

            clearTimeout(
                showToast.timer
            );

            showToast.timer =
                setTimeout(
                    function () {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    2500
                );

        }


        function generateUserID() {

            let number =
                users.length + 1;


            let id =
                "LSP-U-" +
                String(number)
                    .padStart(5, "0");


            while (
                users.some(
                    function (user) {

                        return (
                            user.id === id
                        );

                    }
                )
            ) {

                number++;

                id =
                    "LSP-U-" +
                    String(number)
                        .padStart(5, "0");

            }


            return id;

        }


        /* =====================================
        SUMMARY
        ===================================== */

        function renderSummary() {

            const totalUsers =
                document.getElementById(
                    "totalUsers"
                );


            const totalSuperAdmins =
                document.getElementById(
                    "totalSuperAdmins"
                );


            const totalActiveUsers =
                document.getElementById(
                    "totalActiveUsers"
                );


            const totalRestrictedUsers =
                document.getElementById(
                    "totalRestrictedUsers"
                );


            const superAdmins =
                users.filter(
                    function (user) {

                        return (
                            user.role ===
                            "super_admin"
                        );

                    }
                );


            const activeUsers =
                users.filter(
                    function (user) {

                        return (
                            user.status ===
                            "Active"
                        );

                    }
                );


            const restrictedUsers =
                users.filter(
                    function (user) {

                        return (
                            user.role !==
                            "super_admin"
                        );

                    }
                );


            if (totalUsers) {

                totalUsers.textContent =
                    users.length;

            }


            if (totalSuperAdmins) {

                totalSuperAdmins.textContent =
                    superAdmins.length;

            }


            if (totalActiveUsers) {

                totalActiveUsers.textContent =
                    activeUsers.length;

            }


            if (totalRestrictedUsers) {

                totalRestrictedUsers.textContent =
                    restrictedUsers.length;

            }

        }


        /* =====================================
        RENDER USERS
        ===================================== */

        function renderUsers() {

            if (!tableBody) return;


            const search =
                (
                    searchInput?.value ||
                    ""
                )
                    .trim()
                    .toLowerCase();


            const filteredUsers =
                users.filter(
                    function (user) {

                        if (!search) {
                            return true;
                        }


                        return (

                            user.id
                                .toLowerCase()
                                .includes(search)

                            ||

                            user.name
                                .toLowerCase()
                                .includes(search)

                            ||

                            user.username
                                .toLowerCase()
                                .includes(search)

                            ||

                            user.role
                                .toLowerCase()
                                .includes(search)

                        );

                    }
                );


            tableBody.innerHTML = "";


            if (
                filteredUsers.length === 0
            ) {

                tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="7"
                            style="text-align:center;padding:30px;"
                        >
                            No user found.
                        </td>

                    </tr>

                `;

                return;

            }


            filteredUsers.forEach(
                function (user) {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    const projectCount =
                        user.role ===
                        "super_admin"

                            ? "All Projects"

                            : (
                                user.projects?.length ||
                                0
                            );


                    const roleName =
                        user.role ===
                        "super_admin"

                            ? "Super Admin"

                            : user.role;


                    row.innerHTML = `

                        <td>
                            <strong>
                                ${escapeHTML(
                                    user.id
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                user.name
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                user.username
                            )}
                        </td>

                        <td>

                            <span class="role-badge">
                                ${escapeHTML(
                                    roleName
                                )}
                            </span>

                        </td>

                        <td>
                            ${escapeHTML(
                                String(
                                    projectCount
                                )
                            )}
                        </td>

                        <td>

                            <span
                                class="status-badge ${
                                    user.status ===
                                    "Active"
                                        ? "status-active"
                                        : "status-inactive"
                                }"
                            >
                                ${escapeHTML(
                                    user.status
                                )}
                            </span>

                        </td>

                        <td>

                            <button
                                class="edit-user-btn"
                                data-user-id="${escapeHTML(
                                    user.id
                                )}"
                            >
                                Manage Access
                            </button>

                        </td>

                    `;


                    tableBody.appendChild(
                        row
                    );

                }
            );


            document
                .querySelectorAll(
                    ".edit-user-btn"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                openEditUser(
                                    button.dataset.userId
                                );

                            }
                        );

                    }
                );

        }


        /* =====================================
        MODAL
        ===================================== */

        function openModal() {

            modal.classList.add(
                "show"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        function closeModal() {

            modal.classList.remove(
                "show"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            form.reset();

            document.getElementById(
                "editingUserId"
            ).value = "";

            document.getElementById(
                "modalTitle"
            ).textContent =
                "Add User";

            /*
            Password becomes required
            again for new users.
            */

            document.getElementById(
                "userPassword"
            ).required = true;

        }


        /* =====================================
        CLEAR PERMISSIONS
        ===================================== */

        function clearPermissions() {

            document
                .querySelectorAll(
                    'input[name="projectAccess"]'
                )
                .forEach(
                    function (checkbox) {

                        checkbox.checked =
                            false;

                    }
                );


            document
                .querySelectorAll(
                    'input[name="moduleAccess"]'
                )
                .forEach(
                    function (checkbox) {

                        checkbox.checked =
                            false;

                    }
                );

        }


        /* =====================================
        OPEN ADD USER
        ===================================== */

        function openAddUser() {

            form.reset();

            clearPermissions();


            document.getElementById(
                "editingUserId"
            ).value = "";


            document.getElementById(
                "modalTitle"
            ).textContent =
                "Add User";


            document.getElementById(
                "userPassword"
            ).required = true;


            openModal();

        }


        /* =====================================
        OPEN EDIT USER
        ===================================== */

        function openEditUser(userId) {

            const user =
                users.find(
                    function (item) {

                        return (
                            item.id ===
                            userId
                        );

                    }
                );


            if (!user) return;


            form.reset();

            clearPermissions();


            document.getElementById(
                "editingUserId"
            ).value =
                user.id;


            document.getElementById(
                "userName"
            ).value =
                user.name || "";


            document.getElementById(
                "userUsername"
            ).value =
                user.username || "";


            document.getElementById(
                "userPassword"
            ).value =
                user.password || "";


            document.getElementById(
                "userRole"
            ).value =
                user.role || "staff";


            document.getElementById(
                "userStatus"
            ).value =
                user.status || "Active";


            /*
            Load project permissions.
            */

            document
                .querySelectorAll(
                    'input[name="projectAccess"]'
                )
                .forEach(
                    function (checkbox) {

                        checkbox.checked =
                            (
                                user.projects ||
                                []
                            ).includes(
                                checkbox.value
                            );

                    }
                );


            /*
            Load module permissions.
            */

            document
                .querySelectorAll(
                    'input[name="moduleAccess"]'
                )
                .forEach(
                    function (checkbox) {

                        checkbox.checked =
                            (
                                user.modules ||
                                []
                            ).includes(
                                checkbox.value
                            );

                    }
                );


            document.getElementById(
                "modalTitle"
            ).textContent =
                "Manage User Access";


            document.getElementById(
                "userPassword"
            ).required = false;


            openModal();

        }


        /* =====================================
        SAVE USER
        ===================================== */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const editingId =
                    document.getElementById(
                        "editingUserId"
                    ).value;


                const name =
                    document.getElementById(
                        "userName"
                    ).value.trim();


                const username =
                    document.getElementById(
                        "userUsername"
                    ).value.trim();


                const password =
                    document.getElementById(
                        "userPassword"
                    ).value;


                const role =
                    document.getElementById(
                        "userRole"
                    ).value;


                const status =
                    document.getElementById(
                        "userStatus"
                    ).value;


                if (
                    !name ||
                    !username
                ) {

                    showToast(
                        "Name and username are required."
                    );

                    return;

                }


                /*
                Username uniqueness.
                */

                const duplicate =
                    users.some(
                        function (user) {

                            return (
                                user.username
                                    .toLowerCase() ===
                                username.toLowerCase()
                                &&
                                user.id !==
                                editingId
                            );

                        }
                    );


                if (duplicate) {

                    showToast(
                        "Username already exists."
                    );

                    return;

                }


                const projects =
                    Array.from(
                        document.querySelectorAll(
                            'input[name="projectAccess"]:checked'
                        )
                    ).map(
                        function (checkbox) {

                            return checkbox.value;

                        }
                    );


                const modules =
                    Array.from(
                        document.querySelectorAll(
                            'input[name="moduleAccess"]:checked'
                        )
                    ).map(
                        function (checkbox) {

                            return checkbox.value;

                        }
                    );


                /*
                Super Admin automatically gets
                every project and module.
                */

                if (
                    role ===
                    "super_admin"
                ) {

                    projects.length = 0;

                    projects.push(
                        "lighting",
                        "service_point",
                        "call_center",
                        "training",
                        "contractor"
                    );


                    modules.length = 0;

                    modules.push(
                        "dashboard",
                        "customers",
                        "dealers",
                        "technicians",
                        "services",
                        "inventory",
                        "accounts",
                        "attendance",
                        "projects",
                        "reports",
                        "settings"
                    );

                }


                if (!editingId) {

                    if (!password) {

                        showToast(
                            "Password is required."
                        );

                        return;

                    }


                    const newUser = {

                        id:
                            generateUserID(),

                        name,

                        username,

                        password,

                        role,

                        projects,

                        modules,

                        status

                    };


                    users.push(
                        newUser
                    );


                    saveUsers();

                    closeModal();

                    renderSummary();

                    renderUsers();

                    showToast(
                        "User created successfully."
                    );


                    return;

                }


                /*
                UPDATE EXISTING USER
                */

                const user =
                    users.find(
                        function (item) {

                            return (
                                item.id ===
                                editingId
                            );

                        }
                    );


                if (!user) return;


                /*
                Do not allow this module
                to remove the final Super Admin.
                */

                if (
                    user.role ===
                    "super_admin" &&
                    role !==
                    "super_admin"
                ) {

                    const superAdminCount =
                        users.filter(
                            function (item) {

                                return (
                                    item.role ===
                                    "super_admin"
                                );

                            }
                        ).length;


                    if (
                        superAdminCount <= 1
                    ) {

                        showToast(
                            "At least one Super Admin must remain."
                        );

                        return;

                    }

                }


                user.name =
                    name;

                user.username =
                    username;

                user.role =
                    role;

                user.projects =
                    projects;

                user.modules =
                    modules;

                user.status =
                    status;


                /*
                Only replace password
                when a new one was entered.
                */

                if (password) {

                    user.password =
                        password;

                }


                saveUsers();

                closeModal();

                renderSummary();

                renderUsers();

                showToast(
                    "User access updated successfully."
                );

            }
        );


        /* =====================================
        EVENTS
        ===================================== */

        if (addUserBtn) {

            addUserBtn.addEventListener(
                "click",
                openAddUser
            );

        }


        if (closeModalBtn) {

            closeModalBtn.addEventListener(
                "click",
                closeModal
            );

        }


        if (cancelBtn) {

            cancelBtn.addEventListener(
                "click",
                closeModal
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderUsers
            );

        }


        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        modal
                    ) {

                        closeModal();

                    }

                }
            );

        }


        if (backDashboardBtn) {

            backDashboardBtn.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "dashboard.html";

                }
            );

        }


        /* =====================================
        INITIAL RENDER
        ===================================== */

        renderSummary();

        renderUsers();


        console.log(
            "LUMENIX User Management + RBAC loaded."
        );

    }
);
