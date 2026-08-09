"use strict";

/*
 * LUMINEX TECHNICAL TRAINING CENTRE
 * Student Registration Module
 *
 * Current version:
 * Front-end data management using localStorage.
 *
 * Future backend/API can replace the localStorage layer
 * without changing the main UI structure.
 */


const STORAGE_KEY = "luminex_training_students";

let students = [];


/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  loadStudents();

  setDefaultAdmissionDate();

  bindEvents();

  renderStudents();

  updateStatistics();

  updateNextStudentId();

});


/* =========================
   STORAGE
========================= */

function loadStudents() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    students = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(students)) {
      students = [];
    }

  } catch (error) {

    console.error("Unable to load student data:", error);

    students = [];

  }

}


function saveStudents() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students)
  );

}


/* =========================
   EVENTS
========================= */

function bindEvents() {

  const form = document.getElementById("studentForm");

  const resetBtn = document.getElementById("resetBtn");

  const searchInput =
    document.getElementById("searchStudent");

  const filterStatus =
    document.getElementById("filterStatus");

  const closeModal =
    document.getElementById("closeModal");

  const modal =
    document.getElementById("studentModal");


  form.addEventListener("submit", handleSubmit);


  resetBtn.addEventListener("click", () => {

    form.reset();

    setDefaultAdmissionDate();

  });


  searchInput.addEventListener("input", renderStudents);


  filterStatus.addEventListener("change", renderStudents);


  closeModal.addEventListener("click", closeStudentModal);


  modal.addEventListener("click", (event) => {

    if (event.target === modal) {
      closeStudentModal();
    }

  });

}


/* =========================
   FORM SUBMIT
========================= */

function handleSubmit(event) {

  event.preventDefault();


  const form = event.target;


  const studentName =
    getValue("studentName");

  const mobile =
    getValue("mobile");

  const course =
    getValue("course");


  if (!studentName || !mobile || !course) {

    showToast(
      "Please complete all required fields."
    );

    return;

  }


  const student = {

    id: generateStudentId(),

    studentName,

    fatherName:
      getValue("fatherName"),

    motherName:
      getValue("motherName"),

    mobile,

    alternativeMobile:
      getValue("alternativeMobile"),

    email:
      getValue("email"),

    dateOfBirth:
      getValue("dateOfBirth"),

    gender:
      getValue("gender"),

    division:
      getValue("division"),

    district:
      getValue("district"),

    area:
      getValue("area"),

    address:
      getValue("address"),

    course,

    batch:
      getValue("batch"),

    admissionDate:
      getValue("admissionDate"),

    education:
      getValue("education"),

    previousExperience:
      getValue("previousExperience"),

    status:
      getValue("studentStatus") || "Pending",

    emergencyName:
      getValue("emergencyName"),

    emergencyRelation:
      getValue("emergencyRelation"),

    emergencyMobile:
      getValue("emergencyMobile"),

    notes:
      getValue("notes"),

    createdAt:
      new Date().toISOString()

  };


  students.unshift(student);

  saveStudents();

  renderStudents();

  updateStatistics();

  updateNextStudentId();


  form.reset();

  setDefaultAdmissionDate();


  showToast(
    `Student ${student.id} registered successfully.`
  );

}


/* =========================
   ID GENERATOR
========================= */

function generateStudentId() {

  let highestNumber = 0;


  students.forEach(student => {

    const match =
      String(student.id || "").match(
        /LUM-ST-(\d+)/
      );

    if (match) {

      const number =
        parseInt(match[1], 10);

      if (number > highestNumber) {
        highestNumber = number;
      }

    }

  });


  const nextNumber =
    highestNumber + 1;


  return `LUM-ST-${String(nextNumber).padStart(5, "0")}`;

}


function updateNextStudentId() {

  document.getElementById("nextStudentId").textContent =
    generateStudentId();

}


/* =========================
   RENDER TABLE
========================= */

