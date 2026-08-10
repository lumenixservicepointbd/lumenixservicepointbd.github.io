/* =====================================
   LUMENIX V5.1
   ROLE + PERMISSION + TECHNICIAN CONTROL
===================================== */

"use strict";


/* =====================================
   STORAGE
===================================== */

const ROLE_STORAGE = "lumenixRoles";
const USER_STORAGE = "lumenixUsers";
const TECHNICIAN_STORAGE = "lumenixTechnicians";


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
        permissions: createPermissionSet(MODULES)
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
        description: "Technician network and service access.",
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
   DEFAULT TECHNICIANS
===================================== */

const DEFAULT_TECHNICIANS = [];


/* =====================================
   STATE
===================================== */

let roles = [];
let users = [];
let technicians = [];
let selectedRoleId = null;


/* =====================================
   PERMISSION HELPERS
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


/* =====================================
   ID GENERATOR
===================================== */

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

    const storedTechnicians =
        localStorage.getItem(TECHNICIAN_STORAGE);


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


    if (storedTechnicians) {

        try {

            technicians =
                JSON.parse(storedTechnicians);

        } catch {

            technicians =
                JSON.parse(
                    JSON.stringify(DEFAULT_TECHNICIANS)
                );

        }

    } else {

        technicians =
            JSON.parse(
                JSON.stringify(DEFAULT_TECHNICIANS)
            );

    }


    /*
    Compatibility protection.
    If an older role record is missing
    permission fields, rebuild them.
    */

    roles.forEach(role => {

        if (!role.permissions) {

            role.permissions =
                createPermissionSet();

        }

        MODULES.forEach(module => {

            if (!role.permissions[module]) {

                role.permissions[module] = {};

            }

            ACTIONS.forEach(action => {

                if (
                    typeof role.permissions[module][action]
                    !== "boolean"
                ) {

                    role.permissions[module][action] =
                        false;

                }

            });

        });

    });


    if (
        !selectedRoleId &&
        roles.length
    ) {

        selectedRoleId =
            roles[0].id;

    }

}


/* =====================================
   SAVE
===================================== */

function saveData() {

    localStorage.setItem(
        ROLE_STORAGE,
        JSON.stringify(roles)
    );

    localStorage.setItem(
        USER_STORAGE,
        JSON.stringify(users)
    );

    localStorage.setItem(
        TECHNICIAN_STORAGE,
        JSON.stringify(technicians)
    );

}


/* =====================================
   INITIALIZE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        bindEvents();

        renderAll();

    }
);


/* =====================================
   EVENTS
===================================== */

function bindEvents() {

    const addUserBtn =
        document.getElementById(
            "addUserBtn"
        );

    const addRoleBtn =
        document.getElementById(
            "addRoleBtn"
        );

    const addTechnicianBtn =
        document.getElementById(
            "addTechnicianBtn"
        );

    const saveAllBtn =
        document.getElementById(
            "saveAllBtn"
        );

    const selectAllBtn =
        document.getElementById(
            "selectAllBtn"
        );

    const userForm =
        document.getElementById(
            "userForm"
        );

    const roleForm =
        document.getElementById(
            "roleForm"
        );

    const technicianForm =
        document.getElementById(
            "technicianForm"
        );


    if (addUserBtn) {

        addUserBtn.addEventListener(
            "click",
            openAddUserModal
        );

    }


    if (addRoleBtn) {

        addRoleBtn.addEventListener(
            "click",
            openAddRoleModal
        );

    }


    if (addTechnicianBtn) {

        addTechnicianBtn.addEventListener(
            "click",
            openAddTechnicianModal
        );

    }


    if (saveAllBtn) {

        saveAllBtn.addEventListener(
            "click",
            function () {

                saveData();

                showMessage(
                    "All LUMENIX changes saved successfully."
                );

            }
        );

    }


    if (selectAllBtn) {

        selectAllBtn.addEventListener(
            "click",
            toggleAllPermissions
        );

    }


    if (userForm) {

        userForm.addEventListener(
            "submit",
            handleUserSubmit
        );

    }


    if (roleForm) {

        roleForm.addEventListener(
            "submit",
            handleRoleSubmit
        );

    }


    if (technicianForm) {

        technicianForm.addEventListener(
            "submit",
            handleTechnicianSubmit
        );

    }


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    const userModal =
        document.getElementById(
            "userModal"
        );

    if (userModal) {

        userModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.id ===
                    "userModal"
                ) {

                    closeModal("userModal");

                }

            }
        );

    }


    const roleModal =
        document.getElementById(
            "roleModal"
        );

    if (roleModal) {

        roleModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.id ===
                    "roleModal"
                ) {

                    closeModal("roleModal");

                }

            }
        );

    }


    const technicianModal =
        document.getElementById(
            "technicianModal"
        );

    if (technicianModal) {

        technicianModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.id ===
                    "technicianModal"
                ) {

                    closeModal(
                        "technicianModal"
                    );

                }

            }
        );

    }

}


