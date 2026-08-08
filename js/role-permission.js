/* =====================================
   LUMENIX V5.1
   ROLE & PERMISSION CONTROL
===================================== */

"use strict";


/* =====================================
   STORAGE
===================================== */

const ROLE_STORAGE = "lumenixRoles";
const USER_STORAGE = "lumenixUsers";


/* =====================================
   MODULE DEFINITIONS
===================================== */

const MODULES = [
    "Dashboard",
    "Projects",
    "Accounts",
    "Inventory",
    "Attendance",
    "Customers",
    "Technicians",
    "Training",
    "Products",
    "Dealers",
    "Reports",
    "Settings"
];

const ACTIONS = [
    "view",
    "add",
    "edit",
    "delete",
    "manage"
];


/* =====================================
   DEFAULT ROLES
===================================== */

const DEFAULT_ROLES = [

    {
        id: "super-admin",
        name: "Super Admin",
        description: "Full system control.",
        protected: true,
        permissions: createFullPermissions()
    },

    {
        id: "admin",
        name: "Admin",
        description: "Administrative management access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Projects",
            "Accounts",
            "Inventory",
            "Attendance",
            "Customers",
            "Technicians",
            "Training",
            "Products",
            "Dealers",
            "Reports",
            "Settings"
        ])
    },

    {
        id: "employee",
        name: "Employee",
        description: "Employee-level operational access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Projects",
            "Attendance"
        ])
    },

    {
        id: "project-supervisor",
        name: "Project Supervisor",
        description: "Project and site operational access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Projects",
            "Attendance",
            "Inventory",
            "Reports"
        ])
    },

    {
        id: "worker",
        name: "Worker",
        description: "Worker-level access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Attendance"
        ])
    },

    {
        id: "technician",
        name: "Technician",
        description: "Technician network access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Technicians",
            "Customers"
        ])
    },

    {
        id: "customer",
        name: "Customer",
        description: "Customer-facing access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Customers",
            "Products"
        ])
    },

    {
        id: "dealer",
        name: "Dealer",
        description: "Dealer network access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Products",
            "Dealers",
            "Inventory"
        ])
    },

    {
        id: "student-graduate",
        name: "Student / Graduate",
        description: "Training and graduate network access.",
        protected: true,
        permissions: createPermissionSet([
            "Dashboard",
            "Training",
            "Technicians"
        ])
    }

];


/* =====================================
   DEFAULT USER
===================================== */

const DEFAULT_USERS = [

    {
        id: "USR-00001",
        name: "Administrator",
        username: "admin",
        roleId: "super-admin",
        status: "Active"
    }

];


/* =====================================
   STATE
===================================== */

let roles = [];
let users = [];
let selectedRoleId = null;


/* =====================================
   HELPERS
===================================== */

function createFullPermissions() {

    const permissions = {};

    MODULES.forEach(module => {

        permissions[module] = {};

        ACTIONS.forEach(action => {
            permissions[module][action] = true;
        });

    });

    return permissions;
}


function createPermissionSet(allowedModules = []) {

    const permissions = {};

    MODULES.forEach(module => {

        permissions[module] = {};

        ACTIONS.forEach(action => {

            permissions[module][action] =
                allowedModules.includes(module);

        });

    });

    return permissions;
}


function generateId(prefix) {

    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

}


/* =====================================
   STORAGE LOAD
===================================== */

function loadData() {

    const storedRoles =
        localStorage.getItem(ROLE_STORAGE);

    const storedUsers =
        localStorage.getItem(USER_STORAGE);


    if (storedRoles) {

        try {
            roles = JSON.parse(storedRoles);
        } catch {

            roles = JSON.parse(
                JSON.stringify(DEFAULT_ROLES)
            );

        }

    } else {

        roles = JSON.parse(
            JSON.stringify(DEFAULT_ROLES)
        );

    }


    if (storedUsers) {

        try {
            users = JSON.parse(storedUsers);
        } catch {

            users = JSON.parse(
                JSON.stringify(DEFAULT_USERS)
            );

        }

    } else {

        users = JSON.parse(
            JSON.stringify(DEFAULT_USERS)
        );

    }


    if (!selectedRoleId && roles.length) {
        selectedRoleId = roles[0].id;
    }

}


