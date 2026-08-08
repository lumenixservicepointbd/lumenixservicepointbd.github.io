/* =========================================================
   LUMENIX V5.1
   PROJECT MANAGEMENT
   project.js

   Storage:
   lumenix_projects_v51
   ========================================================= */

"use strict";


const STORAGE_KEY = "lumenix_projects_v51";

let projects = [];
let selectedProjectIndex = -1;


/* =========================================================
   DOM HELPER
   ========================================================= */

function $(id) {
    return document.getElementById(id);
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

    bindEvents();

    renderProjects();

    updateSummary();

    clearSelectedProject();

});


/* =========================================================
   LOAD / SAVE
   ========================================================= */

function loadProjects() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            projects = [];
            return;
        }

        const parsed = JSON.parse(saved);

        projects = Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error("Project data load error:", error);

        projects = [];

    }

}


function saveProjects() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(projects)
    );

}


/* =========================================================
   EVENT BINDING
   ========================================================= */

function bindEvents() {

    $("projectForm").addEventListener(
        "submit",
        handleProjectSubmit
    );


    $("clearProjectBtn").addEventListener(
        "click",
        clearForm
    );


    $("cancelEditBtn").addEventListener(
        "click",
        cancelEdit
    );


    $("refreshProjectsBtn").addEventListener(
        "click",
        refreshProjects
    );


    $("projectSearch").addEventListener(
        "input",
        renderProjects
    );


    $("projectStatusFilter").addEventListener(
        "change",
        renderProjects
    );


    $("projectSort").addEventListener(
        "change",
        renderProjects
    );


    $("addProjectBtn").addEventListener(
        "click",
        focusAddForm
    );


    $("viewProjectsBtn").addEventListener(
        "click",
        () => scrollToSection("projectTableBody")
    );


    $("runningProjectsBtn").addEventListener(
        "click",
        () => setStatusFilter("Running")
    );


    $("completedProjectsBtn").addEventListener(
        "click",
        () => setStatusFilter("Completed")
    );


    $("pendingProjectsBtn").addEventListener(
        "click",
        () => setStatusFilter("Pending")
    );


    $("editProjectBtn").addEventListener(
        "click",
        editSelectedProject
    );


    $("deleteProjectBtn").addEventListener(
        "click",
        deleteSelectedProject
    );


    $("viewProjectBtn").addEventListener(
        "click",
        viewSelectedProject
    );


    $("printProjectBtn").addEventListener(
        "click",
        printSelectedProject
    );


    $("backDashboardBtn").addEventListener(
        "click",
        goDashboard
    );


    $("backDashboardBottomBtn").addEventListener(
        "click",
        goDashboard
    );


    $("resetProjectDataBtn").addEventListener(
        "click",
        resetAllProjectData
    );

}


/* =========================================================
   PROJECT SUBMIT
   ========================================================= */

function handleProjectSubmit(event) {

    event.preventDefault();

    const project = collectFormData();

    if (!project.projectId || !project.projectName) {

        alert("Project ID and Project Name are required.");

        return;

    }


    const editingIndex = Number(
        $("editingProjectIndex").value
    );


    if (editingIndex >= 0) {

        const existing = projects[editingIndex];

        project.createdAt =
            existing.createdAt || new Date().toISOString();

        project.updatedAt =
            new Date().toISOString();

        projects[editingIndex] = project;

        selectedProjectIndex = editingIndex;

        alert("Project updated successfully.");

    } else {

        project.createdAt =
            new Date().toISOString();

        project.updatedAt =
            new Date().toISOString();

        projects.push(project);

        selectedProjectIndex =
            projects.length - 1;

        alert("Project saved successfully.");

    }


    saveProjects();

    renderProjects();

    updateSummary();

    showSelectedProject(
        selectedProjectIndex
    );

    clearForm(false);

}


/* =========================================================
   COLLECT FORM DATA
   ========================================================= */

function collectFormData() {

    return {

        projectId:
            $("projectId").value.trim(),

        projectName:
            $("projectName").value.trim(),

        customer:
            $("projectCustomer").value.trim(),

        type:
            $("projectType").value,

        amount:
            Number($("projectAmount").value) || 0,

        startDate:
            $("projectStartDate").value,

        endDate:
            $("projectEndDate").value,

        status:
            $("projectStatus").value,

        description:
            $("projectDescription").value.trim(),

        notes:
            $("projectNotes").value.trim()

    };

}


/* =========================================================
   RENDER PROJECT TABLE
   ========================================================= */

