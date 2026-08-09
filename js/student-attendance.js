"use strict";

/*
 * LUMINEX V5 PREMIUM ECOSYSTEM
 * Technical Training Centre
 * Student Attendance Management
 *
 * Existing integrations:
 *
 * Student Profile:
 * luminex_students
 *
 * Training Program:
 * luminex_training_programs
 *
 * Attendance:
 * luminex_student_attendance
 *
 * This module does NOT recreate
 * Student Profile or Training Program.
 */


/* =========================
   STORAGE KEYS
========================= */

const ATTENDANCE_STORAGE_KEY =
  "luminex_student_attendance";

const STUDENT_STORAGE_KEY =
  "luminex_students";

const PROGRAM_STORAGE_KEY =
  "luminex_training_programs";


/* =========================
   DATA
========================= */

let attendanceRecords = [];

let students = [];

let programs = [];

let editingAttendanceId = null;


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadStudents();

    loadPrograms();

    loadAttendance();

    bindEvents();

    renderProgramOptions();

    renderFilterProgramOptions();

    renderStudentOptions();

    renderAttendance();

    updateSummary();

  }
);


/* =========================
   LOAD STUDENTS
========================= */

function loadStudents() {

  try {

    const saved =
      localStorage.getItem(
        STUDENT_STORAGE_KEY
      );

    students =
      saved
        ? JSON.parse(saved)
        : [];

    if (!Array.isArray(students)) {

      students = [];

    }

  } catch (error) {

    console.error(
      "Student loading error:",
      error
    );

    students = [];

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
   LOAD ATTENDANCE
========================= */

function loadAttendance() {

  try {

    const saved =
      localStorage.getItem(
        ATTENDANCE_STORAGE_KEY
      );

    attendanceRecords =
      saved
        ? JSON.parse(saved)
        : [];

    if (
      !Array.isArray(
        attendanceRecords
      )
    ) {

      attendanceRecords = [];

    }

  } catch (error) {

    console.error(
      "Attendance loading error:",
      error
    );

    attendanceRecords = [];

  }

}


/* =========================
   SAVE ATTENDANCE
========================= */

function saveAttendance() {

  localStorage.setItem(
    ATTENDANCE_STORAGE_KEY,
    JSON.stringify(
      attendanceRecords
    )
  );

}


/* =========================
   EVENTS
========================= */

function bindEvents() {

  document
    .getElementById(
      "markAttendanceBtn"
    )
    .addEventListener(
      "click",
      () => openAttendanceModal()
    );


  document
    .getElementById(
      "emptyAddBtn"
    )
    .addEventListener(
      "click",
      () => openAttendanceModal()
    );


  document
    .getElementById(
      "closeModalBtn"
    )
    .addEventListener(
      "click",
      closeAttendanceModal
    );


  document
    .getElementById(
      "cancelBtn"
    )
    .addEventListener(
      "click",
      closeAttendanceModal
    );


  document
    .getElementById(
      "attendanceForm"
    )
    .addEventListener(
      "submit",
      saveAttendanceRecord
    );


  document
    .getElementById(
      "attendanceSearch"
    )
    .addEventListener(
      "input",
      renderAttendance
    );


  document
    .getElementById(
      "programFilter"
    )
    .addEventListener(
      "change",
      renderAttendance
    );


  document
    .getElementById(
      "statusFilter"
    )
    .addEventListener(
      "change",
      renderAttendance
    );


  document
    .getElementById(
      "dateFilter"
    )
    .addEventListener(
      "change",
      renderAttendance
    );


  document
    .getElementById(
      "resetFilterBtn"
    )
    .addEventListener(
      "click",
      resetFilters
    );


  document
    .getElementById(
      "attendanceModal"
    )
    .addEventListener(
      "click",
      event => {

        if (
          event.target.id ===
          "attendanceModal"
        ) {

          closeAttendanceModal();

        }

      }
    );


  document
    .getElementById(
      "attendanceProgram"
    )
    .addEventListener(
      "change",
      () => {

        renderStudentOptions(
          document
            .getElementById(
              "attendanceProgram"
            )
            .value
        );

      }
    );

}


/* =========================
   PROGRAM OPTIONS
========================= */

function renderProgramOptions() {

  const select =
    document.getElementById(
      "attendanceProgram"
    );


  select.innerHTML = `
    <option value="">
      Select Program
    </option>
  `;


  programs.forEach(
    program => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        program.id;


      option.textContent =
        `${program.id} — ${program.name}`;


      select.appendChild(
        option
      );

    }
  );

}


/* =========================
   FILTER PROGRAM OPTIONS
========================= */

function renderFilterProgramOptions() {

  const select =
    document.getElementById(
      "programFilter"
    );


  select.innerHTML = `
    <option value="">
      All Programs
    </option>
  `;


  programs.forEach(
    program => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        program.id;


      option.textContent =
        program.name;


      select.appendChild(
        option
      );

    }
  );

}


