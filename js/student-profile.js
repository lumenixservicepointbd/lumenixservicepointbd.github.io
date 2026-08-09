"use strict";

/*
 * LUMINEX TECHNICAL TRAINING CENTRE
 * Student Profile Module
 *
 * Reads student records created by:
 * student-registration.js
 *
 * Storage:
 * luminex_training_students
 */

const STORAGE_KEY = "luminex_training_students";

let students = [];
let currentStudent = null;


document.addEventListener("DOMContentLoaded", () => {

  loadStudents();

  bindEvents();

  loadStudentFromUrl();

});


/* =========================
   LOAD DATA
========================= */

function loadStudents() {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    students =
      saved ? JSON.parse(saved) : [];

    if (!Array.isArray(students)) {
      students = [];
    }

  } catch (error) {

    console.error(
      "Unable to load student records:",
      error
    );

    students = [];

  }

}


/* =========================
   EVENTS
========================= */

function bindEvents() {

  const searchBtn =
    document.getElementById("searchBtn");

  const searchInput =
    document.getElementById("studentSearch");

  const clearBtn =
    document.getElementById("clearProfileBtn");

  const printBtn =
    document.getElementById("printProfileBtn");


  searchBtn.addEventListener(
    "click",
    searchStudent
  );


  searchInput.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        searchStudent();
      }

    }
  );


  clearBtn.addEventListener(
    "click",
    clearProfile
  );


  printBtn.addEventListener(
    "click",
    printProfile
  );

}


/* =========================
   URL STUDENT
========================= */

function loadStudentFromUrl() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const studentId =
    params.get("id");


  if (!studentId) {
    return;
  }


  const student =
    students.find(
      item =>
        String(item.id).toLowerCase() ===
        String(studentId).toLowerCase()
    );


  if (student) {

    showProfile(student);

    document.getElementById(
      "studentSearch"
    ).value = student.id;

  }

}


/* =========================
   SEARCH
========================= */

function searchStudent() {

  const query =
    document
      .getElementById("studentSearch")
      .value
      .trim()
      .toLowerCase();


  if (!query) {

    showToast(
      "Enter Student ID, name or mobile number."
    );

    return;

  }


  const student =
    students.find(item => {

      const id =
        String(item.id || "")
          .toLowerCase();

      const name =
        String(item.studentName || "")
          .toLowerCase();

      const mobile =
        String(item.mobile || "")
          .toLowerCase();

      return (
        id.includes(query) ||
        name.includes(query) ||
        mobile.includes(query)
      );

    });


  if (!student) {

    clearDisplayedProfile();

    showToast(
      "No matching student found."
    );

    return;

  }


  showProfile(student);

}


/* =========================
   SHOW PROFILE
========================= */

function showProfile(student) {

  currentStudent = student;


  document
    .getElementById("profileEmpty")
    .classList.add("hidden");


  document
    .getElementById("profileContainer")
    .classList.remove("hidden");


  setText(
    "studentAvatar",
    getInitial(student.studentName)
  );


  setText(
    "profileName",
    student.studentName
  );


  setText(
    "profileId",
    student.id
  );


  setText(
    "profileCourse",
    student.course || "-"
  );


  setText(
    "profileBatch",
    student.batch || "-"
  );


  setText(
    "profileStatus",
    student.status || "-"
  );


  setText(
    "summaryCourse",
    student.course || "-"
  );


  setText(
    "summaryBatch",
    student.batch || "-"
  );


  setText(
    "summaryAdmission",
    formatDate(student.admissionDate)
  );


  setText(
    "summaryStatus",
    student.status || "-"
  );


  /* Personal */

  setText(
    "infoName",
    student.studentName
  );

  setText(
    "infoFather",
    student.fatherName
  );

  setText(
    "infoMother",
    student.motherName
  );

  setText(
    "infoMobile",
    student.mobile
  );

  setText(
    "infoAlternative",
    student.alternativeMobile
  );

  setText(
    "infoEmail",
    student.email
  );

  setText(
    "infoDob",
    formatDate(student.dateOfBirth)
  );

  setText(
    "infoGender",
    student.gender
  );


  /* Address */

  setText(
    "infoDivision",
    student.division
  );

  setText(
    "infoDistrict",
    student.district
  );

  setText(
    "infoArea",
    student.area
  );

  setText(
    "infoAddress",
    student.address
  );


  /* Training */

  setText(
    "infoCourse",
    student.course
  );

  setText(
    "infoBatch",
    student.batch
  );

  setText(
    "infoAdmission",
    formatDate(student.admissionDate)
  );

  setText(
    "infoEducation",
    student.education
  );

  setText(
    "infoExperience",
    student.previousExperience
  );

  setText(
    "infoTrainingStatus",
    student.status
  );


  /* Emergency */

  setText(
    "infoEmergencyName",
    student.emergencyName
  );

  setText(
    "infoEmergencyRelation",
    student.emergencyRelation
  );

  setText(
    "infoEmergencyMobile",
    student.emergencyMobile
  );


  /* Notes */

  setText(
    "infoNotes",
    student.notes ||
    "No additional notes."
  );


  /*
   * Future modules will replace these
   * placeholders with real data.
   */

  setText(
    "attendanceStatus",
    "Not Available"
  );

  setText(
    "assessmentStatus",
    "Not Available"
  );

  setText(
    "certificateStatus",
    "Not Available"
  );


  updateUrl(student.id);

}


/* =========================
   CLEAR
========================= */

function clearProfile() {

  currentStudent = null;

  clearDisplayedProfile();

  document.getElementById(
    "studentSearch"
  ).value = "";

  removeUrlParameter();

}


function clearDisplayedProfile() {

  document
    .getElementById("profileContainer")
    .classList.add("hidden");


  document
    .getElementById("profileEmpty")
    .classList.remove("hidden");

}


/* =========================
   URL UPDATE
========================= */

function updateUrl(studentId) {

  const url =
    new URL(
      window.location.href
    );


  url.searchParams.set(
    "id",
    studentId
  );


  window.history.replaceState(
    {},
    "",
    url
  );

}


function removeUrlParameter() {

  const url =
    new URL(
      window.location.href
    );


  url.searchParams.delete("id");


  window.history.replaceState(
    {},
    "",
    url
  );

}


/* =========================
   PRINT
========================= */

function printProfile() {

  if (!currentStudent) {

    showToast(
      "Please select a student first."
    );

    return;

  }


  window.print();

}


/* =========================
   HELPERS
========================= */

function setText(
  elementId,
  value
) {

  const element =
    document.getElementById(
      elementId
    );


  if (!element) {
    return;
  }


  element.textContent =
    value || "-";

}


function getInitial(name) {

  if (!name) {
    return "S";
  }


  return name
    .trim()
    .charAt(0)
    .toUpperCase();

}


function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }


  const date =
    new Date(
      `${dateString}T00:00:00`
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

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
