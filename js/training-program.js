"use strict";

/*
 * LUMINEX TECHNICAL TRAINING CENTRE
 * Training Program Management
 *
 * Storage:
 * luminex_training_programs
 *
 * Reads Course Master from:
 * luminex_training_courses
 *
 * Future integration:
 * Student Enrollment
 * Attendance
 * Assessment
 * Certificate
 */

const PROGRAM_STORAGE_KEY =
  "luminex_training_programs";

const COURSE_STORAGE_KEY =
  "luminex_training_courses";


let programs = [];

let courses = [];

let editingProgramId = null;


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadCourses();

    loadPrograms();

    bindEvents();

    renderCourseOptions();

    renderPrograms();

    renderMonthOptions();

    updateSummary();

  }
);


/* =========================
   LOAD COURSES
========================= */

function loadCourses() {

  try {

    const saved =
      localStorage.getItem(
        COURSE_STORAGE_KEY
      );

    courses =
      saved
        ? JSON.parse(saved)
        : [];

    if (!Array.isArray(courses)) {
      courses = [];
    }

  } catch (error) {

    console.error(
      "Course loading error:",
      error
    );

    courses = [];

  }

}


/* =========================
   LOAD PROGRAMS
========================= */

function loadPrograms() {

  try {

    const saved =
      localStorage.getItem(
        PROGRAM_STORAGE_KEY
      );

    programs =
      saved
        ? JSON.parse(saved)
        : [];

    if (!Array.isArray(programs)) {
      programs = [];
    }

  } catch (error) {

    console.error(
      "Program loading error:",
      error
    );

    programs = [];

  }

}


/* =========================
   SAVE PROGRAMS
========================= */

function savePrograms() {

  localStorage.setItem(
    PROGRAM_STORAGE_KEY,
    JSON.stringify(programs)
  );

}


/* =========================
   EVENTS
========================= */

function bindEvents() {

  document
    .getElementById("addProgramBtn")
    .addEventListener(
      "click",
      () => openProgramModal()
    );


  document
    .getElementById("emptyAddBtn")
    .addEventListener(
      "click",
      () => openProgramModal()
    );


  document
    .getElementById("closeModalBtn")
    .addEventListener(
      "click",
      closeProgramModal
    );


  document
    .getElementById("cancelBtn")
    .addEventListener(
      "click",
      closeProgramModal
    );


  document
    .getElementById("programForm")
    .addEventListener(
      "submit",
      saveProgram
    );


  document
    .getElementById("programSearch")
    .addEventListener(
      "input",
      renderPrograms
    );


  document
    .getElementById("programStatusFilter")
    .addEventListener(
      "change",
      renderPrograms
    );


  document
    .getElementById("programMonthFilter")
    .addEventListener(
      "change",
      renderPrograms
    );


  document
    .getElementById("resetFilterBtn")
    .addEventListener(
      "click",
      resetFilters
    );


  document
    .getElementById("programModal")
    .addEventListener(
      "click",
      event => {

        if (
          event.target.id ===
          "programModal"
        ) {

          closeProgramModal();

        }

      }
    );


  document
    .getElementById("startDate")
    .addEventListener(
      "change",
      validateDateRange
    );


  document
    .getElementById("endDate")
    .addEventListener(
      "change",
      validateDateRange
    );

}


/* =========================
   COURSE OPTIONS
========================= */

function renderCourseOptions() {

  const select =
    document.getElementById(
      "programCourse"
    );


  select.innerHTML =
    `
      <option value="">
        Select Course
      </option>
    `;


  courses
    .filter(
      course =>
        course.status ===
        "Active"
    )
    .forEach(
      course => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          course.id;


        option.textContent =
          `${course.id} — ${course.name}`;


        select.appendChild(
          option
        );

      }
    );

}


/* =========================
   OPEN MODAL
========================= */