function saveData() {

    localStorage.setItem(
        ROLE_STORAGE,
        JSON.stringify(roles)
    );

    localStorage.setItem(
        USER_STORAGE,
        JSON.stringify(users)
    );

}


/* =====================================
   INITIALIZE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    bindEvents();

    renderAll();

});


/* =====================================
   EVENTS
===================================== */

function bindEvents() {

    document
        .getElementById("addUserBtn")
        .addEventListener("click", openAddUserModal);


    document
        .getElementById("addRoleBtn")
        .addEventListener("click", openAddRoleModal);


    document
        .getElementById("saveAllBtn")
        .addEventListener("click", () => {

            saveData();

            showMessage(
                "Role & Permission changes saved successfully."
            );

        });


    document
        .getElementById("selectAllBtn")
        .addEventListener("click", toggleAllPermissions);


    document
        .getElementById("userForm")
        .addEventListener("submit", handleUserSubmit);


    document
        .getElementById("roleForm")
        .addEventListener("submit", handleRoleSubmit);


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener("click", () => {

                closeModal(
                    button.dataset.close
                );

            });

        });


    document
        .getElementById("userModal")
        .addEventListener("click", event => {

            if (event.target.id === "userModal") {
                closeModal("userModal");
            }

        });


    document
        .getElementById("roleModal")
        .addEventListener("click", event => {

            if (event.target.id === "roleModal") {
                closeModal("roleModal");
            }

        });

}


/* =====================================
   RENDER ALL
===================================== */

function renderAll() {

    renderSummary();

    renderUsers();

    renderRoles();

    renderRoleSelect();

    renderPermissions();

}


/* =====================================
   SUMMARY
===================================== */

function renderSummary() {

    document.getElementById("totalUsers")
        .textContent = users.length;

    document.getElementById("totalRoles")
        .textContent = roles.length;

    document.getElementById("activeUsers")
        .textContent =
        users.filter(
            user => user.status === "Active"
        ).length;


    let count = 0;

    roles.forEach(role => {

        MODULES.forEach(module => {

            ACTIONS.forEach(action => {

                if (
                    role.permissions?.[module]?.[action]
                ) {
                    count++;
                }

            });

        });

    });


    document.getElementById("permissionCount")
        .textContent = count;

}


/* =====================================
   USERS
===================================== */

function renderUsers() {

    const tbody =
        document.getElementById("usersTableBody");

    tbody.innerHTML = "";


    if (!users.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No users found.
                </td>
            </tr>
        `;

        return;

    }


    users.forEach(user => {

        const role =
            roles.find(
                item => item.id === user.roleId
            );


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>${escapeHTML(user.id)}</td>

            <td>
                <strong>
                    ${escapeHTML(user.name)}
                </strong>
            </td>

            <td>
                ${escapeHTML(user.username)}
            </td>

            <td>
                ${escapeHTML(
                    role ? role.name : "Unknown"
                )}
            </td>

            <td>

                <span class="
                    status
                    ${user.status === "Active"
                        ? "status-active"
                        : "status-inactive"}
                ">
                    ${escapeHTML(user.status)}
                </span>

            </td>

            <td>

                <button
                    class="action-btn edit-btn"
                    data-edit-user="${user.id}">
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    data-delete-user="${user.id}">
                    Delete
                </button>

            </td>
        `;


        tbody.appendChild(tr);

    });


    tbody
        .querySelectorAll("[data-edit-user]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => editUser(
                    button.dataset.editUser
                )
            );

        });


    tbody
        .querySelectorAll("[data-delete-user]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => deleteUser(
                    button.dataset.deleteUser
                )
            );

        });

}


/* =====================================
   ROLE LIST
===================================== */