/* =========================
   STUDENT OPTIONS
========================= */

function renderStudentOptions(
  selectedProgramId = ""
) {

  const select =
    document.getElementById(
      "attendanceStudent"
    );


  const currentValue =
    select.value;


  select.innerHTML = `
    <option value="">
      Select Student
    </option>
  `;


  let filteredStudents =
    [...students];


  /*
   * If Student Profile contains
   * programId / trainingProgramId,
   * use it for program matching.
   *
   * Otherwise show all students.
   */

  if (
    selectedProgramId
  ) {

    const matching =
      students.filter(
        student => {

          return (
            student.programId ===
              selectedProgramId ||

            student.trainingProgramId ===
              selectedProgramId ||

            student.program ===
              selectedProgramId ||

            student.programId ===
              getProgramName(
                selectedProgramId
              )

          );

        }
      );


    if (
      matching.length > 0
    ) {

      filteredStudents =
        matching;

    }

  }


  filteredStudents.forEach(
    student => {

      const option =
        document.createElement(
          "option"
        );


      const studentId =
        getStudentId(
          student
        );


      const studentName =
        getStudentName(
          student
        );


      option.value =
        studentId;


      option.textContent =
        `${studentId} — ${studentName}`;


      select.appendChild(
        option
      );

    }
  );


  if (
    currentValue &&
    [...select.options]
      .some(
        option =>
          option.value ===
          currentValue
      )
  ) {

    select.value =
      currentValue;

  }

}


/* =========================
   OPEN MODAL
========================= */

function openAttendanceModal(
  record = null
) {

  const modal =
    document.getElementById(
      "attendanceModal"
    );


  const form =
    document.getElementById(
      "attendanceForm"
    );


  form.reset();


  renderProgramOptions();


  renderStudentOptions();


  if (record) {

    editingAttendanceId =
      record.id;


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Edit Attendance";


    document.getElementById(
      "attendanceEditId"
    ).value =
      record.id;


    document.getElementById(
      "attendanceDate"
    ).value =
      record.date || "";


    document.getElementById(
      "attendanceProgram"
    ).value =
      record.programId || "";


    renderStudentOptions(
      record.programId || ""
    );


    document.getElementById(
      "attendanceStudent"
    ).value =
      record.studentId || "";


    const radio =
      document.querySelector(
        `input[name="attendanceStatus"][value="${record.status}"]`
      );


    if (radio) {

      radio.checked =
        true;

    }


    document.getElementById(
      "attendanceRemarks"
    ).value =
      record.remarks || "";


    document.getElementById(
      "recordedBy"
    ).value =
      record.recordedBy || "";

  } else {

    editingAttendanceId =
      null;


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Mark Attendance";


    document.getElementById(
      "attendanceDate"
    ).value =
      getTodayDate();


    document.getElementById(
      "recordedBy"
    ).value =
      "";

  }


  modal.classList.remove(
    "hidden"
  );

}


/* =========================
   CLOSE MODAL
========================= */

function closeAttendanceModal() {

  document
    .getElementById(
      "attendanceModal"
    )
    .classList.add(
      "hidden"
    );


  editingAttendanceId =
    null;

}


/* =========================
   SAVE RECORD
========================= */

