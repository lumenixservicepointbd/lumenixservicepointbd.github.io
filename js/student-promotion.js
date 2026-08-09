/* =========================================================
   LUMENIX
   Student Promotion & Progress System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     STORAGE
  ======================================================= */

  const STORAGE_KEY =
    "lumenix_student_promotion_records";

  let records = loadRecords();

  let pendingDeleteId = null;


  function loadRecords() {

    try {

      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved
        ? JSON.parse(saved)
        : [];

    } catch (error) {

      console.error(
        "Could not load promotion records:",
        error
      );

      return [];
    }
  }


  function saveRecords() {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(records)
      );

    } catch (error) {

      console.error(
        "Could not save promotion records:",
        error
      );

      showToast(
        "Could not save data.",
        "error"
      );
    }
  }


  /* =======================================================
     HELPERS
  ======================================================= */

  function generateId() {

    return (
      "PROM-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()
    );
  }


  function today() {

    const date = new Date();

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1)
        .padStart(2, "0");

    const day =
      String(date.getDate())
        .padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  function formatDate(value) {

    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (Number.isNaN(date.getTime())) {
      return escapeHTML(value);
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


  function clampProgress(value) {

    const number =
      Number(value);

    if (Number.isNaN(number)) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(0, number)
    );
  }


  function statusClass(status) {

    switch (status) {

      case "Promoted":
        return "status-promoted";

      case "Completed":
        return "status-completed";

      case "Hold":
        return "status-hold";

      default:
        return "status-pending";
    }
  }


  /* =======================================================
     TOAST
  ======================================================= */

  const toast =
    document.getElementById("toast");

  let toastTimer;


  function showToast(
    message,
    type = "success"
  ) {

    if (!toast) {
      return;
    }

    clearTimeout(toastTimer);

    toast.textContent =
      message;

    toast.className =
      `toast show ${type}`;

    toastTimer =
      setTimeout(() => {

        toast.className =
          "toast";

      }, 2800);
  }


  /* =======================================================
     MODALS
  ======================================================= */

  function openModal(id) {

    const modal =
      document.getElementById(id);

    if (!modal) {
      return;
    }

    modal.classList.add("active");

    document.body.style.overflow =
      "hidden";
  }


  function closeModal(id) {

    const modal =
      document.getElementById(id);

    if (!modal) {
      return;
    }

    modal.classList.remove("active");

    if (
      !document.querySelector(
        ".modal-overlay.active"
      )
    ) {

      document.body.style.overflow =
        "";
    }
  }


  document
    .querySelectorAll("[data-close]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          closeModal(
            button.dataset.close
          );

        }
      );

    });


  document
    .querySelectorAll(".modal-overlay")
    .forEach((overlay) => {

      overlay.addEventListener(
        "click",
        (event) => {

          if (
            event.target === overlay
          ) {

            closeModal(
              overlay.id
            );

          }

        }
      );

    });


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        const active =
          document.querySelector(
            ".modal-overlay.active"
          );

        if (active) {

          closeModal(
            active.id
          );

        }

      }

    }
  );


  /* =======================================================
     SUMMARY
  ======================================================= */

  function updateSummary() {

    const total =
      document.getElementById(
        "totalRecords"
      );

    const promoted =
      document.getElementById(
        "totalPromoted"
      );

    const pending =
      document.getElementById(
        "totalPending"
      );

    const completed =
      document.getElementById(
        "totalCompleted"
      );


    if (total) {

      total.textContent =
        records.length;

    }


    if (promoted) {

      promoted.textContent =
        records.filter(
          item =>
            item.status === "Promoted"
        ).length;

    }


    if (pending) {

      pending.textContent =
        records.filter(
          item =>
            item.status === "Pending"
        ).length;

    }


    if (completed) {

      completed.textContent =
        records.filter(
          item =>
            item.status === "Completed"
        ).length;

    }
  }


  /* =======================================================
     FORM ELEMENTS
  ======================================================= */

  const form =
    document.getElementById(
      "promotionForm"
    );

  const recordId =
    document.getElementById(
      "recordId"
    );

  const studentName =
    document.getElementById(
      "studentName"
    );

  const studentId =
    document.getElementById(
      "studentId"
    );

  const courseName =
    document.getElementById(
      "courseName"
    );

  const fromLevel =
    document.getElementById(
      "fromLevel"
    );

  const toLevel =
    document.getElementById(
      "toLevel"
    );

  const progress =
    document.getElementById(
      "progress"
    );

  const promotionStatus =
    document.getElementById(
      "promotionStatus"
    );

  const promotionDate =
    document.getElementById(
      "promotionDate"
    );

  const remarks =
    document.getElementById(
      "remarks"
    );


  /* =======================================================
     ADD BUTTON
  ======================================================= */

  document
    .getElementById(
      "addPromotionBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        resetForm();

        openModal(
          "promotionModal"
        );

      }
    );


  /* =======================================================
     RESET FORM
  ======================================================= */

  function resetForm() {

    if (!form) {
      return;
    }

    form.reset();

    recordId.value =
      "";

    promotionDate.value =
      today();

    progress.value =
      "0";

    promotionStatus.value =
      "Pending";

    document.getElementById(
      "modalTitle"
    ).textContent =
      "Add Promotion Record";
  }


  /* =======================================================
     SAVE / UPDATE
  ======================================================= */

  form?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        studentName.value.trim();

      const id =
        studentId.value.trim();

      const course =
        courseName.value.trim();

      const from =
        fromLevel.value;

      const to =
        toLevel.value;

      const percentage =
        clampProgress(
          progress.value
        );

      const status =
        promotionStatus.value;

      const date =
        promotionDate.value ||
        today();

      const note =
        remarks.value.trim();


      if (
        !name ||
        !id ||
        !course ||
        !from ||
        !to
      ) {

        showToast(
          "Please complete all required fields.",
          "error"
        );

        return;
      }


      if (from === to) {

        showToast(
          "From Level and To Level cannot be the same.",
          "error"
        );

        return;
      }


      const existingId =
        recordId.value;


      if (existingId) {

        const index =
          records.findIndex(
            item =>
              item.id === existingId
          );


        if (index === -1) {

          showToast(
            "Record not found.",
            "error"
          );

          return;
        }


        records[index] = {

          ...records[index],

          studentName: name,

          studentId: id,

          course,

          fromLevel: from,

          toLevel: to,

          progress: percentage,

          status,

          date,

          remarks: note,

          updatedAt:
            new Date().toISOString()

        };


        showToast(
          "Promotion record updated successfully."
        );

      } else {

        const newRecord = {

          id: generateId(),

          studentName: name,

          studentId: id,

          course,

          fromLevel: from,

          toLevel: to,

          progress: percentage,

          status,

          date,

          remarks: note,

          createdAt:
            new Date().toISOString()

        };


        records.unshift(
          newRecord
        );


        showToast(
          "Promotion record created successfully."
        );
      }


      saveRecords();

      renderTable();

      updateSummary();

      closeModal(
        "promotionModal"
      );

      resetForm();

    }
  );


  /* =======================================================
     RENDER TABLE
  ======================================================= */

  const tableBody =
    document.getElementById(
      "promotionTableBody"
    );


  function renderTable() {

    if (!tableBody) {
      return;
    }


    const search =
      document.getElementById(
        "searchInput"
      )?.value
        .trim()
        .toLowerCase() || "";


    const status =
      document.getElementById(
        "statusFilter"
      )?.value || "all";


    const level =
      document.getElementById(
        "fromLevelFilter"
      )?.value || "all";


    const filtered =
      records.filter(
        item => {

          const searchable = [

            item.studentName,

            item.studentId,

            item.course

          ]
            .join(" ")
            .toLowerCase();


          const matchesSearch =
            !search ||
            searchable.includes(
              search
            );


          const matchesStatus =
            status === "all" ||
            item.status === status;


          const matchesLevel =
            level === "all" ||
            item.fromLevel === level;


          return (
            matchesSearch &&
            matchesStatus &&
            matchesLevel
          );

        }
      );


    if (!filtered.length) {

      tableBody.innerHTML = `
        <tr class="empty-row">
          <td colspan="8">
            No promotion records found.
          </td>
        </tr>
      `;

      renderEmptyProgress();

      return;
    }


    tableBody.innerHTML =
      filtered
        .map(
          item => {

            const safeProgress =
              clampProgress(
                item.progress
              );


            return `

              <tr>

                <td>
                  <strong>
                    ${escapeHTML(
                      item.studentName
                    )}
                  </strong>
                </td>

                <td>
                  ${escapeHTML(
                    item.studentId
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    item.course
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    item.fromLevel
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    item.toLevel
                  )}
                </td>

                <td class="progress-cell">

                  <div class="progress-info">

                    <span>
                      Progress
                    </span>

                    <strong>
                      ${safeProgress}%
                    </strong>

                  </div>

                  <div class="progress-track">

                    <div
                      class="progress-bar"
                      style="width:${safeProgress}%"
                    ></div>

                  </div>

                </td>

                <td>

                  <span
                    class="status-badge ${statusClass(
                      item.status
                    )}"
                  >
                    ${escapeHTML(
                      item.status
                    )}
                  </span>

                </td>

                <td>

                  <div class="table-actions">

                    <button
                      type="button"
                      class="action-btn primary"
                      data-action="view"
                      data-id="${item.id}"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      class="action-btn"
                      data-action="edit"
                      data-id="${item.id}"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      class="action-btn danger"
                      data-action="delete"
                      data-id="${item.id}"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            `;

          }
        )
        .join("");
  }


  /* =======================================================
     TABLE ACTIONS
  ======================================================= */

  tableBody?.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          "[data-action]"
        );


      if (!button) {
        return;
      }


      const action =
        button.dataset.action;

      const id =
        button.dataset.id;


      if (action === "view") {

        viewRecord(id);

      }


      if (action === "edit") {

        editRecord(id);

      }


      if (action === "delete") {

        askDelete(id);

      }

    }
  );


  /* =======================================================
     VIEW RECORD
  ======================================================= */

  function viewRecord(id) {

    const record =
      records.find(
        item => item.id === id
      );


    if (!record) {
      return;
    }


    const container =
      document.getElementById(
        "progressContainer"
      );


    if (!container) {
      return;
    }


    const safeProgress =
      clampProgress(
        record.progress
      );


    container.innerHTML = `

      <div class="progress-detail">

        <div class="student-detail">

          <h3>
            ${escapeHTML(
              record.studentName
            )}
          </h3>

          <p>
            Student ID:
            <strong>
              ${escapeHTML(
                record.studentId
              )}
            </strong>
          </p>

          <p>
            Course:
            <strong>
              ${escapeHTML(
                record.course
              )}
            </strong>
          </p>

          <p>
            Level:
            <strong>
              ${escapeHTML(
                record.fromLevel
              )}
              →
              ${escapeHTML(
                record.toLevel
              )}
            </strong>
          </p>

          <p>
            Status:
            <strong>
              ${escapeHTML(
                record.status
              )}
            </strong>
          </p>

          <p>
            Date:
            <strong>
              ${formatDate(
                record.date
              )}
            </strong>
          </p>

          ${
            record.remarks
              ? `
                <p>
                  Remarks:
                  <strong>
                    ${escapeHTML(
                      record.remarks
                    )}
                  </strong>
                </p>
              `
              : ""
          }

        </div>


        <div>

          <div class="progress-percentage">

            <span>
              Overall Progress
            </span>

            <strong>
              ${safeProgress}%
            </strong>

          </div>


          <div class="large-progress">

            <div
              class="progress-bar"
              style="width:${safeProgress}%"
            ></div>

          </div>


          <p
            style="
              color:#667085;
              font-size:13px;
            "
          >
            ${
              safeProgress >= 100
                ? "Student has completed this progression stage."
                : safeProgress >= 75
                  ? "Student is close to completing this stage."
                  : safeProgress >= 50
                    ? "Student is making good progress."
                    : "Student is still progressing through this stage."
            }
          </p>

        </div>

      </div>

    `;


    container.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }


  function renderEmptyProgress() {

    const container =
      document.getElementById(
        "progressContainer"
      );


    if (container) {

      container.innerHTML = `

        <div class="empty-progress">
          Select a promotion record to view progress.
        </div>

      `;

    }
  }


  /* =======================================================
     EDIT RECORD
  ======================================================= */

  function editRecord(id) {

    const record =
      records.find(
        item => item.id === id
      );


    if (!record) {
      return;
    }


    recordId.value =
      record.id;

    studentName.value =
      record.studentName;

    studentId.value =
      record.studentId;

    courseName.value =
      record.course;

    fromLevel.value =
      record.fromLevel;

    toLevel.value =
      record.toLevel;

    progress.value =
      record.progress;

    promotionStatus.value =
      record.status;

    promotionDate.value =
      record.date;

    remarks.value =
      record.remarks || "";


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Edit Promotion Record";


    openModal(
      "promotionModal"
    );
  }


  /* =======================================================
     DELETE
  ======================================================= */

  function askDelete(id) {

    const record =
      records.find(
        item => item.id === id
      );


    if (!record) {
      return;
    }


    pendingDeleteId =
      id;


    openModal(
      "deleteModal"
    );
  }


  document
    .getElementById(
      "confirmDeleteBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        if (!pendingDeleteId) {
          return;
        }


        records =
          records.filter(
            item =>
              item.id !==
              pendingDeleteId
          );


        saveRecords();

        renderTable();

        updateSummary();


        pendingDeleteId =
          null;


        closeModal(
          "deleteModal"
        );


        showToast(
          "Promotion record deleted."
        );

      }
    );


  /* =======================================================
     FILTER EVENTS
  ======================================================= */

  document
    .getElementById(
      "searchInput"
    )
    ?.addEventListener(
      "input",
      renderTable
    );


  document
    .getElementById(
      "statusFilter"
    )
    ?.addEventListener(
      "change",
      renderTable
    );


  document
    .getElementById(
      "fromLevelFilter"
    )
    ?.addEventListener(
      "change",
      renderTable
    );


  /* =======================================================
     RESET FILTERS
  ======================================================= */

  document
    .getElementById(
      "resetFiltersBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        const searchInput =
          document.getElementById(
            "searchInput"
          );

        const statusFilter =
          document.getElementById(
            "statusFilter"
          );

        const fromLevelFilter =
          document.getElementById(
            "fromLevelFilter"
          );


        if (searchInput) {
          searchInput.value = "";
        }


        if (statusFilter) {
          statusFilter.value = "all";
        }


        if (fromLevelFilter) {
          fromLevelFilter.value = "all";
        }


        renderTable();

        renderEmptyProgress();

      }
    );


  /* =======================================================
     REFRESH
  ======================================================= */

  document
    .getElementById(
      "refreshBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        records =
          loadRecords();

        renderTable();

        updateSummary();

        showToast(
          "Promotion data refreshed."
        );

      }
    );


  /* =======================================================
     INITIALIZE
  ======================================================= */

  if (promotionDate) {

    promotionDate.value =
      today();

  }


  renderTable();

  updateSummary();


  console.log(
    "Lumenix Student Promotion & Progress System loaded."
  );

});