function renderRoles() {

    const container =
        document.getElementById("roleList");

    container.innerHTML = "";


    roles.forEach(role => {

        const item =
            document.createElement("div");

        item.className =
            "role-item" +
            (
                role.id === selectedRoleId
                    ? " active"
                    : ""
            );


        item.innerHTML = `

            <strong>
                ${escapeHTML(role.name)}
            </strong>

            <small>
                ${escapeHTML(role.description || "")}
            </small>

        `;


        item.addEventListener(
            "click",
            () => {

                selectedRoleId = role.id;

                renderRoles();
                renderPermissions();

            }
        );


        container.appendChild(item);

    });

}


/* =====================================
   ROLE SELECT
===================================== */

function renderRoleSelect() {

    const select =
        document.getElementById("userRole");

    select.innerHTML = "";


    roles.forEach(role => {

        const option =
            document.createElement("option");

        option.value = role.id;

        option.textContent = role.name;

        select.appendChild(option);

    });

}


/* =====================================
   PERMISSION MATRIX
===================================== */

function renderPermissions() {

    const role =
        roles.find(
            item => item.id === selectedRoleId
        );


    const tbody =
        document.getElementById(
            "permissionTableBody"
        );


    if (!role) {

        tbody.innerHTML = "";

        return;

    }


    document.getElementById(
        "selectedRoleName"
    ).textContent = role.name;


    document.getElementById(
        "selectedRoleDescription"
    ).textContent =
        role.description || "No description.";


    tbody.innerHTML = "";


    MODULES.forEach(module => {

        const tr =
            document.createElement("tr");


        let cells = `
            <td>${escapeHTML(module)}</td>
        `;


        ACTIONS.forEach(action => {

            const checked =
                role.permissions?.[module]?.[action]
                    ? "checked"
                    : "";


            cells += `

                <td>

                    <input
                        type="checkbox"
                        data-module="${escapeHTML(module)}"
                        data-action="${action}"
                        ${checked}
                    >

                </td>

            `;

        });


        tr.innerHTML = cells;

        tbody.appendChild(tr);

    });


    tbody
        .querySelectorAll("input[type='checkbox']")
        .forEach(input => {

            input.addEventListener(
                "change",
                updatePermission
            );

        });

}


/* =====================================
   PERMISSION UPDATE
===================================== */

function updatePermission(event) {

    const role =
        roles.find(
            item => item.id === selectedRoleId
        );


    if (!role) return;


    const module =
        event.target.dataset.module;

    const action =
        event.target.dataset.action;


    if (!role.permissions[module]) {
        role.permissions[module] = {};
    }


    role.permissions[module][action] =
        event.target.checked;


    saveData();

    renderSummary();

}


/* =====================================
   SELECT ALL
===================================== */

function toggleAllPermissions() {

    const role =
        roles.find(
            item => item.id === selectedRoleId
        );


    if (!role) return;


    const allEnabled =
        MODULES.every(module =>
            ACTIONS.every(action =>
                role.permissions?.[module]?.[action]
            )
        );


    MODULES.forEach(module => {

        if (!role.permissions[module]) {
            role.permissions[module] = {};
        }


        ACTIONS.forEach(action => {

            role.permissions[module][action] =
                !allEnabled;

        });

    });


    saveData();

    renderPermissions();

    renderSummary();

}


/* =====================================
   ADD USER
===================================== */

function openAddUserModal() {

    document.getElementById(
        "userModalTitle"
    ).textContent = "Add User";


    document.getElementById(
        "userForm"
    ).reset();


    document.getElementById(
        "editUserId"
    ).value = "";


    renderRoleSelect();


    document.getElementById(
        "userModal"
    ).classList.add("show");

}


/* =====================================
   EDIT USER
===================================== */