function renderProjects() {

    const tbody = $("projectTableBody");

    tbody.innerHTML = "";

    let filteredProjects =
        getFilteredProjects();


    if (filteredProjects.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">
                    No Project Found
                </td>
            </tr>
        `;

        return;

    }


    filteredProjects.forEach(item => {

        const project =
            projects[item.index];

        const row =
            document.createElement("tr");


        if (item.index === selectedProjectIndex) {
            row.classList.add("selected-row");
        }


        row.innerHTML = `

            <td>
                ${escapeHTML(project.projectId)}
            </td>

            <td>
                <strong>
                    ${escapeHTML(project.projectName)}
                </strong>
            </td>

            <td>
                ${escapeHTML(project.customer)}
            </td>

            <td>
                ${statusBadge(project.status)}
            </td>

            <td>
                ৳${formatMoney(project.amount)}
            </td>

            <td>

                <div class="table-actions">

                    <button
                        class="table-view"
                        type="button"
                        data-action="view"
                        data-index="${item.index}">
                        View
                    </button>

                    <button
                        class="table-edit"
                        type="button"
                        data-action="edit"
                        data-index="${item.index}">
                        Edit
                    </button>

                    <button
                        class="table-delete"
                        type="button"
                        data-action="delete"
                        data-index="${item.index}">
                        Delete
                    </button>

                </div>

            </td>
        `;


        tbody.appendChild(row);

    });


    tbody
        .querySelectorAll("button[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                handleTableAction
            );

        });

}


/* =========================================================
   FILTER / SORT
   ========================================================= */

function getFilteredProjects() {

    const search =
        $("projectSearch")
            .value
            .trim()
            .toLowerCase();


    const status =
        $("projectStatusFilter").value;


    let result =
        projects
            .map((project, index) => ({
                project,
                index
            }))
            .filter(item => {

                const project =
                    item.project;

                const matchesSearch =
                    !search ||
                    project.projectId
                        .toLowerCase()
                        .includes(search) ||

                    project.projectName
                        .toLowerCase()
                        .includes(search) ||

                    project.customer
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    status === "all" ||
                    project.status === status;


                return matchesSearch &&
                       matchesStatus;

            });


    const sort =
        $("projectSort").value;


    if (sort === "name") {

        result.sort((a, b) =>
            a.project.projectName.localeCompare(
                b.project.projectName
            )
        );

    }


    if (sort === "amount") {

        result.sort(
            (a, b) =>
                Number(b.project.amount) -
                Number(a.project.amount)
        );

    }


    if (sort === "status") {

        result.sort((a, b) =>
            a.project.status.localeCompare(
                b.project.status
            )
        );

    }


    if (sort === "newest") {

        result.sort((a, b) =>
            new Date(b.project.createdAt) -
            new Date(a.project.createdAt)
        );

    }


    return result;

}


/* =========================================================
   SUMMARY
   ========================================================= */

function updateSummary() {

    $("totalProjectCount").textContent =
        projects.length;


    $("runningProjectCount").textContent =
        projects.filter(
            project =>
                project.status === "Running"
        ).length;


    $("completedProjectCount").textContent =
        projects.filter(
            project =>
                project.status === "Completed"
        ).length;


    $("pendingProjectCount").textContent =
        projects.filter(
            project =>
                project.status === "Pending"
        ).length;

}


/* =========================================================
   TABLE ACTION
   ========================================================= */

function handleTableAction(event) {

    const button =
        event.currentTarget;

    const index =
        Number(button.dataset.index);

    const action =
        button.dataset.action;


    if (
        index < 0 ||
        index >= projects.length
    ) {
        return;
    }


    if (action === "view") {

        selectedProjectIndex = index;

        showSelectedProject(index);

        scrollToSection(
            "activeProjectName"
        );

    }


    if (action === "edit") {

        selectedProjectIndex = index;

        showSelectedProject(index);

        fillFormForEdit(index);

    }


    if (action === "delete") {

        deleteProject(index);

    }

}


/* =========================================================
   SELECT PROJECT
   ========================================================= */

function showSelectedProject(index) {

    if (
        index < 0 ||
        index >= projects.length
    ) {
        clearSelectedProject();
        return;
    }


    const project =
        projects[index];


    selectedProjectIndex =
        index;


    $("activeProjectName").textContent =
        project.projectName;


    $("currentProjectId").textContent =
        project.projectId;


    $("currentProjectCustomer").textContent =
        project.customer;


    $("currentProjectType").textContent =
        project.type || "—";


    $("currentProjectStatus").textContent =
        project.status;


    $("currentProjectAmount").textContent =
        `৳${formatMoney(project.amount)}`;


    $("currentProjectStartDate").textContent =
        project.startDate || "—";


    $("currentProjectEndDate").textContent =
        project.endDate || "—";


    $("currentProjectDescription").textContent =
        project.description ||
        "No description available.";


    $("currentProjectNotes").textContent =
        project.notes ||
        "No additional notes.";


    $("selectedProjectBadge").className =
        `status-badge ${statusClass(project.status)}`;


    $("selectedProjectBadge").textContent =
        project.status;


    renderProjects();

}


/* =========================================================
   CLEAR SELECTED PROJECT
   ========================================================= */

function clearSelectedProject() {

    selectedProjectIndex = -1;

    $("activeProjectName").textContent =
        "No Active Project";

    $("currentProjectId").textContent =
        "—";

    $("currentProjectCustomer").textContent =
        "No Customer";

    $("currentProjectType").textContent =
        "—";

    $("currentProjectStatus").textContent =
        "No Status";

    $("currentProjectAmount").textContent =
        "৳0";

    $("currentProjectStartDate").textContent =
        "—";

    $("currentProjectEndDate").textContent =
        "—";

    $("currentProjectDescription").textContent =
        "No description available.";

    $("currentProjectNotes").textContent =
        "No additional notes.";

    $("selectedProjectBadge").className =
        "status-badge neutral";

    $("selectedProjectBadge").textContent =
        "No Selection";

}


/* =========================================================
   EDIT
   ========================================================= */

function editSelectedProject() {

    if (
        selectedProjectIndex < 0
    ) {
        alert("Please select a project first.");
        return;
    }


    fillFormForEdit(
        selectedProjectIndex
    );

}


function fillFormForEdit(index) {

    const project =
        projects[index];


    $("editingProjectIndex").value =
        index;


    $("projectId").value =
        project.projectId;


    $("projectName").value =
        project.projectName;


    $("projectCustomer").value =
        project.customer;


    $("projectType").value =
        project.type || "Electrical";


    $("projectAmount").value =
        project.amount;


    $("projectStartDate").value =
        project.startDate || "";


    $("projectEndDate").value =
        project.endDate || "";


    $("projectStatus").value =
        project.status;


    $("projectDescription").value =
        project.description || "";


    $("projectNotes").value =
        project.notes || "";


    $("projectFormTitle").textContent =
        "Edit Project";


    $("saveProjectBtn").textContent =
        "💾 Update Project";


    $("cancelEditBtn").hidden =
        false;


    scrollToSection(
        "projectFormSection"
    );

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteSelectedProject() {

    if (
        selectedProjectIndex < 0
    ) {
        alert("Please select a project first.");
        return;
    }


    deleteProject(
        selectedProjectIndex
    );

}


function deleteProject(index) {

    const project =
        projects[index];


    if (!project) {
        return;
    }


    const confirmed =
        confirm(
            `Delete project "${project.projectName}"?`
        );


    if (!confirmed) {
        return;
    }


    projects.splice(index, 1);


    saveProjects();

    selectedProjectIndex = -1;


    renderProjects();

    updateSummary();

    clearSelectedProject();

    clearForm();


    alert("Project deleted successfully.");

}


/* =========================================================
   VIEW DETAILS
   ========================================================= */

function viewSelectedProject() {

    if (
        selectedProjectIndex < 0
    ) {
        alert("Please select a project first.");
        return;
    }


    showSelectedProject(
        selectedProjectIndex
    );


    scrollToSection(
        "activeProjectName"
    );

}


/* =========================================================
   FORM CLEAR
   ========================================================= */

function clearForm(showMessage = false) {

    $("projectForm").reset();

    $("editingProjectIndex").value =
        "-1";


    $("projectFormTitle").textContent =
        "Add New Project";


    $("saveProjectBtn").textContent =
        "💾 Save Project";


    $("cancelEditBtn").hidden =
        true;


    if (showMessage) {
        alert("Form cleared.");
    }

}


function cancelEdit() {

    clearForm();

}


/* =========================================================
   NAVIGATION HELPERS
   ========================================================= */

function focusAddForm() {

    clearForm();

    scrollToSection(
        "projectFormSection"
    );


    setTimeout(() => {

        $("projectId").focus();

    }, 300);

}


function setStatusFilter(status) {

    $("projectStatusFilter").value =
        status;

    renderProjects();

    scrollToSection(
        "projectTableBody"
    );

}


function refreshProjects() {

    loadProjects();

    renderProjects();

    updateSummary();


    if (
        selectedProjectIndex >= 0 &&
        selectedProjectIndex < projects.length
    ) {

        showSelectedProject(
            selectedProjectIndex
        );

    } else {

        clearSelectedProject();

    }

}


/* =========================================================
   PRINT
   ========================================================= */

function printSelectedProject() {

    if (
        selectedProjectIndex < 0
    ) {
        alert("Please select a project first.");
        return;
    }


    window.print();

}


/* =========================================================
   RESET ALL DATA
   ========================================================= */

function resetAllProjectData() {

    const confirmed =
        confirm(
            "This will permanently remove all locally stored project records. Continue?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        STORAGE_KEY
    );


    projects = [];

    selectedProjectIndex = -1;


    renderProjects();

    updateSummary();

    clearSelectedProject();

    clearForm();


    alert("All project data has been reset.");

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function goDashboard() {

    window.location.href =
        "admin.html";

}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollToSection(id) {

    const element =
        $(id);


    if (!element) {
        return;
    }


    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   STATUS HELPERS
   ========================================================= */

function statusClass(status) {

    if (status === "Running") {
        return "running";
    }

    if (status === "Completed") {
        return "completed";
    }

    if (status === "Pending") {
        return "pending";
    }

    return "neutral";

}


function statusBadge(status) {

    return `
        <span class="status-badge ${statusClass(status)}">
            ${escapeHTML(status)}
        </span>
    `;

}


/* =========================================================
   FORMAT
   ========================================================= */

function formatMoney(value) {

    return Number(value || 0)
        .toLocaleString(
            "en-BD",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================================
   SECURITY
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