/* =====================================
   RENDER ALL
===================================== */

function renderAll() {

    renderSummary();

    renderUsers();

    renderTechnicians();

    renderRoles();

    renderRoleSelect();

    renderPermissions();

}


/* =====================================
   SUMMARY
===================================== */

function renderSummary() {

    const totalUsers =
        document.getElementById(
            "totalUsers"
        );

    const totalRoles =
        document.getElementById(
            "totalRoles"
        );

    const activeUsers =
        document.getElementById(
            "activeUsers"
        );

    const permissionCount =
        document.getElementById(
            "permissionCount"
        );


    if (totalUsers) {

        totalUsers.textContent =
            users.length;

    }


    if (totalRoles) {

        totalRoles.textContent =
            roles.length;

    }


    if (activeUsers) {

        activeUsers.textContent =
            users.filter(
                user =>
                    user.status === "Active"
            ).length;

    }


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


    if (permissionCount) {

        permissionCount.textContent =
            count;

    }

}


/* =====================================
   USER MANAGEMENT
===================================== */

function renderUsers() {

    const tbody =
        document.getElementById(
            "usersTableBody"
        );


    if (!tbody) return;


    tbody.innerHTML = "";


    if (!users.length) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="text-align:center;">

                    No users found.

                </td>

            </tr>

        `;

        return;

    }


    users.forEach(user => {

        const role =
            roles.find(
                item =>
                    item.id ===
                    user.roleId
            );


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>
                ${escapeHTML(user.id)}
            </td>

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
                    role
                        ? role.name
                        : "Unknown"
                )}
            </td>

            <td>

                <span class="
                    status
                    ${
                        user.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                    }
                ">

                    ${escapeHTML(
                        user.status
                    )}

                </span>

            </td>

            <td>

                <button
                    class="action-btn edit-btn"
                    data-edit-user="${escapeHTML(user.id)}">

                    Edit

                </button>


                <button
                    class="action-btn delete-btn"
                    data-delete-user="${escapeHTML(user.id)}">

                    Delete

                </button>

            </td>

        `;


        tbody.appendChild(tr);

    });


    tbody
        .querySelectorAll(
            "[data-edit-user]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    editUser(
                        button.dataset.editUser
                    );

                }
            );

        });


    tbody
        .querySelectorAll(
            "[data-delete-user]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    deleteUser(
                        button.dataset.deleteUser
                    );

                }
            );

        });

}


/* =====================================
   TECHNICIAN MANAGEMENT
===================================== */