function openProgramModal(
  program = null
) {

  const modal =
    document.getElementById(
      "programModal"
    );


  const form =
    document.getElementById(
      "programForm"
    );


  form.reset();


  renderCourseOptions();


  if (program) {

    editingProgramId =
      program.id;


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Edit Training Program";


    document.getElementById(
      "programEditId"
    ).value =
      program.id;


    document.getElementById(
      "programName"
    ).value =
      program.name || "";


    document.getElementById(
      "programCourse"
    ).value =
      program.courseId || "";


    document.getElementById(
      "startDate"
    ).value =
      program.startDate || "";


    document.getElementById(
      "endDate"
    ).value =
      program.endDate || "";


    document.getElementById(
      "trainerName"
    ).value =
      program.trainer || "";


    document.getElementById(
      "trainingLocation"
    ).value =
      program.location || "";


    document.getElementById(
      "seatCapacity"
    ).value =
      program.seatCapacity ?? "";


    document.getElementById(
      "programStatus"
    ).value =
      program.status ||
      "Upcoming";


    document.getElementById(
      "programSchedule"
    ).value =
      program.schedule || "";


    document.getElementById(
      "programDescription"
    ).value =
      program.description || "";

  } else {

    editingProgramId = null;


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Add Training Program";


    document.getElementById(
      "programStatus"
    ).value =
      "Upcoming";

  }


  modal.classList.remove(
    "hidden"
  );


  setTimeout(
    () => {

      document
        .getElementById(
          "programName"
        )
        .focus();

    },
    100
  );

}


/* =========================
   CLOSE MODAL
========================= */

function closeProgramModal() {

  document
    .getElementById(
      "programModal"
    )
    .classList.add(
      "hidden"
    );


  editingProgramId = null;

}


/* =========================
   DATE VALIDATION
========================= */

function validateDateRange() {

  const start =
    document.getElementById(
      "startDate"
    ).value;


  const end =
    document.getElementById(
      "endDate"
    ).value;


  if (
    start &&
    end &&
    end < start
  ) {

    document.getElementById(
      "endDate"
    ).setCustomValidity(
      "End date cannot be before start date."
    );

  } else {

    document.getElementById(
      "endDate"
    ).setCustomValidity("");

  }

}


/* =========================
   SAVE PROGRAM
========================= */

function saveProgram(event) {

  event.preventDefault();


  validateDateRange();


  if (
    !document
      .getElementById("programForm")
      .checkValidity()
  ) {

    document
      .getElementById("programForm")
      .reportValidity();

    return;

  }


  const name =
    document
      .getElementById("programName")
      .value
      .trim();


  const courseId =
    document
      .getElementById("programCourse")
      .value;


  const startDate =
    document
      .getElementById("startDate")
      .value;


  const endDate =
    document
      .getElementById("endDate")
      .value;


  const trainer =
    document
      .getElementById("trainerName")
      .value
      .trim();


  const location =
    document
      .getElementById("trainingLocation")
      .value
      .trim();


  const seatCapacity =
    Number(
      document
        .getElementById("seatCapacity")
        .value
    );


  const status =
    document
      .getElementById("programStatus")
      .value;


  const schedule =
    document
      .getElementById("programSchedule")
      .value
      .trim();


  const description =
    document
      .getElementById("programDescription")
      .value
      .trim();


  const selectedCourse =
    courses.find(
      course =>
        course.id ===
        courseId
    );


  if (!selectedCourse) {

    showToast(
      "Please select a valid course."
    );

    return;

  }


  if (
    !Number.isInteger(
      seatCapacity
    ) ||
    seatCapacity < 1
  ) {

    showToast(
      "Enter a valid seat capacity."
    );

    return;

  }


  /* EDIT */

  if (editingProgramId) {

    const index =
      programs.findIndex(
        program =>
          program.id ===
          editingProgramId
      );


    if (index !== -1) {

      programs[index] = {

        ...programs[index],

        name,

        courseId,

        courseName:
          selectedCourse.name,

        startDate,

        endDate,

        trainer,

        location,

        seatCapacity,

        schedule,

        description,

        status,

        updatedAt:
          new Date().toISOString()

      };

    }


    showToast(
      "Training program updated successfully."
    );

  }


  /* CREATE */

  else {

    const newProgram = {

      id:
        generateProgramId(),

      name,

      courseId,

      courseName:
        selectedCourse.name,

      startDate,

      endDate,

      trainer,

      location,

      seatCapacity,

      enrolledStudents: 0,

      schedule,

      description,

      status,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    };


    programs.unshift(
      newProgram
    );


    showToast(
      "Training program created successfully."
    );

  }


  savePrograms();

  renderPrograms();

  renderMonthOptions();

  updateSummary();

  closeProgramModal();

}