function renderStudents() {

  const tbody =
    document.getElementById("studentTableBody");

  const emptyState =
    document.getElementById("emptyState");

  const search =
    getValue("searchStudent").toLowerCase();

  const filter =
    getValue("filterStatus") || "All";


  const filteredStudents =
    students.filter(student => {

      const searchableText = [

        student.id,
        student.studentName,
        student.mobile,
        student.course,
        student.batch,
        student.district,
        student.area

      ]
        .join(" ")
        .toLowerCase();


      const matchesSearch =
        !search ||
        searchableText.includes(search);


      const matchesStatus =
        filter === "All" ||
        student.status === filter;


      return matchesSearch && matchesStatus;

    });


  tbody.innerHTML = "";


  if (filteredStudents.length === 0) {

    emptyState.style.display = "block";

    return;

  }


  emptyState.style.display = "none";


  filteredStudents.forEach(student => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>

        <strong>${escapeHTML(student.id)}</strong>

      </td>


      <td>

        <div class="student-name">

          ${escapeHTML(student.studentName)}

        </div>

        <div class="student-id">

          ${escapeHTML(student.gender || "Student")}

        </div>

      </td>


      <td>

        ${escapeHTML(student.mobile)}

      </td>


      <td>

        ${escapeHTML(student.course)}

      </td>


      <td>

        ${escapeHTML(student.batch || "-")}

      </td>


      <td>

        ${formatDate(student.admissionDate)}

      </td>


      <td>

        <span class="status ${getStatusClass(student.status)}">

          ${escapeHTML(student.status)}

        </span>

      </td>


      <td>

        <button

          class="action-btn"

          onclick="viewStudent('${student.id}')"

        >

          View

        </button>

      </td>

    `;


    tbody.appendChild(row);

  });

}


/* =========================
   STATISTICS
========================= */

function updateStatistics() {

  const total =
    students.length;


  const active =
    students.filter(
      student => student.status === "Active"
    ).length;


  const pending =
    students.filter(
      student => student.status === "Pending"
    ).length;


  const graduated =
    students.filter(
      student => student.status === "Graduated"
    ).length;


  document.getElementById("totalStudents").textContent =
    total;


  document.getElementById("activeStudents").textContent =
    active;


  document.getElementById("pendingStudents").textContent =
    pending;


  document.getElementById("graduatedStudents").textContent =
    graduated;

}


/* =========================
   VIEW STUDENT
========================= */

function viewStudent(studentId) {

  const student =
    students.find(
      item => item.id === studentId
    );


  if (!student) {

    showToast("Student record not found.");

    return;

  }


  document.getElementById("modalStudentName").textContent =
    student.studentName;


  const content =
    document.getElementById("modalContent");


  content.innerHTML = `

    ${profileItem("Student ID", student.id)}

    ${profileItem("Student Name", student.studentName)}

    ${profileItem("Father's Name", student.fatherName)}

    ${profileItem("Mother's Name", student.motherName)}

    ${profileItem("Mobile", student.mobile)}

    ${profileItem("Alternative Mobile", student.alternativeMobile)}

    ${profileItem("Email", student.email)}

    ${profileItem("Date of Birth", formatDate(student.dateOfBirth))}

    ${profileItem("Gender", student.gender)}

    ${profileItem("Division", student.division)}

    ${profileItem("District", student.district)}

    ${profileItem("Area", student.area)}

    ${profileItem("Address", student.address)}

    ${profileItem("Course", student.course)}

    ${profileItem("Batch", student.batch)}

    ${profileItem("Admission Date", formatDate(student.admissionDate))}

    ${profileItem("Education", student.education)}

    ${profileItem("Previous Experience", student.previousExperience)}

    ${profileItem("Status", student.status)}

    ${profileItem("Emergency Contact", student.emergencyName)}

    ${profileItem("Emergency Relation", student.emergencyRelation)}

    ${profileItem("Emergency Mobile", student.emergencyMobile)}

    ${profileItem("Notes", student.notes)}

  `;


  document
    .getElementById("studentModal")
    .classList.add("active");

}


function profileItem(label, value) {

  return `

    <div class="profile-item">

      <span>${escapeHTML(label)}</span>

      <strong>

        ${escapeHTML(value || "-")}

      </strong>

    </div>

  `;

}


function closeStudentModal() {

  document
    .getElementById("studentModal")
    .classList.remove("active");

}


/* =========================
   STATUS CLASS
========================= */

function getStatusClass(status) {

  const map = {

    Active: "status-active",

    Pending: "status-pending",

    Completed: "status-completed",

    Graduated: "status-graduated",

    Inactive: "status-inactive"

  };


  return map[status] || "status-pending";

}


/* =========================
   DATE
========================= */

function setDefaultAdmissionDate() {

  const input =
    document.getElementById("admissionDate");


  if (!input.value) {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(today.getMonth() + 1)
        .padStart(2, "0");


    const day =
      String(today.getDate())
        .padStart(2, "0");


    input.value =
      `${year}-${month}-${day}`;

  }

}


function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }


  const date =
    new Date(`${dateString}T00:00:00`);


  if (Number.isNaN(date.getTime())) {
    return dateString;
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
   HELPERS
========================= */

function getValue(id) {

  const element =
    document.getElementById(id);


  return element
    ? element.value.trim()
    : "";

}


function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function showToast(message) {

  const toast =
    document.getElementById("toast");


  toast.textContent =
    message;


  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* =========================
   GLOBAL VIEW FUNCTION
========================= */

window.viewStudent = viewStudent;