function renderTechnicians() {

    const tbody =
        document.getElementById(
            "techniciansTableBody"
        );


    if (!tbody) return;


    tbody.innerHTML = "";


    if (!technicians.length) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="text-align:center;">

                    No Technician Profile Found

                </td>

            </tr>

        `;

        return;

    }


    technicians.forEach(technician => {

        const tr =
            document.createElement("tr");


        const verification =
            technician.verified === true
                ? `
                    <span class="status status-active">
                        ✓ Verified
                    </span>
                  `
                : `
                    <span class="status status-inactive">
                        Not Verified
                    </span>
                  `;


        tr.innerHTML = `

            <td>

                <strong>
                    ${escapeHTML(
                        technician.name
                    )}
                </strong>

                <br>

                <small>
                    ${escapeHTML(
                        technician.username
                    )}
                </small>

            </td>


            <td>
                ${escapeHTML(
                    technician.department || "-"
                )}
            </td>


            <td>
                ${escapeHTML(
                    technician.district || "-"
                )}
            </td>


            <td>
                ${escapeHTML(
                    technician.area || "-"
                )}
            </td>


            <td>
                ${verification}
            </td>


            <td>

                <span class="
                    status
                    ${
                        technician.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                    }
                ">

                    ${escapeHTML(
                        technician.status
                    )}

                </span>

            </td>


            <td>

                <button
                    class="action-btn edit-btn"
                    data-edit-technician="${escapeHTML(
                        technician.id
                    )}">

                    Edit

                </button>


                <button
                    class="action-btn delete-btn"
                    data-delete-technician="${escapeHTML(
                        technician.id
                    )}">

                    Delete

                </button>

            </td>

        `;


        tbody.appendChild(tr);

    });


    tbody
        .querySelectorAll(
            "[data-edit-technician]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    editTechnician(
                        button.dataset.editTechnician
                    );

                }
            );

        });


    tbody
        .querySelectorAll(
            "[data-delete-technician]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    deleteTechnician(
                        button.dataset.deleteTechnician
                    );

                }
            );

        });

}


/* =====================================
   ROLE LIST
===================================== */

function renderRoles() {

    const container =
        document.getElementById(
            "roleList"
        );


    if (!container) return;


    container.innerHTML = "";


    roles.forEach(role => {

        const item =
            document.createElement("div");


        item.className =
            "role-item" +
            (
                role.id ===
                selectedRoleId
                    ? " active"
                    : ""
            );


        item.innerHTML = `

            <strong>
                ${escapeHTML(
                    role.name
                )}
            </strong>

            <small>
                ${escapeHTML(
                    role.description || ""
                )}
            </small>

        `;


        item.addEventListener(
            "click",
            function () {

                selectedRoleId =
                    role.id;

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
        document.getElementById(
            "userRole"
        );


    if (!select) return;


    select.innerHTML = "";


    roles.forEach(role => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            role.id;


        option.textContent =
            role.name;


        select.appendChild(option);

    });

}


/* =====================================
   PERMISSION MATRIX
===================================== */

function renderPermissions() {

    const role =
        roles.find(
            item =>
                item.id ===
                selectedRoleId
        );


    const tbody =
        document.getElementById(
            "permissionTableBody"
        );


    if (!tbody) return;


    if (!role) {

        tbody.innerHTML = "";

        return;

    }


    const selectedRoleName =
        document.getElementById(
            "selectedRoleName"
        );


    const selectedRoleDescription =
        document.getElementById(
            "selectedRoleDescription"
        );


    if (selectedRoleName) {

        selectedRoleName.textContent =
            role.name;

    }


    if (selectedRoleDescription) {

        selectedRoleDescription.textContent =
            role.description ||
            "No description.";

    }


    tbody.innerHTML = "";


    MODULES.forEach(module => {

        const tr =
            document.createElement("tr");


        let cells = `

            <td>
                ${escapeHTML(module)}
            </td>

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
        .querySelectorAll(
            "input[type='checkbox']"
        )
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
            item =>
                item.id ===
                selectedRoleId
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
            item =>
                item.id ===
                selectedRoleId
        );


    if (!role) return;


    const allEnabled =
        MODULES.every(
            module =>
                ACTIONS.every(
                    action =>
                        role.permissions
                            ?.[
                                module
                            ]
                            ?.[
                                action
                            ]
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

    const form =
        document.getElementById(
            "userForm"
        );


    if (form) {

        form.reset();

    }


    document.getElementById(
        "userModalTitle"
    ).textContent =
        "Add User";


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
            item =>
                item.id ===
                userId
        );


    if (!user) return;


    document.getElementById(
        "userModalTitle"
    ).textContent =
        "Edit User";


    document.getElementById(
        "editUserId"
    ).value =
        user.id;


    document.getElementById(
        "userName"
    ).value =
        user.name;


    document.getElementById(
        "userUsername"
    ).value =
        user.username;


    renderRoleSelect();


    document.getElementById(
        "userRole"
    ).value =
        user.roleId;


    document.getElementById(
        "userStatus"
    ).value =
        user.status;


    document.getElementById(
        "userModal"
    ).classList.add("show");

}


