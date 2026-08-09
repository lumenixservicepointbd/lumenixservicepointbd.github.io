/* =========================================================
   LUMENIX
   Certificate & Examination System
   certificate-examination.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     STORAGE
  ======================================================= */

  const STORAGE_KEYS = {
    exams: "lumenix_certificate_exams",
    results: "lumenix_certificate_results",
    certificates: "lumenix_certificates"
  };

  let exams = loadData(STORAGE_KEYS.exams);
  let results = loadData(STORAGE_KEYS.results);
  let certificates = loadData(STORAGE_KEYS.certificates);


  function loadData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Storage load error:", error);
      return [];
    }
  }


  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }


  /* =======================================================
     HELPERS
  ======================================================= */

  function generateId(prefix) {
    return (
      prefix +
      "-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).substring(2, 7).toUpperCase()
    );
  }


  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  function formatDate(date) {
    if (!date) return "—";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return escapeHTML(date);
    }

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }


  function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  function calculatePercentage(marks, total) {
    if (!total || total <= 0) return 0;

    return Math.round((Number(marks) / Number(total)) * 100);
  }


  function calculateGrade(percentage) {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "A-";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    if (percentage >= 33) return "D";

    return "F";
  }


  function getResultStatus(percentage) {
    return percentage >= 33 ? "Passed" : "Failed";
  }


  function statusClass(status) {
    const value = String(status || "").toLowerCase();

    if (value === "passed") return "status-passed";
    if (value === "failed") return "status-failed";
    if (value === "valid") return "status-valid";
    if (value === "revoked") return "status-revoked";
    if (value === "scheduled") return "status-scheduled";
    if (value === "completed") return "status-completed";
    if (value === "cancelled") return "status-cancelled";

    return "status-warning";
  }


  /* =======================================================
     TOAST
  ======================================================= */

  const toast = document.getElementById("toast");

  let toastTimer;


  function showToast(message, type = "success") {
    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.className = "toast show " + type;

    toastTimer = setTimeout(() => {
      toast.className = "toast";
    }, 2800);
  }


  /* =======================================================
     TABS
  ======================================================= */

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");


  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      button.classList.add("active");

      const targetContent = document.getElementById(target);

      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });


  /* =======================================================
     MODAL SYSTEM
  ======================================================= */

  function openModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }


  function closeModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
      modal.classList.remove("active");
    }

    if (!document.querySelector(".modal-overlay.active")) {
      document.body.style.overflow = "";
    }
  }


  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.dataset.close);
    });
  });


  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal =
        document.querySelector(".modal-overlay.active");

      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });


  /* =======================================================
     SUMMARY
  ======================================================= */

  function updateSummary() {
    const totalExams = document.getElementById("totalExams");
    const totalPassed = document.getElementById("totalPassed");
    const totalCertificates =
      document.getElementById("totalCertificates");
    const totalStudents =
      document.getElementById("totalStudents");


    if (totalExams) {
      totalExams.textContent = exams.length;
    }


    if (totalPassed) {
      totalPassed.textContent =
        results.filter((item) => item.result === "Passed").length;
    }


    if (totalCertificates) {
      totalCertificates.textContent = certificates.length;
    }


    if (totalStudents) {
      const students = new Set();

      results.forEach((item) => {
        if (item.studentId) {
          students.add(item.studentId);
        } else if (item.student) {
          students.add(item.student.toLowerCase());
        }
      });

      certificates.forEach((item) => {
        if (item.studentId) {
          students.add(item.studentId);
        } else if (item.student) {
          students.add(item.student.toLowerCase());
        }
      });

      totalStudents.textContent = students.size;
    }
  }


  /* =======================================================
     EXAMINATION
  ======================================================= */

  const addExamBtn = document.getElementById("addExamBtn");

  if (addExamBtn) {
    addExamBtn.addEventListener("click", () => {
      const form = document.getElementById("examForm");

      if (form) {
        form.reset();
      }

      openModal("examModal");
    });
  }


  const examForm = document.getElementById("examForm");


  if (examForm) {
    examForm.addEventListener("submit", (event) => {
      event.preventDefault();


      const exam = {
        id: generateId("EXAM"),

        name:
          document.getElementById("examName")?.value.trim() || "",

        course:
          document.getElementById("examCourse")?.value.trim() || "",

        date:
          document.getElementById("examDate")?.value || "",

        totalMarks:
          Number(
            document.getElementById("examTotalMarks")?.value || 0
          ),

        passMarks:
          Number(
            document.getElementById("examPassMarks")?.value || 0
          ),

        status:
          document.getElementById("examStatus")?.value ||
          "Scheduled",

        createdAt: new Date().toISOString()
      };


      if (
        !exam.name ||
        !exam.course ||
        !exam.date ||
        exam.totalMarks <= 0 ||
        exam.passMarks <= 0
      ) {
        showToast(
          "Please complete all required examination fields.",
          "error"
        );

        return;
      }


      if (exam.passMarks > exam.totalMarks) {
        showToast(
          "Pass marks cannot be greater than total marks.",
          "error"
        );

        return;
      }


      exams.unshift(exam);

      saveData(STORAGE_KEYS.exams, exams);

      renderExams();

      updateSummary();

      closeModal("examModal");

      examForm.reset();

      showToast("Examination created successfully.");
    });
  }


  /* =======================================================
     RENDER EXAMS
  ======================================================= */

  function renderExams() {
    const tbody = document.getElementById("examTableBody");

    if (!tbody) return;


    const search =
      document.getElementById("examSearch")?.value
        .trim()
        .toLowerCase() || "";


    const status =
      document.getElementById("examStatusFilter")?.value ||
      "all";


    const filtered = exams.filter((exam) => {
      const matchesSearch =
        !search ||
        exam.id.toLowerCase().includes(search) ||
        exam.name.toLowerCase().includes(search) ||
        exam.course.toLowerCase().includes(search);


      const matchesStatus =
        status === "all" || exam.status === status;


      return matchesSearch && matchesStatus;
    });


    if (!filtered.length) {
      tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="7">
            No examinations found.
          </td>
        </tr>
      `;

      return;
    }


    tbody.innerHTML = filtered
      .map((exam) => {
        return `
          <tr>

            <td>
              <strong>${escapeHTML(exam.id)}</strong>
            </td>

            <td>
              ${escapeHTML(exam.name)}
            </td>

            <td>
              ${escapeHTML(exam.course)}
            </td>

            <td>
              ${formatDate(exam.date)}
            </td>

            <td>
              ${exam.totalMarks}
            </td>

            <td>
              <span class="status-badge ${statusClass(exam.status)}">
                ${escapeHTML(exam.status)}
              </span>
            </td>

            <td>

              <div class="table-actions">

                <button
                  class="action-btn primary"
                  data-action="add-result"
                  data-exam-id="${exam.id}"
                >
                  Result
                </button>

                <button
                  class="action-btn danger"
                  data-action="delete-exam"
                  data-exam-id="${exam.id}"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>
        `;
      })
      .join("");
  }


  /* =======================================================
     EXAM SEARCH / FILTER
  ======================================================= */

  document
    .getElementById("examSearch")
    ?.addEventListener("input", renderExams);


  document
    .getElementById("examStatusFilter")
    ?.addEventListener("change", renderExams);


  /* =======================================================
     EXAM TABLE ACTIONS
  ======================================================= */

  document
    .getElementById("examTableBody")
    ?.addEventListener("click", (event) => {

      const button =
        event.target.closest("[data-action]");

      if (!button) return;


      const action = button.dataset.action;

      const examId = button.dataset.examId;


      if (action === "delete-exam") {
        deleteExam(examId);
      }


      if (action === "add-result") {
        openResultForExam(examId);
      }
    });


  function deleteExam(id) {
    const exam = exams.find((item) => item.id === id);

    if (!exam) return;


    const confirmed = confirm(
      `Delete examination "${exam.name}"?`
    );

    if (!confirmed) return;


    exams = exams.filter((item) => item.id !== id);

    saveData(STORAGE_KEYS.exams, exams);

    renderExams();

    updateSummary();

    showToast("Examination deleted.");
  }


  function openResultForExam(examId) {
    const exam = exams.find((item) => item.id === examId);

    if (!exam) return;


    const form = document.getElementById("resultForm");

    if (form) {
      form.reset();
    }


    const examField = document.getElementById("resultExam");
    const totalField =
      document.getElementById("resultTotalMarks");


    if (examField) {
      examField.value = exam.name;
    }


    if (totalField) {
      totalField.value = exam.totalMarks;
    }


    openModal("resultModal");
  }


  /* =======================================================
     RESULT PREVIEW
  ======================================================= */

  const resultMarks =
    document.getElementById("resultMarks");

  const resultTotalMarks =
    document.getElementById("resultTotalMarks");

  const resultPreview =
    document.getElementById("resultPreview");


  function updateResultPreview() {
    if (!resultPreview) return;


    const marks = Number(resultMarks?.value || 0);

    const total = Number(resultTotalMarks?.value || 0);


    if (!total) {
      resultPreview.textContent = "—";
      return;
    }


    const percentage =
      calculatePercentage(marks, total);

    const grade =
      calculateGrade(percentage);

    const status =
      getResultStatus(percentage);


    resultPreview.textContent =
      `${percentage}% • ${grade} • ${status}`;
  }


  resultMarks?.addEventListener(
    "input",
    updateResultPreview
  );

  resultTotalMarks?.addEventListener(
    "input",
    updateResultPreview
  );


  /* =======================================================
     RESULT FORM
  ======================================================= */

  const resultForm =
    document.getElementById("resultForm");


  if (resultForm) {
    resultForm.addEventListener("submit", (event) => {
      event.preventDefault();


      const student =
        document.getElementById("resultStudent")
          ?.value.trim() || "";


      const studentId =
        document.getElementById("resultStudentId")
          ?.value.trim() || "";


      const course =
        document.getElementById("resultCourse")
          ?.value.trim() || "";


      const exam =
        document.getElementById("resultExam")
          ?.value.trim() || "";


      const marks =
        Number(
          document.getElementById("resultMarks")?.value || 0
        );


      const totalMarks =
        Number(
          document.getElementById("resultTotalMarks")?.value || 0
        );


      if (
        !student ||
        !course ||
        !exam ||
        totalMarks <= 0
      ) {
        showToast(
          "Please complete all required result fields.",
          "error"
        );

        return;
      }


      if (marks < 0 || marks > totalMarks) {
        showToast(
          "Obtained marks must be between 0 and total marks.",
          "error"
        );

        return;
      }


      const percentage =
        calculatePercentage(marks, totalMarks);


      const grade =
        calculateGrade(percentage);


      const result =
        getResultStatus(percentage);


      const resultItem = {

        id: generateId("RESULT"),

        student,

        studentId,

        course,

        exam,

        marks,

        totalMarks,

        percentage,

        grade,

        result,

        createdAt: new Date().toISOString()

      };


      results.unshift(resultItem);

      saveData(STORAGE_KEYS.results, results);

      renderResults();

      updateSummary();

      closeModal("resultModal");

      resultForm.reset();

      if (resultPreview) {
        resultPreview.textContent = "—";
      }

      showToast("Examination result saved successfully.");
    });
  }


  /* =======================================================
     RENDER RESULTS
  ======================================================= */

  function renderResults() {
    const tbody =
      document.getElementById("resultTableBody");

    if (!tbody) return;


    const search =
      document.getElementById("resultSearch")
        ?.value.trim().toLowerCase() || "";


    const filter =
      document.getElementById("resultFilter")
        ?.value || "all";


    const filtered = results.filter((item) => {

      const matchesSearch =
        !search ||
        item.id.toLowerCase().includes(search) ||
        item.student.toLowerCase().includes(search) ||
        item.course.toLowerCase().includes(search) ||
        item.exam.toLowerCase().includes(search);


      const matchesFilter =
        filter === "all" ||
        item.result === filter;


      return matchesSearch && matchesFilter;
    });


    if (!filtered.length) {

      tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="8">
            No examination results found.
          </td>
        </tr>
      `;

      return;
    }


    tbody.innerHTML = filtered
      .map((item) => {

        return `
          <tr>

            <td>
              <strong>${escapeHTML(item.id)}</strong>
            </td>

            <td>
              ${escapeHTML(item.student)}
            </td>

            <td>
              ${escapeHTML(item.course)}
            </td>

            <td>
              ${escapeHTML(item.exam)}
            </td>

            <td>
              ${item.marks}/${item.totalMarks}
              <small>
                (${item.percentage}%)
              </small>
            </td>

            <td>
              <strong>${escapeHTML(item.grade)}</strong>
            </td>

            <td>
              <span class="status-badge ${statusClass(item.result)}">
                ${escapeHTML(item.result)}
              </span>
            </td>

            <td>

              <div class="table-actions">

                ${
                  item.result === "Passed"
                    ? `
                      <button
                        class="action-btn primary"
                        data-action="issue-certificate"
                        data-result-id="${item.id}"
                      >
                        Certificate
                      </button>
                    `
                    : ""
                }

                <button
                  class="action-btn danger"
                  data-action="delete-result"
                  data-result-id="${item.id}"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>
        `;
      })
      .join("");
  }


  /* =======================================================
     RESULT SEARCH / FILTER
  ======================================================= */

  document
    .getElementById("resultSearch")
    ?.addEventListener("input", renderResults);


  document
    .getElementById("resultFilter")
    ?.addEventListener("change", renderResults);


  /* =======================================================
     RESULT TABLE ACTIONS
  ======================================================= */

  document
    .getElementById("resultTableBody")
    ?.addEventListener("click", (event) => {

      const button =
        event.target.closest("[data-action]");

      if (!button) return;


      const action = button.dataset.action;

      const resultId =
        button.dataset.resultId;


      if (action === "delete-result") {
        deleteResult(resultId);
      }


      if (action === "issue-certificate") {
        openCertificateFromResult(resultId);
      }

    });


  function deleteResult(id) {

    const result =
      results.find((item) => item.id === id);

    if (!result) return;


    const confirmed = confirm(
      `Delete result for "${result.student}"?`
    );

    if (!confirmed) return;


    results =
      results.filter((item) => item.id !== id);


    saveData(STORAGE_KEYS.results, results);

    renderResults();

    updateSummary();

    showToast("Result deleted.");
  }


  function openCertificateFromResult(resultId) {

    const result =
      results.find((item) => item.id === resultId);

    if (!result) return;


    const form =
      document.getElementById("certificateForm");

    if (form) {
      form.reset();
    }


    const student =
      document.getElementById("certificateStudent");

    const studentId =
      document.getElementById("certificateStudentId");

    const course =
      document.getElementById("certificateCourse");

    const resultField =
      document.getElementById("certificateResult");

    const issueDate =
      document.getElementById("certificateIssueDate");


    if (student) {
      student.value = result.student;
    }


    if (studentId) {
      studentId.value = result.studentId;
    }


    if (course) {
      course.value = result.course;
    }


    if (resultField) {
      resultField.value =
        result.percentage >= 80
          ? "Distinction"
          : "Passed";
    }


    if (issueDate) {
      issueDate.value = getToday();
    }


    openModal("certificateModal");
  }


  /* =======================================================
     CERTIFICATE
  ======================================================= */

  const issueCertificateBtn =
    document.getElementById("issueCertificateBtn");


  if (issueCertificateBtn) {
    issueCertificateBtn.addEventListener("click", () => {

      const form =
        document.getElementById("certificateForm");

      if (form) {
        form.reset();
      }


      const issueDate =
        document.getElementById(
          "certificateIssueDate"
        );


      if (issueDate) {
        issueDate.value = getToday();
      }


      openModal("certificateModal");

    });
  }


  /* =======================================================
     CERTIFICATE FORM
  ======================================================= */

  const certificateForm =
    document.getElementById("certificateForm");


  if (certificateForm) {

    certificateForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const student =
          document.getElementById(
            "certificateStudent"
          )?.value.trim() || "";


        const studentId =
          document.getElementById(
            "certificateStudentId"
          )?.value.trim() || "";


        const course =
          document.getElementById(
            "certificateCourse"
          )?.value.trim() || "";


        const result =
          document.getElementById(
            "certificateResult"
          )?.value || "Passed";


        const issueDate =
          document.getElementById(
            "certificateIssueDate"
          )?.value || "";


        const status =
          document.getElementById(
            "certificateStatus"
          )?.value || "Valid";


        if (
          !student ||
          !course ||
          !issueDate
        ) {

          showToast(
            "Please complete all required certificate fields.",
            "error"
          );

          return;
        }


        const certificate = {

          id: generateCertificateNumber(),

          student,

          studentId,

          course,

          issueDate,

          result,

          status,

          createdAt: new Date().toISOString()

        };


        certificates.unshift(certificate);

        saveData(
          STORAGE_KEYS.certificates,
          certificates
        );


        renderCertificates();

        updateSummary();

        closeModal("certificateModal");

        certificateForm.reset();


        showToast(
          `Certificate ${certificate.id} issued successfully.`
        );

      }
    );
  }


  function generateCertificateNumber() {

    const year =
      new Date().getFullYear();


    let number;


    do {

      number =
        `LUM-${year}-${Math.floor(
          100000 + Math.random() * 900000
        )}`;

    } while (
      certificates.some(
        (item) => item.id === number
      )
    );


    return number;
  }


  /* =======================================================
     RENDER CERTIFICATES
  ======================================================= */

  function renderCertificates() {

    const tbody =
      document.getElementById(
        "certificateTableBody"
      );


    if (!tbody) return;


    const search =
      document.getElementById(
        "certificateSearch"
      )?.value.trim().toLowerCase() || "";


    const filtered =
      certificates.filter((item) => {

        return (
          !search ||
          item.id.toLowerCase().includes(search) ||
          item.student.toLowerCase().includes(search) ||
          item.course.toLowerCase().includes(search)
        );

      });


    if (!filtered.length) {

      tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="7">
            No certificates found.
          </td>
        </tr>
      `;

      return;
    }


    tbody.innerHTML =
      filtered
        .map((certificate) => {

          return `
            <tr>

              <td>
                <strong>
                  ${escapeHTML(certificate.id)}
                </strong>
              </td>

              <td>
                ${escapeHTML(certificate.student)}
              </td>

              <td>
                ${escapeHTML(certificate.course)}
              </td>

              <td>
                ${formatDate(certificate.issueDate)}
              </td>

              <td>
                ${escapeHTML(certificate.result)}
              </td>

              <td>
                <span
                  class="status-badge ${statusClass(
                    certificate.status
                  )}"
                >
                  ${escapeHTML(certificate.status)}
                </span>
              </td>

              <td>

                <div class="table-actions">

                  <button
                    class="action-btn primary"
                    data-action="verify"
                    data-certificate-id="${escapeHTML(
                      certificate.id
                    )}"
                  >
                    Verify
                  </button>

                  <button
                    class="action-btn danger"
                    data-action="delete-certificate"
                    data-certificate-id="${escapeHTML(
                      certificate.id
                    )}"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>
          `;

        })
        .join("");
  }


  /* =======================================================
     CERTIFICATE SEARCH
  ======================================================= */

  document
    .getElementById("certificateSearch")
    ?.addEventListener(
      "input",
      renderCertificates
    );


  /* =======================================================
     CERTIFICATE TABLE ACTIONS
  ======================================================= */

  document
    .getElementById("certificateTableBody")
    ?.addEventListener(
      "click",
      (event) => {

        const button =
          event.target.closest("[data-action]");

        if (!button) return;


        const action =
          button.dataset.action;


        const certificateId =
          button.dataset.certificateId;


        if (action === "delete-certificate") {

          deleteCertificate(
            certificateId
          );

        }


        if (action === "verify") {

          verifyCertificate(
            certificateId
          );

        }

      }
    );


  function deleteCertificate(id) {

    const certificate =
      certificates.find(
        (item) => item.id === id
      );


    if (!certificate) return;


    const confirmed = confirm(
      `Delete certificate "${certificate.id}"?`
    );


    if (!confirmed) return;


    certificates =
      certificates.filter(
        (item) => item.id !== id
      );


    saveData(
      STORAGE_KEYS.certificates,
      certificates
    );


    renderCertificates();

    updateSummary();

    showToast("Certificate deleted.");
  }


  /* =======================================================
     VERIFICATION
  ======================================================= */

  const verifyButton =
    document.getElementById(
      "verifyCertificateBtn"
    );


  const verificationInput =
    document.getElementById(
      "verificationNumber"
    );


  const verificationResult =
    document.getElementById(
      "verificationResult"
    );


  if (verifyButton) {

    verifyButton.addEventListener(
      "click",
      () => {

        verifyCertificate(
          verificationInput?.value.trim()
        );

      }
    );

  }


  verificationInput?.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        verifyCertificate(
          verificationInput.value.trim()
        );

      }

    }
  );


  function verifyCertificate(id) {

    const certificateId =
      String(id || "").trim();


    if (!certificateId) {

      if (verificationResult) {

        verificationResult.innerHTML = `
          <div class="verification-error">
            Please enter a certificate number.
          </div>
        `;

      }

      return;
    }


    const certificate =
      certificates.find(
        (item) =>
          item.id.toLowerCase() ===
          certificateId.toLowerCase()
      );


    if (!verificationResult) return;


    if (!certificate) {

      verificationResult.innerHTML = `
        <div class="verification-error">

          <strong>Certificate Not Found</strong>

          <p>
            No certificate was found with the
            number
            <strong>${escapeHTML(certificateId)}</strong>.
          </p>

        </div>
      `;

      return;
    }


    if (certificate.status === "Revoked") {

      verificationResult.innerHTML = `
        <div class="verification-error">

          <strong>Certificate Revoked</strong>

          <p>
            Certificate
            <strong>${escapeHTML(certificate.id)}</strong>
            has been revoked.
          </p>

        </div>
      `;

      return;
    }


    verificationResult.innerHTML = `
      <div class="verification-success">

        <strong>✓ Certificate Verified</strong>

        <p>
          Certificate No:
          <strong>${escapeHTML(certificate.id)}</strong>
        </p>

        <p>
          Student:
          <strong>${escapeHTML(certificate.student)}</strong>
        </p>

        <p>
          Course:
          <strong>${escapeHTML(certificate.course)}</strong>
        </p>

        <p>
          Result:
          <strong>${escapeHTML(certificate.result)}</strong>
        </p>

        <p>
          Issue Date:
          <strong>${formatDate(certificate.issueDate)}</strong>
        </p>

        <p>
          Status:
          <strong>Valid</strong>
        </p>

      </div>
    `;


    if (verificationInput) {
      verificationInput.value =
        certificate.id;
    }
  }


  /* =======================================================
     INITIAL RENDER
  ======================================================= */

  renderExams();

  renderResults();

  renderCertificates();

  updateSummary();


  /* =======================================================
     DEFAULT DATE
  ======================================================= */

  const certificateIssueDate =
    document.getElementById(
      "certificateIssueDate"
    );


  if (certificateIssueDate) {
    certificateIssueDate.value = getToday();
  }


  /* =======================================================
     DEBUG / MODULE READY
  ======================================================= */

  console.log(
    "LUMENIX Certificate & Examination System loaded successfully."
  );

});
