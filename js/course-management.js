"use strict";

/*
 * LUMINEX TECHNICAL TRAINING CENTRE
 * Course Management
 *
 * Local storage:
 * luminex_training_courses
 *
 * This module is designed as the
 * Course Master for future:
 *
 * Student Registration
 * Student Profile
 * Batch Management
 * Attendance
 * Assessment
 * Certificate
 */

const STORAGE_KEY =
  "luminex_training_courses";


let courses = [];

let editingCourseId = null;


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadCourses();

    bindEvents();

    renderCategories();

    renderCourses();

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
        STORAGE_KEY
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
   SAVE COURSES
========================= */

function saveCourses() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(courses)
  );

}


/* =========================
   EVENTS
========================= */

function bindEvents() {

  document
    .getElementById("addCourseBtn")
    .addEventListener(
      "click",
      () => openCourseModal()
    );


  document
    .getElementById("emptyAddBtn")
    .addEventListener(
      "click",
      () => openCourseModal()
    );


  document
    .getElementById("closeModalBtn")
    .addEventListener(
      "click",
      closeCourseModal
    );


  document
    .getElementById("cancelBtn")
    .addEventListener(
      "click",
      closeCourseModal
    );


  document
    .getElementById("courseForm")
    .addEventListener(
      "submit",
      saveCourse
    );


  document
    .getElementById("courseSearch")
    .addEventListener(
      "input",
      renderCourses
    );


  document
    .getElementById("categoryFilter")
    .addEventListener(
      "change",
      renderCourses
    );


  document
    .getElementById("statusFilter")
    .addEventListener(
      "change",
      renderCourses
    );


  document
    .getElementById("resetFilterBtn")
    .addEventListener(
      "click",
      resetFilters
    );


  document
    .getElementById("courseModal")
    .addEventListener(
      "click",
      event => {

        if (
          event.target.id ===
          "courseModal"
        ) {

          closeCourseModal();

        }

      }
    );

}


/* =========================
   MODAL
========================= */

function openCourseModal(course = null) {

  const modal =
    document.getElementById(
      "courseModal"
    );

  const form =
    document.getElementById(
      "courseForm"
    );


  form.reset();


  if (course) {

    editingCourseId =
      course.id;


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Edit Course";


    document.getElementById(
      "courseEditId"
    ).value =
      course.id;


    document.getElementById(
      "courseName"
    ).value =
      course.name || "";


    document.getElementById(
      "courseCategory"
    ).value =
      course.category || "";


    document.getElementById(
      "courseDuration"
    ).value =
      course.duration || "";


    document.getElementById(
      "courseFee"
    ).value =
      course.fee ?? "";


    document.getElementById(
      "courseDescription"
    ).value =
      course.description || "";


    document.getElementById(
      "courseStatus"
    ).value =
      course.status || "Active";

  } else {

    editingCourseId = null;


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Add New Course";


    document.getElementById(
      "courseStatus"
    ).value =
      "Active";

  }


  modal.classList.remove(
    "hidden"
  );


  setTimeout(() => {

    document
      .getElementById("courseName")
      .focus();

  }, 100);

}


/* =========================
   CLOSE MODAL
========================= */

function closeCourseModal() {

  document
    .getElementById("courseModal")
    .classList.add("hidden");


  editingCourseId = null;

}


/* =========================
   SAVE COURSE
========================= */

function saveCourse(event) {

  event.preventDefault();


  const name =
    document
      .getElementById("courseName")
      .value
      .trim();


  const category =
    document
      .getElementById("courseCategory")
      .value
      .trim();


  const duration =
    document
      .getElementById("courseDuration")
      .value
      .trim();


  const fee =
    Number(
      document
        .getElementById("courseFee")
        .value
    );


  const description =
    document
      .getElementById("courseDescription")
      .value
      .trim();


  const status =
    document
      .getElementById("courseStatus")
      .value;


  if (!name || !category || !duration) {

    showToast(
      "Please fill all required fields."
    );

    return;

  }


  if (
    Number.isNaN(fee) ||
    fee < 0
  ) {

    showToast(
      "Please enter a valid course fee."
    );

    return;

  }


  /* EDIT */

  if (editingCourseId) {

    const index =
      courses.findIndex(
        course =>
          course.id ===
          editingCourseId
      );


    if (index !== -1) {

      courses[index] = {
        ...courses[index],

        name,

        category,

        duration,

        fee,

        description,

        status,

        updatedAt:
          new Date().toISOString()

      };

    }


    showToast(
      "Course updated successfully."
    );

  }


  /* CREATE */

  else {

    const newCourse = {

      id:
        generateCourseId(),

      name,

      category,

      duration,

      fee,

      description,

      status,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    };


    courses.unshift(
      newCourse
    );


    showToast(
      "Course added successfully."
    );

  }


  saveCourses();

  renderCategories();

  renderCourses();

  updateSummary();

  closeCourseModal();

}


/* =========================
   GENERATE COURSE ID
========================= */

function generateCourseId() {

  let number =
    courses.length + 1;


  let id =
    "LUM-CRS-" +
    String(number).padStart(
      5,
      "0"
    );


  while (
    courses.some(
      course =>
        course.id === id
    )
  ) {

    number++;

    id =
      "LUM-CRS-" +
      String(number).padStart(
        5,
        "0"
      );

  }


  return id;

}


/* =========================
   RENDER COURSES
========================= */

