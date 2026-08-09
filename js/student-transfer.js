/* =========================================================
   MS FARDIN ELECTRIC ECOSYSTEM
   Student Transfer & Withdrawal System
   Lightweight LocalStorage Module
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     STORAGE
     ======================================================= */

  const STORAGE_KEY =
    "ms_fardin_student_transfer_withdrawal_records";


  let records = loadRecords();

  let pendingDeleteId = null;


  function loadRecords() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) {
        return [];
      }

      const data =
        JSON.parse(saved);

      return Array.isArray(data)
        ? data
        : [];

    } catch (error) {

      console.error(
        "Unable to load student records:",
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

      return true;

    } catch (error) {

      console.error(
        "Unable to save student records:",
        error
      );

      showToast(
        "Unable to save data.",
        "error"
      );

      return false;
    }
  }


  /* =======================================================
     HELPERS
     ======================================================= */

  function generateId() {

    return (
      "SWR-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()
    );
  }


  function getToday() {

    const date =
      new Date();

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return (
      `${year}-${month}-${day}`
    );
  }


  function escapeHTML(value) {

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


  function formatDate(value) {

    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
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


  function getStatusClass(status) {

    switch (status) {

      case "Approved":
        return "status-approved";

      case "Completed":
        return "status-completed";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-pending";
    }
  }


  function getTypeClass(type) {

    return type === "Withdrawal"
      ? "type-withdrawal"
      : "type-transfer";
  }


  /* =======================================================
     TOAST
     ======================================================= */

  const toast =
    document.getElementById(
      "toast"
    );

  let toastTimer;


  function showToast(
    message,
    type = "success"
  ) {

    if (!toast) {
      return;
    }

    clearTimeout(
      toastTimer
    );

    toast.textContent =
      message;

    toast.className =
      `toast show ${type}`;

    toastTimer =
      setTimeout(
        () => {

          toast.className =
            "toast";

        },
        2600
      );
  }


  /* =======================================================
     MODAL
     ======================================================= */

  function openModal(id) {

    const modal =
      document.getElementById(id);

    if (!modal) {
      return;
    }

    modal.classList.add(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";
  }


  function closeModal(id) {

    const modal =
      document.getElementById(id);

    if (!modal) {
      return;
    }

    modal.classList.remove(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

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
    .querySelectorAll(
      "[data-close]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            closeModal(
              button.dataset.close
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".modal-overlay"
    )
    .forEach(
      (overlay) => {

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

      }
    );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }

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
  );


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const form =
    document.getElementById(
      "recordForm"
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

  const recordType =
    document.getElementById(
      "recordType"
    );

  const fromLocation =
    document.getElementById(
      "fromLocation"
    );

  const toLocation =
    document.getElementById(
      "toLocation"
    );

  const effectiveDate =
    document.getElementById(
      "effectiveDate"
    );

  const recordStatus =
    document.getElementById(
      "recordStatus"
    );

  const reason =
    document.getElementById(
      "reason"
    );

  const remarks =
    document.getElementById(
      "remarks"
    );


  /* =======================================================
     FORM RESET
     ======================================================= */

  function resetForm() {

    if (!form) {
      return;
    }

    form.reset();

    recordId.value =
      "";

    effectiveDate.value =
      getToday();

    recordStatus.value =
      "Pending";

    document.getElementById(
      "modalTitle"
    ).textContent =
      "Add Student Record";
  }


  /* =======================================================
     ADD RECORD
     ======================================================= */

  document
    .getElementById(
      "addRecordBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        resetForm();

        openModal(
          "recordModal"
        );

      }
    );


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

      const type =
        recordType.value;

      const from =
        fromLocation.value.trim();

      const to =
        toLocation.value.trim();

      const date =
        effectiveDate.value ||
        getToday();

      const status =
        recordStatus.value;

      const reasonText =
        reason.value.trim();

      const remarksText =
        remarks.value.trim();


      /* -----------------------------------------------
         REQUIRED VALIDATION
         ----------------------------------------------- */

      if (
        !name ||
        !id ||
        !course ||
        !type ||
        !date ||
        !status ||
        !reasonText
      ) {

        showToast(
          "Please complete all required fields.",
          "error"
        );

        return;
      }


      /* -----------------------------------------------
         TRANSFER VALIDATION
         ----------------------------------------------- */

      if (
        type === "Transfer" &&
        !to
      ) {

        showToast(
          "Please enter the transfer destination.",
          "error"
        );

        return;
      }


      const existingId =
        recordId.value;


      /* -----------------------------------------------
         UPDATE
         ----------------------------------------------- */

      if (existingId) {

        const index =
          records.findIndex(
            item =>
              item.id ===
              existingId
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

          studentName:
            name,

          studentId:
            id,

          course:
            course,

          type:
            type,

          from:
            from,

          to:
            to,

          effectiveDate:
            date,

          status:
            status,

          reason:
            reasonText,

          remarks:
            remarksText,

          updatedAt:
            new Date()
              .toISOString()

        };


        saveRecords();

        showToast(
          "Student record updated successfully."
        );

      }


      /* -----------------------------------------------
         CREATE
         ----------------------------------------------- */

      else {

        const newRecord = {

          id:
            generateId(),

          studentName:
            name,

          studentId:
            id,

          course:
            course,

          type:
            type,

          from:
            from,

          to:
            to,

          effectiveDate:
            date,

          status:
            status,

          reason:
            reasonText,

          remarks:
            remarksText,

          createdAt:
            new Date()
              .toISOString()

        };


        records.unshift(
          newRecord
        );


        saveRecords();

        showToast(
          "Student record created successfully."
        );

      }


      renderTable();

      updateSummary();

      closeModal(
        "recordModal"
      );

      resetForm();

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

    const transfers =
      document.getElementById(
        "totalTransfers"
      );

    const withdrawals =
      document.getElementById(
        "totalWithdrawals"
      );

    const pending =
      document.getElementById(
        "totalPending"
      );


    if (total) {

      total.textContent =
        records.length;

    }


    if (transfers) {

      transfers.textContent =
        records.filter(
          item =>
            item.type === "Transfer"
        ).length;

    }


    if (withdrawals) {

      withdrawals.textContent =
        records.filter(
          item =>
            item.type === "Withdrawal"
        ).length;

    }


    if (pending) {

      pending.textContent =
        records.filter(
          item =>
            item.status === "Pending"
        ).length;

    }
  }


  /* =======================================================
     FILTERED RECORDS
     ======================================================= */

  function getFilteredRecords() {

    const search =
      document.getElementById(
        "searchInput"
      )?.value
        .trim()
        .toLowerCase() || "";


    const type =
      document.getElementById(
        "typeFilter"
      )?.value ||
      "all";


    const status =
      document.getElementById(
        "statusFilter"
      )?.value ||
      "all";


    return records.filter(
      (item) => {

        const searchable = [

          item.studentName,

          item.studentId,

          item.course,

          item.from,

          item.to,

          item.reason

        ]
          .join(" ")
          .toLowerCase();


        const matchesSearch =
          !search ||
          searchable.includes(
            search
          );


        const matchesType =
          type === "all" ||
          item.type === type;


        const matchesStatus =
          status === "all" ||
          item.status === status;


        return (
          matchesSearch &&
          matchesType &&
          matchesStatus
        );

      }
    );
  }


  /* =======================================================
     RENDER TABLE
     ======================================================= */

  const tableBody =
    document.getElementById(
      "recordsTableBody"
    );


  function renderTable() {

    if (!tableBody) {
      return;
    }


    const filtered =
      getFilteredRecords();


    if (!filtered.length) {

      tableBody.innerHTML = `

        <tr class="empty-row">

          <td colspan="8">
            No records found.
          </td>

        </tr>

      `;

      return;
    }


    tableBody.innerHTML =
      filtered
        .map(
          (item) => {

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

                  <span
                    class="badge ${getTypeClass(
                      item.type
                    )}"
                  >
                    ${escapeHTML(
                      item.type
                    )}
                  </span>

                </td>


                <td>
                  ${escapeHTML(
                    item.from || "—"
                  )}
                </td>


                <td>
                  ${escapeHTML(
                    item.to || "—"
                  )}
                </td>


                <td>
                  ${formatDate(
                    item.effectiveDate
                  )}
                </td>


                <td>

                  <span
                    class="badge ${getStatusClass(
                      item.status
                    )}"
                  >
                    ${escapeHTML(
                      item.status
                    )}
                  </span>

                </td>


                <td>

                  <div class="action-buttons">

                    <button
                      type="button"
                      class="action-btn view"
                      data-action="view"
                      data-id="${item.id}"
                    >
                      View
                    </button>


                    <button
                      type="button"
                      class="action-btn edit"
                      data-action="edit"
                      data-id="${item.id}"
                    >
                      Edit
                    </button>


                    <button
                      type="button"
                      class="action-btn delete"
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
        item =>
          item.id === id
      );


    if (!record) {
      return;
    }


    const container =
      document.getElementById(
        "viewContent"
      );


    if (!container) {
      return;
    }


    container.innerHTML = `

      <div class="detail-grid">

        <div class="detail-item">

          <span>
            Student Name
          </span>

          <strong>
            ${escapeHTML(
              record.studentName
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Student ID
          </span>

          <strong>
            ${escapeHTML(
              record.studentId
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Course
          </span>

          <strong>
            ${escapeHTML(
              record.course
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Type
          </span>

          <strong>
            ${escapeHTML(
              record.type
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            From
          </span>

          <strong>
            ${escapeHTML(
              record.from || "—"
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            To
          </span>

          <strong>
            ${escapeHTML(
              record.to || "—"
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Effective Date
          </span>

          <strong>
            ${formatDate(
              record.effectiveDate
            )}
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Status
          </span>

          <strong>
            ${escapeHTML(
              record.status
            )}
          </strong>

        </div>


        <div class="detail-item full">

          <span>
            Reason
          </span>

          <strong>
            ${escapeHTML(
              record.reason
            )}
          </strong>

        </div>


        ${
          record.remarks
            ? `

              <div class="detail-item full">

                <span>
                  Remarks
                </span>

                <strong>
                  ${escapeHTML(
                    record.remarks
                  )}
                </strong>

              </div>

            `
            : ""
        }

      </div>

    `;


    openModal(
      "viewModal"
    );
  }


  /* =======================================================
     EDIT
     ======================================================= */

  function editRecord(id) {

    const record =
      records.find(
        item =>
          item.id === id
      );


    if (!record) {
      return;
    }


    recordId.value =
      record.id;

    studentName.value =
      record.studentName || "";

    studentId.value =
      record.studentId || "";

    courseName.value =
      record.course || "";

    recordType.value =
      record.type || "";

    fromLocation.value =
      record.from || "";

    toLocation.value =
      record.to || "";

    effectiveDate.value =
      record.effectiveDate ||
      getToday();

    recordStatus.value =
      record.status ||
      "Pending";

    reason.value =
      record.reason || "";

    remarks.value =
      record.remarks || "";


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Edit Student Record";


    openModal(
      "recordModal"
    );
  }


  /* =======================================================
     DELETE
     ======================================================= */

  function askDelete(id) {

    const record =
      records.find(
        item =>
          item.id === id
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
          "Student record deleted."
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
      "typeFilter"
    )
    ?.addEventListener(
      "change",
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

        const typeFilter =
          document.getElementById(
            "typeFilter"
          );

        const statusFilter =
          document.getElementById(
            "statusFilter"
          );


        if (searchInput) {
          searchInput.value =
            "";
        }


        if (typeFilter) {
          typeFilter.value =
            "all";
        }


        if (statusFilter) {
          statusFilter.value =
            "all";
        }


        renderTable();

        showToast(
          "Filters reset."
        );

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
          "Student data refreshed."
        );

      }
    );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  if (effectiveDate) {

    effectiveDate.value =
      getToday();

  }


  renderTable();

  updateSummary();


  console.log(
    "MS Fardin Student Transfer & Withdrawal System loaded."
  );

});