/* =========================
   GENERATE PROGRAM ID
========================= */

function generateProgramId() {

  let number =
    programs.length + 1;


  let id =
    "LUM-TP-" +
    String(number).padStart(
      5,
      "0"
    );


  while (
    programs.some(
      program =>
        program.id === id
    )
  ) {

    number++;


    id =
      "LUM-TP-" +
      String(number).padStart(
        5,
        "0"
      );

  }


  return id;

}


/* =========================
   RENDER PROGRAMS
========================= */

function renderPrograms() {

  const tbody =
    document.getElementById(
      "programTableBody"
    );


  const emptyState =
    document.getElementById(
      "emptyState"
    );


  const search =
    document
      .getElementById(
        "programSearch"
      )
      .value
      .trim()
      .toLowerCase();


  const status =
    document.getElementById(
      "programStatusFilter"
    ).value;


  const month =
    document.getElementById(
      "programMonthFilter"
    ).value;


  const filtered =
    programs.filter(
      program => {

        const searchable = [

          program.id,

          program.name,

          program.courseName,

          program.trainer,

          program.location

        ]
          .join(" ")
          .toLowerCase();


        const matchesSearch =
          !search ||
          searchable.includes(
            search
          );


        const matchesStatus =
          !status ||
          program.status ===
          status;


        const matchesMonth =
          !month ||
          getMonthKey(
            program.startDate
          ) === month;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesMonth
        );

      }
    );


  tbody.innerHTML = "";


  document.getElementById(
    "recordCount"
  ).textContent =
    `${filtered.length} Program${filtered.length !== 1 ? "s" : ""}`;


  if (
    filtered.length === 0
  ) {

    emptyState.classList.remove(
      "hidden"
    );

    return;

  }


  emptyState.classList.add(
    "hidden"
  );


  filtered.forEach(
    program => {

      const enrolled =
        Number(
          program.enrolledStudents ||
          0
        );


      const row =
        document.createElement(
          "tr"
        );


      row.innerHTML = `

        <td>
          <span class="program-id">
            ${escapeHtml(program.id)}
          </span>
        </td>

        <td>
          <strong>
            ${escapeHtml(program.name)}
          </strong>
        </td>

        <td>
          ${escapeHtml(program.courseName || "-")}
        </td>

        <td>
          <strong>
            ${formatDate(program.startDate)}
          </strong>
          <br>
          <small>
            to ${formatDate(program.endDate)}
          </small>
        </td>

        <td>
          ${escapeHtml(program.trainer || "-")}
        </td>

        <td>
          <span class="seat-info">
            ${enrolled} / ${program.seatCapacity}
          </span>
        </td>

        <td>
          <span class="
            status-badge
            ${getStatusClass(program.status)}
          ">
            ${escapeHtml(program.status)}
          </span>
        </td>

        <td>

          <div class="action-group">

            <button
              type="button"
              class="action-btn"
              data-action="edit"
              data-id="${escapeHtml(program.id)}"
            >
              Edit
            </button>

            <button
              type="button"
              class="action-btn"
              data-action="toggle"
              data-id="${escapeHtml(program.id)}"
            >
              ${
                program.status === "Inactive"
                  ? "Activate"
                  : "Deactivate"
              }
            </button>

            <button
              type="button"
              class="action-btn delete"
              data-action="delete"
              data-id="${escapeHtml(program.id)}"
            >
              Delete
            </button>

          </div>

        </td>

      `;


      tbody.appendChild(
        row
      );

    }
  );


  attachRowActions();

}


/* =========================
   STATUS CLASS
========================= */

function getStatusClass(
  status
) {

  const classes = {

    Upcoming:
      "status-upcoming",

    Running:
      "status-running",

    Completed:
      "status-completed",

    Cancelled:
      "status-cancelled",

    Inactive:
      "status-inactive"

  };


  return (
    classes[status] ||
    "status-inactive"
  );

}


/* =========================
   ROW ACTIONS
========================= */