function renderCourses() {

  const tbody =
    document.getElementById(
      "courseTableBody"
    );


  const emptyState =
    document.getElementById(
      "emptyState"
    );


  const search =
    document
      .getElementById("courseSearch")
      .value
      .trim()
      .toLowerCase();


  const category =
    document.getElementById(
      "categoryFilter"
    ).value;


  const status =
    document.getElementById(
      "statusFilter"
    ).value;


  const filtered =
    courses.filter(
      course => {

        const searchable = [

          course.id,

          course.name,

          course.category,

          course.duration

        ]
          .join(" ")
          .toLowerCase();


        const matchesSearch =
          !search ||
          searchable.includes(
            search
          );


        const matchesCategory =
          !category ||
          course.category ===
          category;


        const matchesStatus =
          !status ||
          course.status ===
          status;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );

      }
    );


  tbody.innerHTML = "";


  document.getElementById(
    "recordCount"
  ).textContent =
    `${filtered.length} Course${filtered.length !== 1 ? "s" : ""}`;


  if (filtered.length === 0) {

    emptyState.classList.remove(
      "hidden"
    );

    return;

  }


  emptyState.classList.add(
    "hidden"
  );


  filtered.forEach(
    course => {

      const row =
        document.createElement(
          "tr"
        );


      row.innerHTML = `

        <td>
          <span class="course-id">
            ${escapeHtml(course.id)}
          </span>
        </td>

        <td>
          <strong>
            ${escapeHtml(course.name)}
          </strong>
        </td>

        <td>
          ${escapeHtml(course.category)}
        </td>

        <td>
          ${escapeHtml(course.duration)}
        </td>

        <td>
          ৳${formatNumber(course.fee)}
        </td>

        <td>
          <span class="
            status-badge
            ${
              course.status === "Active"
                ? "status-active"
                : "status-inactive"
            }
          ">
            ${escapeHtml(course.status)}
          </span>
        </td>

        <td>
          ${formatDate(course.createdAt)}
        </td>

        <td>

          <div class="action-group">

            <button
              type="button"
              class="action-btn"
              data-action="edit"
              data-id="${escapeHtml(course.id)}"
            >
              Edit
            </button>

            <button
              type="button"
              class="action-btn"
              data-action="toggle"
              data-id="${escapeHtml(course.id)}"
            >
              ${
                course.status === "Active"
                  ? "Deactivate"
                  : "Activate"
              }
            </button>

            <button
              type="button"
              class="action-btn delete"
              data-action="delete"
              data-id="${escapeHtml(course.id)}"
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
   ROW ACTIONS
========================= */

function attachRowActions() {

  document
    .querySelectorAll(
      "[data-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          const action =
            button.dataset.action;


          const course =
            courses.find(
              item =>
                item.id === id
            );


          if (!course) {
            return;
          }


          if (action === "edit") {

            openCourseModal(
              course
            );

          }


          if (action === "toggle") {

            toggleCourse(
              id
            );

          }


          if (action === "delete") {

            deleteCourse(
              id
            );

          }

        }
      );

    });

}


/* =========================
   TOGGLE STATUS
========================= */

function toggleCourse(id) {

  const course =
    courses.find(
      item =>
        item.id === id
    );


  if (!course) {
    return;
  }


  course.status =
    course.status === "Active"
      ? "Inactive"
      : "Active";


  course.updatedAt =
    new Date().toISOString();


  saveCourses();

  renderCourses();

  updateSummary();


  showToast(
    `Course ${course.status === "Active" ? "activated" : "deactivated"}.`
  );

}


/* =========================
   DELETE
========================= */

function deleteCourse(id) {

  const course =
    courses.find(
      item =>
        item.id === id
    );


  if (!course) {
    return;
  }


  const confirmed =
    window.confirm(
      `Delete "${course.name}"?`
    );


  if (!confirmed) {
    return;
  }


  courses =
    courses.filter(
      item =>
        item.id !== id
    );


  saveCourses();

  renderCategories();

  renderCourses();

  updateSummary();


  showToast(
    "Course deleted successfully."
  );

}


/* =========================
   CATEGORIES
========================= */

function renderCategories() {

  const select =
    document.getElementById(
      "categoryFilter"
    );


  const currentValue =
    select.value;


  const categories =
    [
      ...new Set(
        courses
          .map(
            course =>
              course.category
          )
          .filter(Boolean)
      )
    ]
      .sort(
        (a, b) =>
          a.localeCompare(b)
      );


  select.innerHTML =
    `<option value="">All Categories</option>`;


  categories.forEach(
    category => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        category;


      option.textContent =
        category;


      select.appendChild(
        option
      );

    }
  );


  if (
    categories.includes(
      currentValue
    )
  ) {

    select.value =
      currentValue;

  }

}


/* =========================
   SUMMARY
========================= */

function updateSummary() {

  const total =
    courses.length;


  const active =
    courses.filter(
      course =>
        course.status ===
        "Active"
    ).length;


  const inactive =
    courses.filter(
      course =>
        course.status ===
        "Inactive"
    ).length;


  const categories =
    new Set(
      courses
        .map(
          course =>
            course.category
        )
        .filter(Boolean)
    );


  document.getElementById(
    "totalCourses"
  ).textContent =
    total;


  document.getElementById(
    "activeCourses"
  ).textContent =
    active;


  document.getElementById(
    "inactiveCourses"
  ).textContent =
    inactive;


  document.getElementById(
    "totalCategories"
  ).textContent =
    categories.size;

}


/* =========================
   RESET FILTER
========================= */

function resetFilters() {

  document.getElementById(
    "courseSearch"
  ).value = "";


  document.getElementById(
    "categoryFilter"
  ).value = "";


  document.getElementById(
    "statusFilter"
  ).value = "";


  renderCourses();

}


/* =========================
   DATE
========================= */

function formatDate(value) {

  if (!value) {
    return "-";
  }


  const date =
    new Date(value);


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
   NUMBER
========================= */

function formatNumber(value) {

  return Number(
    value || 0
  ).toLocaleString(
    "en-BD",
    {
      maximumFractionDigits: 2
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

function showToast(message) {

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
