/* =========================================================
   LUMENIX
   Student Document & ID Card System
   Lightweight LocalStorage Module
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     STORAGE
     ======================================================= */

  const STORAGE_KEY =
    "lumenix_student_documents";


  let records = loadRecords();

  let pendingDeleteId = null;


  function loadRecords() {

    try {

      const data =
        localStorage.getItem(
          STORAGE_KEY
        );

      return data
        ? JSON.parse(data)
        : [];

    } catch (error) {

      console.error(
        "Student document data could not be loaded.",
        error
      );

      return [];

    }
  }


  function saveRecords() {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records)
    );

  }


  /* =======================================================
     HELPERS
     ======================================================= */

  function generateId() {

    return (
      "DOC-" +
      Date.now()
        .toString(36)
        .toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()
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


  function getInitial(name) {

    const text =
      String(name || "S")
        .trim();

    return (
      text.charAt(0)
        .toUpperCase() || "S"
    );

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

    clearTimeout(toastTimer);

    toast.textContent =
      message;

    toast.className =
      "toast show " + type;

    toastTimer =
      setTimeout(() => {

        toast.className =
          "toast";

      }, 2500);

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

    modal.classList.add(
      "active"
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
    .forEach(button => {

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
    .forEach(overlay => {

      overlay.addEventListener(
        "click",
        event => {

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
    event => {

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
      "documentForm"
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

  const phone =
    document.getElementById(
      "phone"
    );

  const bloodGroup =
    document.getElementById(
      "bloodGroup"
    );

  const cardStatus =
    document.getElementById(
      "cardStatus"
    );

  const address =
    document.getElementById(
      "address"
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

    cardStatus.value =
      "Pending";

    document.getElementById(
      "modalTitle"
    ).textContent =
      "Add Student Document";

  }


  /* =======================================================
     ADD STUDENT
     ======================================================= */

  document
    .getElementById(
      "addDocumentBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        resetForm();

        openModal(
          "documentModal"
        );

      }
    );


  /* =======================================================
     SAVE STUDENT
     ======================================================= */

  form?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        studentName.value.trim();

      const id =
        studentId.value.trim();

      const course =
        courseName.value.trim();

      const phoneValue =
        phone.value.trim();

      const blood =
        bloodGroup.value;

      const status =
        cardStatus.value;

      const addressValue =
        address.value.trim();


      if (
        !name ||
        !id ||
        !course
      ) {

        showToast(
          "Please complete the required fields.",
          "error"
        );

        return;

      }


      const editingId =
        recordId.value;


      if (editingId) {

        const index =
          records.findIndex(
            item =>
              item.id === editingId
          );


        if (index === -1) {
          return;
        }


        records[index] = {

          ...records[index],

          studentName: name,

          studentId: id,

          course: course,

          phone: phoneValue,

          bloodGroup: blood,

          cardStatus: status,

          address: addressValue,

          updatedAt:
            new Date().toISOString()

        };


        showToast(
          "Student information updated."
        );

      } else {

        records.unshift({

          id: generateId(),

          studentName: name,

          studentId: id,

          course: course,

          phone: phoneValue,

          bloodGroup: blood,

          cardStatus: status,

          address: addressValue,

          createdAt:
            new Date().toISOString()

        });


        showToast(
          "Student added successfully."
        );

      }


      saveRecords();

      renderTable();

      updateSummary();

      closeModal(
        "documentModal"
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
        "totalStudents"
      );

    const ready =
      document.getElementById(
        "readyCards"
      );

    const pending =
      document.getElementById(
        "pendingCards"
      );


    if (total) {

      total.textContent =
        records.length;

    }


    if (ready) {

      ready.textContent =
        records.filter(
          item =>
            item.cardStatus ===
            "Ready"
        ).length;

    }


    if (pending) {

      pending.textContent =
        records.filter(
          item =>
            item.cardStatus ===
            "Pending"
        ).length;

    }

  }


  /* =======================================================
     TABLE
     ======================================================= */

  const tableBody =
    document.getElementById(
      "documentTableBody"
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


    const filter =
      document.getElementById(
        "statusFilter"
      )?.value || "all";


    const filtered =
      records.filter(
        item => {

          const searchable = [

            item.studentName,

            item.studentId,

            item.course,

            item.phone

          ]
            .join(" ")
            .toLowerCase();


          const matchesSearch =
            !search ||
            searchable.includes(
              search
            );


          const matchesStatus =
            filter === "all" ||
            item.cardStatus === filter;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );


    if (!filtered.length) {

      tableBody.innerHTML = `

        <tr class="empty-row">

          <td colspan="6">
            No student documents found.
          </td>

        </tr>

      `;

      return;

    }


    tableBody.innerHTML =
      filtered
        .map(item => {

          const statusReady =
            item.cardStatus ===
            "Ready";


          return `

            <tr>

              <td>

                <span class="student-name">
                  ${escapeHTML(
                    item.studentName
                  )}
                </span>

                <span class="student-sub">
                  ${escapeHTML(
                    item.bloodGroup ||
                    "Blood group not set"
                  )}
                </span>

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
                  item.phone || "—"
                )}
              </td>


              <td>

                <span
                  class="
                    status-badge
                    ${
                      statusReady
                        ? "status-ready"
                        : "status-pending"
                    }
                  "
                >
                  ${escapeHTML(
                    item.cardStatus
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
                    ID Card
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

        })
        .join("");

  }


  /* =======================================================
     TABLE ACTIONS
     ======================================================= */

  tableBody?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-action]"
        );


      if (!button) {
        return;
      }


      const id =
        button.dataset.id;

      const action =
        button.dataset.action;


      if (action === "view") {

        viewCard(id);

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
     VIEW ID CARD
     ======================================================= */

  function viewCard(id) {

    const record =
      records.find(
        item =>
          item.id === id
      );


    if (!record) {
      return;
    }


    document.getElementById(
      "cardInitial"
    ).textContent =
      getInitial(
        record.studentName
      );


    document.getElementById(
      "cardStudentName"
    ).textContent =
      record.studentName;


    document.getElementById(
      "cardStudentId"
    ).textContent =
      record.studentId;


    document.getElementById(
      "cardCourse"
    ).textContent =
      record.course;


    document.getElementById(
      "cardPhone"
    ).textContent =
      record.phone || "—";


    document.getElementById(
      "cardBlood"
    ).textContent =
      record.bloodGroup || "—";


    document.getElementById(
      "cardStatus"
    ).textContent =
      String(
        record.cardStatus
      ).toUpperCase();


    openModal(
      "cardModal"
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
      record.studentName;

    studentId.value =
      record.studentId;

    courseName.value =
      record.course;

    phone.value =
      record.phone || "";

    bloodGroup.value =
      record.bloodGroup || "";

    cardStatus.value =
      record.cardStatus ||
      "Pending";

    address.value =
      record.address || "";


    document.getElementById(
      "modalTitle"
    ).textContent =
      "Edit Student Document";


    openModal(
      "documentModal"
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
          "Student document deleted."
        );

      }
    );


  /* =======================================================
     SEARCH & FILTER
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
     PRINT ID CARD
     ======================================================= */

  document
    .getElementById(
      "printCardBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        window.print();

      }
    );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  renderTable();

  updateSummary();


  console.log(
    "Lumenix Student Document System loaded."
  );

});