function saveAttendanceRecord(
  event
) {

  event.preventDefault();


  const date =
    document
      .getElementById(
        "attendanceDate"
      )
      .value;


  const programId =
    document
      .getElementById(
        "attendanceProgram"
      )
      .value;


  const studentId =
    document
      .getElementById(
        "attendanceStudent"
      )
      .value;


  const statusElement =
    document.querySelector(
      'input[name="attendanceStatus"]:checked'
    );


  const status =
    statusElement
      ? statusElement.value
      : "";


  const remarks =
    document
      .getElementById(
        "attendanceRemarks"
      )
      .value
      .trim();


  const recordedBy =
    document
      .getElementById(
        "recordedBy"
      )
      .value
      .trim();


  if (
    !date ||
    !programId ||
    !studentId ||
    !status
  ) {

    showToast(
      "Please complete all required fields."
    );

    return;

  }


  const student =
    students.find(
      item =>
        getStudentId(
          item
        ) === studentId
    );


  const program =
    programs.find(
      item =>
        item.id === programId
    );


  if (!student) {

    showToast(
      "Selected student was not found."
    );

    return;

  }


  if (!program) {

    showToast(
      "Selected program was not found."
    );

    return;

  }


  /*
   * Duplicate prevention
   */

  const duplicate =
    attendanceRecords.find(
      record => {

        return (
          record.date === date &&
          record.programId ===
            programId &&
          record.studentId ===
            studentId &&
          record.id !==
            editingAttendanceId
        );

      }
    );


  if (duplicate) {

    showToast(
      "Attendance already exists for this student on this date."
    );

    return;

  }


  if (
    editingAttendanceId
  ) {

    const index =
      attendanceRecords.findIndex(
        record =>
          record.id ===
          editingAttendanceId
      );


    if (index !== -1) {

      attendanceRecords[index] = {

        ...attendanceRecords[index],

        date,

        programId,

        programName:
          program.name,

        studentId,

        studentName:
          getStudentName(
            student
          ),

        status,

        remarks,

        recordedBy,

        updatedAt:
          new Date().toISOString()

      };

    }


    showToast(
      "Attendance updated successfully."
    );

  } else {

    const record = {

      id:
        generateAttendanceId(),

      date,

      programId,

      programName:
        program.name,

      studentId,

      studentName:
        getStudentName(
          student
        ),

      status,

      remarks,

      recordedBy,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    };


    attendanceRecords.unshift(
      record
    );


    showToast(
      "Attendance recorded successfully."
    );

  }


  saveAttendance();

  renderAttendance();

  updateSummary();

  closeAttendanceModal();

}


/* =========================
   GENERATE ID
========================= */

function generateAttendanceId() {

  let number =
    attendanceRecords.length + 1;


  let id =
    "LUM-ATT-" +
    String(number).padStart(
      6,
      "0"
    );


  while (
    attendanceRecords.some(
      record =>
        record.id === id
    )
  ) {

    number++;


    id =
      "LUM-ATT-" +
      String(number).padStart(
        6,
        "0"
      );

  }


  return id;

}


/* =========================
   RENDER ATTENDANCE
========================= */