function attachRowActions() {

  document
    .querySelectorAll(
      "[data-action]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset.id;


            const action =
              button.dataset.action;


            const program =
              programs.find(
                item =>
                  item.id === id
              );


            if (!program) {
              return;
            }


            if (
              action === "edit"
            ) {

              openProgramModal(
                program
              );

            }


            if (
              action === "toggle"
            ) {

              toggleProgram(
                id
              );

            }


            if (
              action === "delete"
            ) {

              deleteProgram(
                id
              );

            }

          }
        );

      }
    );

}


/* =========================
   TOGGLE
========================= */

function toggleProgram(id) {

  const program =
    programs.find(
      item =>
        item.id === id
    );


  if (!program) {
    return;
  }


  if (
    program.status ===
    "Inactive"
  ) {

    program.status =
      "Upcoming";

  } else {

    program.status =
      "Inactive";

  }


  program.updatedAt =
    new Date().toISOString();


  savePrograms();

  renderPrograms();

  updateSummary();


  showToast(
    `Program ${program.status === "Inactive" ? "deactivated" : "activated"}.`
  );

}


/* =========================
   DELETE
========================= */

function deleteProgram(id) {

  const program =
    programs.find(
      item =>
        item.id === id
    );


  if (!program) {
    return;
  }


  const confirmed =
    window.confirm(
      `Delete "${program.name}"?`
    );


  if (!confirmed) {
    return;
  }


  programs =
    programs.filter(
      item =>
        item.id !== id
    );


  savePrograms();

  renderPrograms();

  renderMonthOptions();

  updateSummary();


  showToast(
    "Training program deleted successfully."
  );

}


/* =========================
   MONTH FILTER
========================= */

function renderMonthOptions() {

  const select =
    document.getElementById(
      "programMonthFilter"
    );


  const current =
    select.value;


  const months =
    [
      ...new Set(
        programs
          .map(
            program =>
              getMonthKey(
                program.startDate
              )
          )
          .filter(Boolean)
      )
    ]
      .sort();


  select.innerHTML =
    `<option value="">All Months</option>`;


  months.forEach(
    month => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        month;


      option.textContent =
        formatMonth(
          month
        );


      select.appendChild(
        option
      );

    }
  );


  if (
    months.includes(
      current
    )
  ) {

    select.value =
      current;

  }

}


/* =========================
   SUMMARY
========================= */

function updateSummary() {

  const total =
    programs.length;


  const active =
    programs.filter(
      program =>
        program.status ===
        "Upcoming" ||
        program.status ===
        "Running"
    ).length;


  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const upcoming =
    programs.filter(
      program => {

        if (
          !program.startDate
        ) {
          return false;
        }


        const date =
          new Date(
            program.startDate +
            "T00:00:00"
          );


        return (
          date >= today &&
          program.status ===
          "Upcoming"
        );

      }
    ).length;


  const seats =
    programs.reduce(
      (
        totalSeats,
        program
      ) => {

        return (
          totalSeats +
          Number(
            program.seatCapacity ||
            0
          )
        );

      },
      0
    );


  document.getElementById(
    "totalPrograms"
  ).textContent =
    total;


  document.getElementById(
    "activePrograms"
  ).textContent =
    active;


  document.getElementById(
    "upcomingPrograms"
  ).textContent =
    upcoming;


  document.getElementById(
    "totalSeats"
  ).textContent =
    seats;

}


/* =========================
   RESET
========================= */

function resetFilters() {

  document.getElementById(
    "programSearch"
  ).value = "";


  document.getElementById(
    "programStatusFilter"
  ).value = "";


  document.getElementById(
    "programMonthFilter"
  ).value = "";


  renderPrograms();

}


/* =========================
   DATE FORMAT
========================= */

function formatDate(value) {

  if (!value) {
    return "-";
  }


  const date =
    new Date(
      value + "T00:00:00"
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "-";

  }


  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

}


/* =========================
   MONTH KEY
========================= */

function getMonthKey(
  value
) {

  if (!value) {
    return "";
  }


  return value.slice(
    0,
    7
  );

}


/* =========================
   MONTH DISPLAY
========================= */

function formatMonth(
  value
) {

  if (!value) {
    return "";
  }


  const date =
    new Date(
      `${value}-01T00:00:00`
    );


  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric"
    }
  );

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHtml(value) {

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


/* =========================
   TOAST
========================= */

function showToast(
  message
) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  setTimeout(
    () => {

      toast.classList.remove(
        "show"
      );

    },
    2800
  );

}
