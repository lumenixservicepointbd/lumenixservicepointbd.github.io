/* =====================================
LUMENIX V5.1
PROJECT MANAGEMENT JAVASCRIPT
===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
    PROJECT DATA
    ===================================== */

    let projects = JSON.parse(
        localStorage.getItem("lumenixProjects")
    ) || [];


    let selectedProjectId = null;


    /* =====================================
    COMMON ELEMENTS
    ===================================== */

    const projectForm =
        document.getElementById("projectForm");

    const projectTableBody =
        document.getElementById("projectTableBody");

    const projectSearch =
        document.getElementById("projectSearch");

    const projectStatusFilter =
        document.getElementById("projectStatusFilter");

    const projectSort =
        document.getElementById("projectSort");


    /* =====================================
    SAVE DATA
    ===================================== */

    function saveProjects() {

        localStorage.setItem(
            "lumenixProjects",
            JSON.stringify(projects)
        );

    }


    /* =====================================
    PROJECT SUMMARY
    ===================================== */

    function updateSummary() {

        const totalProjectCount =
            document.getElementById("totalProjectCount");

        const runningProjectCount =
            document.getElementById("runningProjectCount");

        const completedProjectCount =
            document.getElementById("completedProjectCount");

        const pendingProjectCount =
            document.getElementById("pendingProjectCount");


        const running =
            projects.filter(
                project => project.status === "Running"
            ).length;


        const completed =
            projects.filter(
                project => project.status === "Completed"
            ).length;


        const pending =
            projects.filter(
                project => project.status === "Pending"
            ).length;


        if (totalProjectCount) {

            totalProjectCount.textContent =
                projects.length;

        }


        if (runningProjectCount) {

            runningProjectCount.textContent =
                running;

        }


        if (completedProjectCount) {

            completedProjectCount.textContent =
                completed;

        }


        if (pendingProjectCount) {

            pendingProjectCount.textContent =
                pending;

        }

    }


    /* =====================================
    DISPLAY PROJECTS
    ===================================== */

    function displayProjects(list = projects) {

        if (!projectTableBody) return;


        projectTableBody.innerHTML = "";


        if (list.length === 0) {

            projectTableBody.innerHTML = `

                <tr>

                    <td colspan="6"
                        style="text-align:center;">

                        No Project Found

                    </td>

                </tr>

            `;

            updateSummary();

            return;

        }


        list.forEach(function (project) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${project.id}
                </td>

                <td>
                    ${project.name}
                </td>

                <td>
                    ${project.customer}
                </td>

                <td>
                    ${project.status}
                </td>

                <td>
                    ৳${project.amount}
                </td>

                <td>

                    <button
                        type="button"
                        class="select-project-btn"
                        data-id="${project.id}"
                    >
                        View
                    </button>

                </td>

            `;


            projectTableBody.appendChild(row);

        });


        updateSummary();

    }


    /* =====================================
    ADD NEW PROJECT
    ===================================== */

    if (projectForm) {

        projectForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const projectId =
                    document.getElementById(
                        "projectId"
                    ).value.trim();


                const projectName =
                    document.getElementById(
                        "projectName"
                    ).value.trim();


                const projectCustomer =
                    document.getElementById(
                        "projectCustomer"
                    ).value.trim();


                const projectAmount =
                    document.getElementById(
                        "projectAmount"
                    ).value;


                const projectStatus =
                    document.getElementById(
                        "projectStatus"
                    ).value;


                if (
                    !projectId ||
                    !projectName ||
                    !projectCustomer ||
                    !projectAmount ||
                    !projectStatus
                ) {

                    alert(
                        "Please complete all project fields."
                    );

                    return;

                }


                const alreadyExists =
                    projects.some(
                        project =>
                            project.id === projectId
                    );


                if (alreadyExists) {

                    alert(
                        "Project ID already exists."
                    );

                    return;

                }


                const newProject = {

                    id: projectId,

                    name: projectName,

                    customer: projectCustomer,

                    amount: Number(
                        projectAmount
                    ),

                    status: projectStatus,

                    description: "",

                    notes: "",

                    createdAt:
                        new Date().toLocaleString()

                };


                projects.push(newProject);


                saveProjects();

                displayProjects();


                projectForm.reset();


                alert(
                    "Project saved successfully."
                );

            }
        );

    }


    /* =====================================
    SELECT PROJECT
    ===================================== */

    if (projectTableBody) {

        projectTableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".select-project-btn"
                    );


                if (!button) return;


                selectedProjectId =
                    button.dataset.id;


                const project =
                    projects.find(
                        item =>
                            item.id ===
                            selectedProjectId
                    );


                if (!project) return;


                showProjectDetails(project);

            }
        );

    }


    /* =====================================
    SHOW PROJECT DETAILS
    ===================================== */

    function showProjectDetails(project) {

        const activeProjectName =
            document.getElementById(
                "activeProjectName"
            );

        const currentProjectStatus =
            document.getElementById(
                "currentProjectStatus"
            );

        const currentProjectCustomer =
            document.getElementById(
                "currentProjectCustomer"
            );

        const currentProjectAmount =
            document.getElementById(
                "currentProjectAmount"
            );


        if (activeProjectName) {

            activeProjectName.textContent =
                project.name;

        }


        if (currentProjectStatus) {

            currentProjectStatus.textContent =
                project.status;

        }


        if (currentProjectCustomer) {

            currentProjectCustomer.textContent =
                project.customer;

        }


        if (currentProjectAmount) {

            currentProjectAmount.textContent =
                "৳" + project.amount;

        }


        const description =
            document.getElementById(
                "projectDescription"
            );

        const notes =
            document.getElementById(
                "projectNotes"
            );


        if (description) {

            description.value =
                project.description || "";

        }


        if (notes) {

            notes.value =
                project.notes || "";

        }

    }


    /* =====================================
    SEARCH PROJECT
    ===================================== */

    function applyFilters() {

        let filtered =
            [...projects];


        const searchText =
            projectSearch
                ? projectSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const status =
            projectStatusFilter
                ? projectStatusFilter.value
                : "all";


        const sort =
            projectSort
                ? projectSort.value
                : "default";


        if (searchText) {

            filtered =
                filtered.filter(
                    project =>

                        project.id
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        project.name
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        project.customer
                            .toLowerCase()
                            .includes(searchText)
                );

        }


        if (status !== "all") {

            filtered =
                filtered.filter(
                    project =>
                        project.status === status
                );

        }


        if (sort === "name") {

            filtered.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

        }


        if (sort === "amount") {

            filtered.sort(
                (a, b) =>
                    Number(b.amount) -
                    Number(a.amount)
            );

        }


        if (sort === "status") {

            filtered.sort(
                (a, b) =>
                    a.status.localeCompare(
                        b.status
                    )
            );

        }


        displayProjects(filtered);

    }


    if (projectSearch) {

        projectSearch.addEventListener(
            "input",
            applyFilters
        );

    }


    if (projectStatusFilter) {

        projectStatusFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (projectSort) {

        projectSort.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================
    REFRESH PROJECTS
    ===================================== */

    const refreshProjectsBtn =
        document.getElementById(
            "refreshProjectsBtn"
        );


    if (refreshProjectsBtn) {

        refreshProjectsBtn.addEventListener(
            "click",
            function () {

                projects =
                    JSON.parse(
                        localStorage.getItem(
                            "lumenixProjects"
                        )
                    ) || [];


                displayProjects();

                alert(
                    "Project list refreshed."
                );

            }
        );

    }


    /* =====================================
    NAVIGATION BUTTONS
    ===================================== */

    function goToPage(page) {

        window.location.href = page;

    }


    const backDashboardBtn =
        document.getElementById(
            "backDashboardBtn"
        );


    const backDashboardBottomBtn =
        document.getElementById(
            "backDashboardBottomBtn"
        );


    if (backDashboardBtn) {

        backDashboardBtn.addEventListener(
            "click",
            function () {

                goToPage("dashboard.html");

            }
        );

    }


    if (backDashboardBottomBtn) {

        backDashboardBottomBtn.addEventListener(
            "click",
            function () {

                goToPage("dashboard.html");

            }
        );

    }


    /* =====================================
    PROJECT NAVIGATION
    ===================================== */

    const addProjectBtn =
        document.getElementById(
            "addProjectBtn"
        );


    const viewProjectsBtn =
        document.getElementById(
            "viewProjectsBtn"
        );


    const runningProjectsBtn =
        document.getElementById(
            "runningProjectsBtn"
        );


    const completedProjectsBtn =
        document.getElementById(
            "completedProjectsBtn"
        );


    const pendingProjectsBtn =
        document.getElementById(
            "pendingProjectsBtn"
        );


    if (addProjectBtn) {

        addProjectBtn.addEventListener(
            "click",
            function () {

                document
                    .querySelector(
                        ".add-project-section"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    if (viewProjectsBtn) {

        viewProjectsBtn.addEventListener(
            "click",
            function () {

                displayProjects();

                document
                    .querySelector(
                        ".project-list-section"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    if (runningProjectsBtn) {

        runningProjectsBtn.addEventListener(
            "click",
            function () {

                if (projectStatusFilter) {

                    projectStatusFilter.value =
                        "Running";

                    applyFilters();

                }

            }
        );

    }


    if (completedProjectsBtn) {

        completedProjectsBtn.addEventListener(
            "click",
            function () {

                if (projectStatusFilter) {

                    projectStatusFilter.value =
                        "Completed";

                    applyFilters();

                }

            }
        );

    }


    if (pendingProjectsBtn) {

        pendingProjectsBtn.addEventListener(
            "click",
            function () {

                if (projectStatusFilter) {

                    projectStatusFilter.value =
                        "Pending";

                    applyFilters();

                }

            }
        );

    }


    /* =====================================
    EDIT PROJECT
    ===================================== */

    const editProjectBtn =
        document.getElementById(
            "editProjectBtn"
        );


    if (editProjectBtn) {

        editProjectBtn.addEventListener(
            "click",
            function () {

                if (!selectedProjectId) {

                    alert(
                        "Please select a project first."
                    );

                    return;

                }


                const project =
                    projects.find(
                        item =>
                            item.id ===
                            selectedProjectId
                    );


                if (!project) return;


                const newName =
                    prompt(
                        "Enter Project Name:",
                        project.name
                    );


                if (
                    newName === null ||
                    !newName.trim()
                ) {

                    return;

                }


                project.name =
                    newName.trim();


                saveProjects();

                displayProjects();

                showProjectDetails(project);


                alert(
                    "Project updated successfully."
                );

            }
        );

    }


    /* =====================================
    DELETE PROJECT
    ===================================== */

    const deleteProjectBtn =
        document.getElementById(
            "deleteProjectBtn"
        );


    if (deleteProjectBtn) {

        deleteProjectBtn.addEventListener(
            "click",
            function () {

                if (!selectedProjectId) {

                    alert(
                        "Please select a project first."
                    );

                    return;

                }


                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete this project?"
                    );


                if (!confirmDelete) return;


                projects =
                    projects.filter(
                        project =>
                            project.id !==
                            selectedProjectId
                    );


                selectedProjectId = null;


                saveProjects();

                displayProjects();


                alert(
                    "Project deleted successfully."
                );

            }
        );

    }


    /* =====================================
    VIEW PROJECT DETAILS
    ===================================== */

    const viewProjectBtn =
        document.getElementById(
            "viewProjectBtn"
        );


    if (viewProjectBtn) {

        viewProjectBtn.addEventListener(
            "click",
            function () {

                if (!selectedProjectId) {

                    alert(
                        "Please select a project first."
                    );

                    return;

                }


                const project =
                    projects.find(
                        item =>
                            item.id ===
                            selectedProjectId
                    );


                if (!project) return;


                alert(

                    "Project ID: " +
                    project.id +

                    "\nProject Name: " +
                    project.name +

                    "\nCustomer: " +
                    project.customer +

                    "\nStatus: " +
                    project.status +

                    "\nAmount: ৳" +
                    project.amount

                );

            }
        );

    }


    /* =====================================
    PRINT PROJECT
    ===================================== */

    const printProjectBtn =
        document.getElementById(
            "printProjectBtn"
        );


    if (printProjectBtn) {

        printProjectBtn.addEventListener(
            "click",
            function () {

                if (!selectedProjectId) {

                    alert(
                        "Please select a project first."
                    );

                    return;

                }


                window.print();

            }
        );

    }


    /* =====================================
    RESET PROJECT DATA
    ===================================== */

    const resetProjectDataBtn =
        document.getElementById(
            "resetProjectDataBtn"
        );


    if (resetProjectDataBtn) {

        resetProjectDataBtn.addEventListener(
            "click",
            function () {

                const confirmReset =
                    confirm(
                        "This will delete all project data. Continue?"
                    );


                if (!confirmReset) return;


                projects = [];

                selectedProjectId = null;


                localStorage.removeItem(
                    "lumenixProjects"
                );


                displayProjects();


                if (projectForm) {

                    projectForm.reset();

                }


                alert(
                    "All project data has been reset."
                );

            }
        );

    }


    /* =====================================
    PROJECT DESCRIPTION & NOTES
    ===================================== */

    const projectDescription =
        document.getElementById(
            "projectDescription"
        );


    const projectNotes =
        document.getElementById(
            "projectNotes"
        );


    function saveProjectNotes() {

        if (!selectedProjectId) return;


        const project =
            projects.find(
                item =>
                    item.id ===
                    selectedProjectId
            );


        if (!project) return;


        if (projectDescription) {

            project.description =
                projectDescription.value;

        }


        if (projectNotes) {

            project.notes =
                projectNotes.value;

        }


        saveProjects();

    }


    if (projectDescription) {

        projectDescription.addEventListener(
            "input",
            saveProjectNotes
        );

    }


    if (projectNotes) {

        projectNotes.addEventListener(
            "input",
            saveProjectNotes
        );

    }


    /* =====================================
    INITIAL LOAD
    ===================================== */

    displayProjects();

    updateSummary();


    console.log(
        "LUMENIX Project Management Loaded Successfully"
    );

});


/* =====================================
PROJECT JS END
===================================== */