function renderAttendance() {

  const tbody =
    document.getElementById(
      "attendanceTableBody"
    );


  const emptyState =
    document.getElementById(
      "emptyState"
    );


  const search =
    document
      .getElementById(
        "attendanceSearch"
      )
      .value
      .trim()
      .toLowerCase();


  const programFilter =
    document
      .getElementById(
        "programFilter"
      )
      .value;


  const statusFilter =
    document
      .getElementById(
        "statusFilter"
      )
      .value;


  const dateFilter =
    document
      .getElementById(
        "dateFilter"
      )
      .value;


  const filtered =
    attendanceRecords.filter(
      record => {

        const searchable = [

          record.studentId,

          record.studentName,

          record.programId,

          record.programName,

          record.remarks,

          record.recordedBy

        ]
          .join(" ")
          .toLowerCase();


        const matchesSearch =
          !search ||
          searchable.includes(
            search
          );


        const matchesProgram =
          !programFilter ||
          record.programId ===
            programFilter;


        const matchesStatus =
          !statusFilter ||
          record.status ===
            statusFilter;


        const matchesDate =
          !dateFilter ||
          record.date ===
            dateFilter;


        return (
          matchesSearch &&
          matchesProgram &&
          matchesStatus &&
          matchesDate
        );

      }
    );


  tbody.innerHTML = "";


  document.getElementById(
    "recordCount"
  ).textContent =
    `${filtered.length} Record${filtered.length !== 1 ? "s" : ""}`;


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
    record => {

      const row =
        document.createElement(
          "tr"
        );


      row.innerHTML = `

        <td>
          <strong>
            ${formatDate(record.date)}
          </strong>
        </td>

        <td>
          <strong>
            ${escapeHtml(record.studentName || "-")}
          </strong>
          <br>
          <small>
            ${escapeHtml(record.studentId || "")}
          </small>
        </td>

        <td>
          ${escapeHtml(record.programName || "-")}
        </td>

        <td>

          <span class="
            status-badge
            ${getStatusClass(record.status)}
          ">
            ${escapeHtml(record.status)}
          </span>

        </td>

        <td>
          ${escapeHtml(record.remarks || "-")}
        </td>

        <td>
          ${escapeHtml(record.recordedBy || "-")}
        </td>

        <td>

          <div class="action-group">

            <button
              type="button"
              class="action-btn"
              data-action="edit"
              data-id="${escapeHtml(record.id)}"
            >
              Edit
            </button>

            <button
              type="button"
              class="action-btn delete"
              data-action="delete"
              data-id="${escapeHtml(record.id)}"
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
   ACTIONS
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


            const record =
              attendanceRecords.find(
                item =>
                  item.id ===
                  id
              );


            if (!record) {
              return;
            }


            if (
              action ===
              "edit"
            ) {

              openAttendanceModal(
                record
              );

            }


            if (
              action ===
              "delete"
            ) {

              deleteAttendance(
                id
              );

            }

          }
        );

      }
    );

}


/* =========================
   DELETE
========================= */

function deleteAttendance(
  id
) {

  const record =
    attendanceRecords.find(
      item =>
        item.id === id
    );


  if (!record) {
    return;
  }


  const confirmed =
    window.confirm(
      `Delete attendance record for "${record.studentName}" on ${formatDate(record.date)}?`
    );


  if (!confirmed) {
    return;
  }


  attendanceRecords =
    attendanceRecords.filter(
      item =>
        item.id !== id
    );


  saveAttendance();

  renderAttendance();

  updateSummary();


  showToast(
    "Attendance record deleted."
  );

}


/* =========================
   SUMMARY
========================= */

function updateSummary() {

  const total =
    attendanceRecords.length;


  const present =
    attendanceRecords.filter(
      record =>
        record.status ===
        "Present"
    ).length;


  const absent =
    attendanceRecords.filter(
      record =>
        record.status ===
        "Absent"
    ).length;


  /*
   * Attendance rate:
   *
   * Present + Late = attended
   *
   * Leave is excluded
   * from denominator.
   */

  const counted =
    attendanceRecords.filter(
      record =>
        record.status ===
          "Present" ||
        record.status ===
          "Absent" ||
        record.status ===
          "Late"
    ).length;


  const attended =
    attendanceRecords.filter(
      record =>
        record.status ===
          "Present" ||
        record.status ===
          "Late"
    ).length;


  const rate =
    counted > 0
      ? Math.round(
          (
            attended /
            counted
          ) * 100
        )
      : 0;


  document.getElementById(
    "totalRecords"
  ).textContent =
    total;


  document.getElementById(
    "presentCount"
  ).textContent =
    present;


  document.getElementById(
    "absentCount"
  ).textContent =
    absent;


  document.getElementById(
    "attendanceRate"
  ).textContent =
    `${rate}%`;

}


/* =========================
   RESET
========================= */

function resetFilters() {

  document.getElementById(
    "attendanceSearch"
  ).value = "";


  document.getElementById(
    "programFilter"
  ).value = "";


  document.getElementById(
    "statusFilter"
  ).value = "";


  document.getElementById(
    "dateFilter"
  ).value = "";


  renderAttendance();

}


/* =========================
   HELPERS
========================= */

function getStudentId(
  student
) {

  return (
    student.studentId ||
    student.id ||
    student.registrationId ||
    student.studentID ||
    ""
  );

}


function getStudentName(
  student
) {

  return (
    student.name ||
    student.studentName ||
    student.fullName ||
    [
      student.firstName,
      student.lastName
    ]
      .filter(Boolean)
      .join(" ") ||
    "Unknown Student"
  );

}


function getProgramName(
  programId
) {

  const program =
    programs.find(
      item =>
        item.id ===
        programId
    );


  return program
    ? program.name
    : "";

}


/* =========================
   STATUS CLASS
========================= */

function getStatusClass(
  status
) {

  const classes = {

    Present:
      "status-present",

    Absent:
      "status-absent",

    Late:
      "status-late",

    Leave:
      "status-leave"

  };


  return (
    classes[status] ||
    ""
  );

}


/* =========================
   DATE
========================= */

function getTodayDate() {

  const date =
    new Date();


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${year}-${month}-${day}`;

}


function formatDate(
  value
) {

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
   ESCAPE HTML
========================= */

function escapeHtml(
  value
) {

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