/* =====================================
   SAVE USER
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


    if (
        !name ||
        !username ||
        !roleId
    ) {

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
                item =>
                    item.id ===
                    editId
            );


        if (user) {

            user.name =
                name;

            user.username =
                username;

            user.roleId =
                roleId;

            user.status =
                status;

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


    /*
    If the user is assigned
    Technician role, keep technician
    profile connection possible.
    */

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
            item =>
                item.id ===
                userId
        );


    if (!user) return;


    if (
        user.username ===
        "admin"
    ) {

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
            item =>
                item.id !==
                userId
        );


    saveData();

    renderAll();

}


/* =====================================
   ADD TECHNICIAN
===================================== */

function openAddTechnicianModal() {

    const form =
        document.getElementById(
            "technicianForm"
        );


    if (form) {

        form.reset();

    }


    document.getElementById(
        "technicianModalTitle"
    ).textContent =
        "Add Technician Profile";


    document.getElementById(
        "editTechnicianId"
    ).value = "";


    document.getElementById(
        "technicianStatus"
    ).value =
        "Active";


    document.getElementById(
        "technicianVerified"
    ).value =
        "true";


    document.getElementById(
        "technicianModal"
    ).classList.add("show");

}


/* =====================================
   EDIT TECHNICIAN
===================================== */

function editTechnician(
    technicianId
) {

    const technician =
        technicians.find(
            item =>
                item.id ===
                technicianId
        );


    if (!technician) return;


    document.getElementById(
        "technicianModalTitle"
    ).textContent =
        "Edit Technician Profile";


    document.getElementById(
        "editTechnicianId"
    ).value =
        technician.id;


    document.getElementById(
        "technicianName"
    ).value =
        technician.name || "";


    document.getElementById(
        "technicianUsername"
    ).value =
        technician.username || "";


    document.getElementById(
        "technicianPhone"
    ).value =
        technician.phone || "";


    document.getElementById(
        "technicianEmail"
    ).value =
        technician.email || "";


    document.getElementById(
        "technicianDepartment"
    ).value =
        technician.department || "";


    document.getElementById(
        "technicianDistrict"
    ).value =
        technician.district || "";


    document.getElementById(
        "technicianArea"
    ).value =
        technician.area || "";


    document.getElementById(
        "technicianExperience"
    ).value =
        technician.experience || "";


    document.getElementById(
        "technicianPhoto"
    ).value =
        technician.photo || "";


    document.getElementById(
        "technicianStatus"
    ).value =
        technician.status || "Active";


    document.getElementById(
        "technicianVerified"
    ).value =
        technician.verified
            ? "true"
            : "false";


    document.getElementById(
        "technicianWorkDescription"
    ).value =
        technician.workDescription || "";


    document.getElementById(
        "technicianServices"
    ).value =
        technician.services || "";


    document.getElementById(
        "technicianBio"
    ).value =
        technician.bio || "";


    document.getElementById(
        "technicianModal"
    ).classList.add("show");

}


/* =====================================
   SAVE TECHNICIAN
===================================== */

