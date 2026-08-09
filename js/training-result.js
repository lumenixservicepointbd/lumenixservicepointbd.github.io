/* =========================================================
   LUMENIX TRAINING RESULT & CERTIFICATE
   Examination + Result + Certificate
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "lumenix_training_results";

  let results = loadResults();

  const $ = (id) => document.getElementById(id);

  /* =======================================================
     STORAGE
     ======================================================= */

  function loadResults() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Unable to load training results:", error);
      return [];
    }
  }

  function saveResults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  }

  /* =======================================================
     HELPERS
     ======================================================= */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function generateId() {
    return "RES-" + Date.now().toString().slice(-8);
  }

  function generateCertificateNumber() {
    const year = new Date().getFullYear();
    const number = String(results.length + 1).padStart(5, "0");
    return `LUM-CERT-${year}-${number}`;
  }

  function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-GB");
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

  function calculateResult(totalMarks, passMarks, obtainedMarks) {
    const total = Number(totalMarks) || 0;
    const pass = Number(passMarks) || 0;
    const obtained = Number(obtainedMarks) || 0;

    const percentage = total > 0
      ? (obtained / total) * 100
      : 0;

    const status =
      obtained >= pass && total > 0
        ? "Passed"
        : "Failed";

    return {
      percentage,
      grade: calculateGrade(percentage),
      status
    };
  }

  /* =======================================================
     MARK PREVIEW
     ======================================================= */

  function getFormMarks() {
    const written = Number($("writtenMarks").value) || 0;
    const practical = Number($("practicalMarks").value) || 0;
    const viva = Number($("vivaMarks").value) || 0;

    return written + practical + viva;
  }

  function updatePreview() {
    const totalMarks = Number($("totalMarks").value) || 0;
    const passMarks = Number($("passMarks").value) || 0;
    const obtained = getFormMarks();

    const result = calculateResult(
      totalMarks,
      passMarks,
      obtained
    );

    $("obtainedPreview").textContent = obtained;
    $("percentagePreview").textContent =
      result.percentage.toFixed(2) + "%";

    $("gradePreview").textContent = result.grade;

    const status = $("statusPreview");

    status.textContent =
      totalMarks > 0 && (getFormMarks() > 0)
        ? result.status
        : "Pending";

    status.className = "status-badge";

    if (result.status === "Passed" && obtained > 0) {
      status.classList.add("pass");
    } else if (result.status === "Failed" && obtained > 0) {
      status.classList.add("fail");
    } else {
      status.classList.add("neutral");
    }
  }

  [
    "totalMarks",
    "passMarks",
    "writtenMarks",
    "practicalMarks",
    "vivaMarks"
  ].forEach((id) => {
    $(id).addEventListener("input", updatePreview);
  });

  /* =======================================================
     TABS
     ======================================================= */

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {

      const target = button.dataset.tab;

      document.querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));

      document.querySelectorAll(".tab-panel")
        .forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");

      const panel = $(target);

      if (panel) {
        panel.classList.add("active");
      }

      if (target === "results") {
        renderResults();
      }

      if (target === "certificates") {
        renderCertificates();
      }
    });
  });

  /* =======================================================
     SAVE RESULT
     ======================================================= */

  $("resultForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const totalMarks = Number($("totalMarks").value) || 0;
    const passMarks = Number($("passMarks").value) || 0;

    const written = Number($("writtenMarks").value) || 0;
    const practical = Number($("practicalMarks").value) || 0;
    const viva = Number($("vivaMarks").value) || 0;

    const obtainedMarks =
      written + practical + viva;

    if (passMarks > totalMarks) {
      alert("Pass marks cannot be greater than total marks.");
      return;
    }

    if (obtainedMarks > totalMarks) {
      alert("Obtained marks cannot be greater than total marks.");
      return;
    }

    const calculation = calculateResult(
      totalMarks,
      passMarks,
      obtainedMarks
    );

    let certificateEligible;

    if ($("certificateEligible").value === "eligible") {
      certificateEligible = true;
    } else if ($("certificateEligible").value === "not-eligible") {
      certificateEligible = false;
    } else {
      certificateEligible =
        calculation.status === "Passed";
    }

    const record = {
      id: generateId(),

      studentId: $("studentId").value.trim(),
      studentName: $("studentName").value.trim(),
      courseName: $("courseName").value.trim(),
      batchName: $("batchName").value.trim(),

      examType: $("examType").value,
      examDate: $("examDate").value,

      totalMarks,
      passMarks,

      writtenMarks: written,
      practicalMarks: practical,
      vivaMarks: viva,

      obtainedMarks,

      percentage: Number(
        calculation.percentage.toFixed(2)
      ),

      grade: calculation.grade,
      status: calculation.status,

      certificateEligible,

      certificateNumber:
        certificateEligible && calculation.status === "Passed"
          ? generateCertificateNumber()
          : "",

      certificateIssueDate:
        certificateEligible && calculation.status === "Passed"
          ? new Date().toISOString().split("T")[0]
          : "",

      createdAt: new Date().toISOString()
    };

    results.unshift(record);

    saveResults();

    alert("Training result saved successfully.");

    this.reset();

    $("writtenMarks").value = 0;
    $("practicalMarks").value = 0;
    $("vivaMarks").value = 0;

    updatePreview();

    updateSummary();

    showTab("results");

    renderResults();
  });

  /* =======================================================
     RESULTS TABLE
     ======================================================= */

  function renderResults() {

    const tbody = $("resultsTableBody");

    const search =
      $("resultSearch").value.trim().toLowerCase();

    const filter =
      $("resultFilter").value;

    let filtered = results.filter((item) => {

      const searchable = [
        item.studentName,
        item.studentId,
        item.courseName,
        item.batchName
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || searchable.includes(search);

      let matchesFilter = true;

      if (filter === "passed") {
        matchesFilter = item.status === "Passed";
      }

      if (filter === "failed") {
        matchesFilter = item.status === "Failed";
      }

      if (filter === "certificate") {
        matchesFilter = item.certificateEligible === true;
      }

      return matchesSearch && matchesFilter;
    });

    if (!filtered.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="empty-row">
            No matching result records found.
          </td>
        </tr>
      `;

      return;
    }

    tbody.innerHTML = filtered.map((item) => {

      const statusClass =
        item.status === "Passed"
          ? "result-pass"
          : "result-fail";

      const certificateText =
        item.certificateEligible
          ? "Eligible"
          : "Not Eligible";

      return `
        <tr>

          <td>
            <strong>${escapeHTML(item.studentName)}</strong>
            <br>
            <small>${escapeHTML(item.studentId)}</small>
          </td>

          <td>${escapeHTML(item.courseName)}</td>

          <td>${escapeHTML(item.examType)}</td>

          <td>${formatDate(item.examDate)}</td>

          <td>
            ${item.obtainedMarks}/${item.totalMarks}
          </td>

          <td>
            ${item.percentage.toFixed(2)}%
          </td>

          <td>
            <strong>${escapeHTML(item.grade)}</strong>
          </td>

          <td class="${statusClass}">
            ${escapeHTML(item.status)}
          </td>

          <td>
            ${certificateText}
          </td>

          <td>
            <div class="table-action">

              ${
                item.certificateEligible
                  ? `
                    <button
                      class="small-btn view"
                      data-certificate="${item.id}">
                      Certificate
                    </button>
                  `
                  : ""
              }

              <button
                class="small-btn delete"
                data-delete="${item.id}">
                Delete
              </button>

            </div>
          </td>

        </tr>
      `;

    }).join("");
  }

  $("resultSearch").addEventListener(
    "input",
    renderResults
  );

  $("resultFilter").addEventListener(
    "change",
    renderResults
  );

  /* =======================================================
     RESULT ACTIONS
     ======================================================= */

  $("resultsTableBody").addEventListener(
    "click",
    function (event) {

      const certificateButton =
        event.target.closest("[data-certificate]");

      const deleteButton =
        event.target.closest("[data-delete]");

      if (certificateButton) {
        const id =
          certificateButton.dataset.certificate;

        openCertificate(id);
      }

      if (deleteButton) {
        const id =
          deleteButton.dataset.delete;

        deleteResult(id);
      }
    }
  );

  function deleteResult(id) {

    const record =
      results.find((item) => item.id === id);

    if (!record) return;

    const confirmed = confirm(
      `Delete result for ${record.studentName}?`
    );

    if (!confirmed) return;

    results =
      results.filter((item) => item.id !== id);

    saveResults();

    renderResults();
    renderCertificates();
    updateSummary();
  }

  /* =======================================================
     CERTIFICATES
     ======================================================= */

  function renderCertificates() {

    const grid = $("certificateGrid");

    const search =
      $("certificateSearch").value
        .trim()
        .toLowerCase();

    const certificates =
      results.filter((item) => {

        if (!item.certificateEligible) {
          return false;
        }

        const searchable = [
          item.studentName,
          item.studentId,
          item.courseName,
          item.certificateNumber
        ]
          .join(" ")
          .toLowerCase();

        return !search ||
          searchable.includes(search);
      });

    if (!certificates.length) {

      grid.innerHTML = `
        <div class="empty-certificate">
          <div class="empty-icon">▣</div>
          <h3>No Certificates Found</h3>
          <p>
            Passed and certificate-eligible students
            will appear here.
          </p>
        </div>
      `;

      return;
    }

    grid.innerHTML =
      certificates.map((item) => {

        return `
          <div class="certificate-card">

            <h3>
              ${escapeHTML(item.studentName)}
            </h3>

            <p>
              Student ID:
              ${escapeHTML(item.studentId)}
            </p>

            <p>
              Course:
              ${escapeHTML(item.courseName)}
            </p>

            <p>
              Result:
              <strong>${escapeHTML(item.grade)}</strong>
            </p>

            <p class="certificate-number">
              ${escapeHTML(item.certificateNumber)}
            </p>

            <button
              class="btn btn-primary"
              data-certificate="${item.id}">
              View Certificate
            </button>

          </div>
        `;

      }).join("");
  }

  $("certificateSearch").addEventListener(
    "input",
    renderCertificates
  );

  $("certificateGrid").addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest("[data-certificate]");

      if (!button) return;

      openCertificate(
        button.dataset.certificate
      );
    }
  );

  /* =======================================================
     CERTIFICATE MODAL
     ======================================================= */

  function openCertificate(id) {

    const record =
      results.find((item) => item.id === id);

    if (!record) return;

    $("certificateStudentName").textContent =
      record.studentName;

    $("certificateCourse").textContent =
      record.courseName;

    $("certificateNumber").textContent =
      record.certificateNumber || "—";

    $("certificateIssueDate").textContent =
      formatDate(record.certificateIssueDate);

    $("certificateResult").textContent =
      `${record.grade} — ${record.status}`;

    $("certificateModal").classList.add("show");

    $("certificateModal")
      .dataset.activeId = id;
  }

  function closeCertificate() {
    $("certificateModal")
      .classList.remove("show");
  }

  $("closeCertificateModal")
    .addEventListener(
      "click",
      closeCertificate
    );

  $("certificateModal")
    .addEventListener(
      "click",
      function (event) {

        if (event.target === this) {
          closeCertificate();
        }

      }
    );

  $("printCertificateBtn")
    .addEventListener(
      "click",
      function () {

        const modal =
          $("certificateModal");

        modal.classList.add("show");

        window.print();
      }
    );

  /* =======================================================
     NEW RESULT
     ======================================================= */

  $("newResultBtn")
    .addEventListener(
      "click",
      function () {

        showTab("examination");

        $("studentId").focus();
      }
    );

  $("resetBtn")
    .addEventListener(
      "click",
      function () {

        setTimeout(() => {
          $("writtenMarks").value = 0;
          $("practicalMarks").value = 0;
          $("vivaMarks").value = 0;

          updatePreview();
        }, 0);

      }
    );

  /* =======================================================
     TAB HELPER
     ======================================================= */

  function showTab(tabName) {

    document.querySelectorAll(".tab-btn")
      .forEach((button) => {

        button.classList.toggle(
          "active",
          button.dataset.tab === tabName
        );

      });

    document.querySelectorAll(".tab-panel")
      .forEach((panel) => {

        panel.classList.toggle(
          "active",
          panel.id === tabName
        );

      });

    if (tabName === "results") {
      renderResults();
    }

    if (tabName === "certificates") {
      renderCertificates();
    }
  }

  /* =======================================================
     SUMMARY
     ======================================================= */

  function updateSummary() {

    const total = results.length;

    const passed =
      results.filter(
        (item) => item.status === "Passed"
      ).length;

    const failed =
      results.filter(
        (item) => item.status === "Failed"
      ).length;

    const certificates =
      results.filter(
        (item) => item.certificateEligible
      ).length;

    $("totalStudents").textContent = total;
    $("passedStudents").textContent = passed;
    $("failedStudents").textContent = failed;
    $("certificateCount").textContent = certificates;
  }

  /* =======================================================
     INITIALIZE
     ======================================================= */

  function init() {

    const today =
      new Date().toISOString().split("T")[0];

    $("examDate").value = today;

    updatePreview();
    updateSummary();
    renderResults();
    renderCertificates();
  }

  init();

})();