function editUser(userId) {

    const user =
        users.find(
            item => item.id === userId
        );


    if (!user) return;


    document.getElementById(
        "userModalTitle"
    ).textContent = "Edit User";


    document.getElementById(
        "editUserId"
    ).value = user.id;


    document.getElementById(
        "userName"
    ).value = user.name;


    document.getElementById(
        "userUsername"
    ).value = user.username;


    renderRoleSelect();


    document.getElementById(
        "userRole"
    ).value = user.roleId;


    document.getElementById(
        "userStatus"
    ).value = user.status;


    document.getElementById(
        "userModal"
    ).classList.add("show");

}


/* =====================================
   USER SAVE
===================================== */

function handleUserSubmit(event) {

    event.preventDefault();


    const editId =
        document.getElementById(
            "editUserId"
        ).value;


    const name =
        document.getElementById(
            "userName"
        ).value.trim();


    const username =
        document.getElementById(
            "userUsername"
        ).value.trim();


    const roleId =
        document.getElementById(
            "userRole"
        ).value;


    const status =
        document.getElementById(
            "userStatus"
        ).value;


    if (!name || !username || !roleId) {

        showMessage(
            "Please complete all required fields."
        );

        return;

    }


    const duplicate =
        users.some(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase() &&
                user.id !== editId
        );


    if (duplicate) {

        showMessage(
            "This username already exists."
        );

        return;

    }


    if (editId) {

        const user =
            users.find(
                item => item.id === editId
            );


        if (user) {

            user.name = name;
            user.username = username;
            user.roleId = roleId;
            user.status = status;

        }

    } else {

        users.push({

            id: generateId("USR"),

            name,

            username,

            roleId,

            status

        });

    }


    saveData();

    renderAll();

    closeModal("userModal");

}


/* =====================================
   DELETE USER
===================================== */

function deleteUser(userId) {

    const user =
        users.find(
            item => item.id === userId
        );


    if (!user) return;


    if (user.username === "admin") {

        showMessage(
            "The primary administrator cannot be deleted."
        );

        return;

    }


    const confirmed =
        confirm(
            `Delete user "${user.name}"?`
        );


    if (!confirmed) return;


    users =
        users.filter(
            item => item.id !== userId
        );


    saveData();

    renderAll();

}


/* =====================================
   ADD ROLE
===================================== */

function openAddRoleModal() {

    document.getElementById(
        "roleForm"
    ).reset();


    document.getElementById(
        "roleModal"
    ).classList.add("show");

}


/* =====================================
   ROLE SAVE
===================================== */

function handleRoleSubmit(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "roleName"
        ).value.trim();


    const description =
        document.getElementById(
            "roleDescription"
        ).value.trim();


    if (!name) {

        showMessage(
            "Role name is required."
        );

        return;

    }


    const duplicate =
        roles.some(
            role =>
                role.name.toLowerCase() ===
                name.toLowerCase()
        );


    if (duplicate) {

        showMessage(
            "This role already exists."
        );

        return;

    }


    const role = {

        id: generateId("ROLE"),

        name,

        description,

        protected: false,

        permissions: createPermissionSet()

    };


    roles.push(role);

    selectedRoleId = role.id;


    saveData();

    renderAll();

    closeModal("roleModal");

}


/* =====================================
   MODAL
===================================== */

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }

}


/* =====================================
   MESSAGE
===================================== */

function showMessage(message) {

    alert(message);

}


/* =====================================
   SECURITY HELPER
===================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================
   PUBLIC ACCESS CHECK HELPER
   Future modules can use this.
===================================== */

function hasPermission(
    roleId,
    moduleName,
    actionName
) {

    const role =
        roles.find(
            item => item.id === roleId
        );


    if (!role) return false;


    return Boolean(
        role.permissions?.[moduleName]?.[actionName]
    );

}


/* =====================================
   GLOBAL API
   Future LUMENIX modules can access
   permission checker through window.
===================================== */

window.LumenixRBAC = {

    getRoles: () => roles,

    getUsers: () => users,

    getRole: roleId =>
        roles.find(
            role => role.id === roleId
        ),

    hasPermission,

    save: saveData

};