function handleTechnicianSubmit(
    event
) {

    event.preventDefault();


    const editId =
        document.getElementById(
            "editTechnicianId"
        ).value;


    const name =
        document.getElementById(
            "technicianName"
        ).value.trim();


    const username =
        document.getElementById(
            "technicianUsername"
        ).value.trim();


    const phone =
        document.getElementById(
            "technicianPhone"
        ).value.trim();


    const email =
        document.getElementById(
            "technicianEmail"
        ).value.trim();


    const department =
        document.getElementById(
            "technicianDepartment"
        ).value.trim();


    const district =
        document.getElementById(
            "technicianDistrict"
        ).value.trim();


    const area =
        document.getElementById(
            "technicianArea"
        ).value.trim();


    const experience =
        document.getElementById(
            "technicianExperience"
        ).value.trim();


    const photo =
        document.getElementById(
            "technicianPhoto"
        ).value.trim();


    const status =
        document.getElementById(
            "technicianStatus"
        ).value;


    const verified =
        document.getElementById(
            "technicianVerified"
        ).value ===
        "true";


    const workDescription =
        document.getElementById(
            "technicianWorkDescription"
        ).value.trim();


    const services =
        document.getElementById(
            "technicianServices"
        ).value.trim();


    const bio =
        document.getElementById(
            "technicianBio"
        ).value.trim();


    if (
        !name ||
        !username
    ) {

        showMessage(
            "Technician name and username are required."
        );

        return;

    }


    const duplicate =
        technicians.some(
            technician =>
                technician.username
                    .toLowerCase() ===
                username.toLowerCase() &&
                technician.id !== editId
        );


    if (duplicate) {

        showMessage(
            "A technician profile with this username already exists."
        );

        return;

    }


    const profileData = {

        id:
            editId ||
            generateId("TECH"),

        name,

        username,

        phone,

        email,

        department,

        district,

        area,

        experience,

        photo,

        status,

        verified,

        workDescription,

        services,

        bio,

        updatedAt:
            new Date().toISOString()

    };


    if (editId) {

        const index =
            technicians.findIndex(
                technician =>
                    technician.id ===
                    editId
            );


        if (index !== -1) {

            technicians[index] =
                profileData;

        }

    } else {

        technicians.push(
            profileData
        );

    }


    /*
    Automatically make sure a Technician
    role user can be connected later.
    */

    const technicianUser =
        users.find(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );


    if (
        technicianUser &&
        !technicianUser.roleId
    ) {

        const technicianRole =
            roles.find(
                role =>
                    role.id ===
                    "technician"
            );


        if (technicianRole) {

            technicianUser.roleId =
                technicianRole.id;

        }

    }


    saveData();

    renderAll();

    closeModal(
        "technicianModal"
    );


    showMessage(
        verified
            ? "Verified technician profile saved successfully."
            : "Technician profile saved. Verification is currently disabled."
    );

}


/* =====================================
   DELETE TECHNICIAN
===================================== */

function deleteTechnician(
    technicianId
) {

    const technician =
        technicians.find(
            item =>
                item.id ===
                technicianId
        );


    if (!technician) return;


    const confirmed =
        confirm(
            `Delete technician profile "${technician.name}"?`
        );


    if (!confirmed) return;


    technicians =
        technicians.filter(
            item =>
                item.id !==
                technicianId
        );


    saveData();

    renderAll();

}


/* =====================================
   ADD ROLE
===================================== */

function openAddRoleModal() {

    const form =
        document.getElementById(
            "roleForm"
        );


    if (form) {

        form.reset();

    }


    document.getElementById(
        "roleModal"
    ).classList.add("show");

}


/* =====================================
   ROLE SAVE
===================================== */

function handleRoleSubmit(
    event
) {

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

        id:
            generateId("ROLE"),

        name,

        description,

        protected: false,

        permissions:
            createPermissionSet()

    };


    roles.push(role);

    selectedRoleId =
        role.id;


    saveData();

    renderAll();

    closeModal(
        "roleModal"
    );

}


/* =====================================
   MODAL
===================================== */

function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove(
            "show"
        );

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

    return String(value ?? "")
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


/* =====================================
   PUBLIC TECHNICIAN API
   Homepage can use this later.
===================================== */

function getVerifiedTechnicians() {

    return technicians.filter(
        technician =>
            technician.status ===
                "Active" &&
            technician.verified ===
                true
    );

}


function getTechniciansByDistrict(
    district
) {

    return getVerifiedTechnicians()
        .filter(
            technician =>
                technician.district
                    .toLowerCase() ===
                String(
                    district
                ).toLowerCase()
        );

}


function getTechniciansByArea(
    area
) {

    return getVerifiedTechnicians()
        .filter(
            technician =>
                technician.area
                    .toLowerCase() ===
                String(
                    area
                ).toLowerCase()
        );

}


/* =====================================
   RBAC HELPER
===================================== */

function hasPermission(
    roleId,
    moduleName,
    actionName
) {

    const role =
        roles.find(
            item =>
                item.id ===
                roleId
        );


    if (!role) return false;


    return Boolean(
        role.permissions
            ?.[
                moduleName
            ]
            ?.[
                actionName
            ]
    );

}


/* =====================================
   GLOBAL LUMENIX API
===================================== */

window.LumenixRBAC = {

    getRoles: function () {

        return roles;

    },


    getUsers: function () {

        return users;

    },


    getRole: function (roleId) {

        return roles.find(
            role =>
                role.id ===
                roleId
        );

    },


    hasPermission,


    save: saveData,


    getTechnicians: function () {

        return technicians;

    },


    getVerifiedTechnicians,


    getTechniciansByDistrict,


    getTechniciansByArea

};
