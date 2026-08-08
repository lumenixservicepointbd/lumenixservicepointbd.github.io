/* =========================================================
   LUMENIX V5.1
   WORKER & ATTENDANCE MODULE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     STORAGE
  ------------------------------------------------------- */

  const STORAGE_KEYS = {
    workers: "lumenix_workers",
    attendance: "lumenix_worker_attendance",
    payments: "lumenix_worker_payments"
  };

  let workers = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.workers) || "[]"
  );

  let attendance = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.attendance) || "[]"
  );

  let payments = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.payments) || "[]"
  );


  /* -------------------------------------------------------
     HELPERS
  ------------------------------------------------------- */

  const $ = (id) => document.getElementById(id);

  function saveData() {
    localStorage.setItem(
      STORAGE_KEYS.workers,
      JSON.stringify(workers)
    );

    localStorage.setItem(
      STORAGE_KEYS.attendance,
      JSON.stringify(attendance)
    );

    localStorage.setItem(
      STORAGE_KEYS.payments,
      JSON.stringify(payments)
    );
  }

  function generateWorkerId() {
    return "LUM-W-" +
      String(workers.length + 1).padStart(5, "0");
  }

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  function money(value) {
    return "৳" + Number(value || 0).toLocaleString("en-BD");
  }

  function showToast(message) {
    const toast = $("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }


  /* -------------------------------------------------------
     DEMO DATA
  ------------------------------------------------------- */

  if (workers.length === 0) {

    workers = [
      {
        id: "LUM-W-00001",
        name: "Rahim Mistri",
        type: "Mistri",
        mobile: "01700000001",
        salary: 900,
        project: "Project A",
        status: "Active",
        address: ""
      },
      {
        id: "LUM-W-00002",
        name: "Karim Helper",
        type: "Helper",
        mobile: "01700000002",
        salary: 650,
        project: "Project A",
        status: "Active",
        address: ""
      }
    ];

    saveData();
  }


  /* -------------------------------------------------------
     MODAL
  ------------------------------------------------------- */

  function openModal(id) {
    $(id).classList.add("show");
  }

  function closeModal(id) {
    $(id).classList.remove("show");
  }

  $("openWorkerModal").addEventListener("click", () => {
    openModal("workerModal");
  });

  $("openPaymentModal").addEventListener("click", () => {

    populatePaymentWorkers();

    $("paymentDate").value = today();

    openModal("paymentModal");
  });

  document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {
      closeModal(button.dataset.close);
    });

  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {

    overlay.addEventListener("click", (event) => {

      if (event.target === overlay) {
        overlay.classList.remove("show");
      }

    });

  });


  /* -------------------------------------------------------
     TABS
  ------------------------------------------------------- */

  document.querySelectorAll(".tab-btn").forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".tab-btn")
        .forEach(btn => btn.classList.remove("active"));

      document.querySelectorAll(".tab-content")
        .forEach(section => section.classList.remove("active"));

      button.classList.add("active");

      $(button.dataset.tab).classList.add("active");

      if (button.dataset.tab === "attendance") {
        renderAttendance();
      }

      if (button.dataset.tab === "salary") {
        renderSalary();
      }

    });

  });


  /* -------------------------------------------------------
     WORKER FORM
  ------------------------------------------------------- */

  $("workerForm").addEventListener("submit", (event) => {

    event.preventDefault();

    const worker = {

      id: generateWorkerId(),

      name: $("workerName").value.trim(),

      type: $("workerType").value,

      mobile: $("workerMobile").value.trim(),

      salary: Number($("workerSalary").value || 0),

      project: $("workerProject").value,

      status: $("workerStatus").value,

      address: $("workerAddress").value.trim()

    };

    workers.push(worker);

    saveData();

    event.target.reset();

    closeModal("workerModal");

    renderWorkers();

    updateDashboard();

    populateProjectFilter();

    showToast("Worker successfully added.");

  });


  /* -------------------------------------------------------
     WORKER TABLE
  ------------------------------------------------------- */

  function renderWorkers() {

    const tbody = $("workerTableBody");

    const search = $("workerSearch")
      .value
      .toLowerCase()
      .trim();

    const typeFilter = $("workerTypeFilter").value;

    const filtered = workers.filter(worker => {

      const matchesSearch =
        worker.name.toLowerCase().includes(search) ||
        worker.id.toLowerCase().includes(search) ||
        worker.mobile.toLowerCase().includes(search);

      const matchesType =
        typeFilter === "all" ||
        worker.type === typeFilter;

      return matchesSearch && matchesType;
    });

    tbody.innerHTML = "";

    if (filtered.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;padding:30px;">
            No worker found.
          </td>
        </tr>
      `;

      return;
    }

    filtered.forEach(worker => {

      const row = document.createElement("tr");

      row.innerHTML = `

        <td>
          <strong>${worker.id}</strong>
        </td>

        <td>
          <strong>${escapeHTML(worker.name)}</strong>
        </td>

        <td>${escapeHTML(worker.type)}</td>

        <td>${escapeHTML(worker.mobile || "-")}</td>

        <td>${escapeHTML(worker.project)}</td>

        <td>
          <span class="status ${
            worker.status === "Active"
              ? "active"
              : "inactive"
          }">
            ${worker.status}
          </span>
        </td>

        <td>
          <button
            class="secondary-btn"
            data-worker-id="${worker.id}">
            View
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });

    tbody.querySelectorAll("[data-worker-id]")
      .forEach(button => {

        button.addEventListener("click", () => {

          const worker = workers.find(
            item => item.id === button.dataset.workerId
          );

          if (!worker) return;

          alert(
            `Worker ID: ${worker.id}\n` +
            `Name: ${worker.name}\n` +
            `Type: ${worker.type}\n` +
            `Mobile: ${worker.mobile}\n` +
            `Project: ${worker.project}\n` +
            `Daily Salary: ${money(worker.salary)}`
          );

        });

      });

  }


  $("workerSearch").addEventListener(
    "input",
    renderWorkers
  );

  $("workerTypeFilter").addEventListener(
    "change",
    renderWorkers
  );


  /* -------------------------------------------------------
     ATTENDANCE
  ------------------------------------------------------- */

  $("attendanceDate").value = today();

  function renderAttendance() {

    const tbody = $("attendanceTableBody");

    const selectedProject =
      $("attendanceProject").value;

    const date =
      $("attendanceDate").value || today();

    const filteredWorkers = workers.filter(worker => {

      if (selectedProject === "all") {
        return true;
      }

      return worker.project === selectedProject;
    });

    tbody.innerHTML = "";

    filteredWorkers.forEach(worker => {

      const record = attendance.find(item =>
        item.workerId === worker.id &&
        item.date === date
      );

      const currentStatus =
        record ? record.status : "Present";

      const row = document.createElement("tr");

      row.innerHTML = `

        <td>
          <strong>${escapeHTML(worker.name)}</strong>
          <small>${worker.id}</small>
        </td>

        <td>${escapeHTML(worker.type)}</td>

        <td>${escapeHTML(worker.project)}</td>

        <td>
          <label class="attendance-radio present">
            <input
              type="radio"
              name="attendance-${worker.id}"
              value="Present"
              ${currentStatus === "Present" ? "checked" : ""}
            >
          </label>
        </td>

        <td>
          <label class="attendance-radio absent">
            <input
              type="radio"
              name="attendance-${worker.id}"
              value="Absent"
              ${currentStatus === "Absent" ? "checked" : ""}
            >
          </label>
        </td>

        <td>
          <label class="attendance-radio leave">
            <input
              type="radio"
              name="attendance-${worker.id}"
              value="Leave"
              ${currentStatus === "Leave" ? "checked" : ""}
            >
          </label>
        </td>

        <td>
          <label class="attendance-radio late">
            <input
              type="radio"
              name="attendance-${worker.id}"
              value="Late"
              ${currentStatus === "Late" ? "checked" : ""}
            >
          </label>
        </td>
      `;

      tbody.appendChild(row);

    });

  }


  $("attendanceDate").addEventListener(
    "change",
    renderAttendance
  );

  $("attendanceProject").addEventListener(
    "change",
    renderAttendance
  );


  $("saveAttendance").addEventListener("click", () => {

    const date =
      $("attendanceDate").value || today();

    const project =
      $("attendanceProject").value;

    const filteredWorkers = workers.filter(worker => {

      if (project === "all") return true;

      return worker.project === project;
    });

    filteredWorkers.forEach(worker => {

      const selected =
        document.querySelector(
          `input[name="attendance-${worker.id}"]:checked`
        );

      if (!selected) return;

      const existingIndex = attendance.findIndex(item =>
        item.workerId === worker.id &&
        item.date === date
      );

      const record = {

        workerId: worker.id,

        date,

        status: selected.value,

        project: worker.project

      };

      if (existingIndex >= 0) {

        attendance[existingIndex] = record;

      } else {

        attendance.push(record);

      }

    });

    saveData();

    updateDashboard();

    showToast("Attendance saved successfully.");

  });


  /* -------------------------------------------------------
     SALARY
  ------------------------------------------------------- */

  function renderSalary() {

    const tbody = $("salaryTableBody");

    tbody.innerHTML = "";

    let totalSalary = 0;
    let totalPaid = 0;

    workers.forEach(worker => {

      const salary =
        Number(worker.salary || 0);

      const workerPayments =
        payments.filter(
          payment => payment.workerId === worker.id
        );

      const paid =
        workerPayments.reduce(
          (sum, payment) =>
            sum + Number(payment.amount || 0),
          0
        );

      const due =
        Math.max(salary - paid, 0);

      totalSalary += salary;
      totalPaid += paid;

      const lastPayment =
        workerPayments.length
          ? workerPayments[workerPayments.length - 1].date
          : "-";

      const row = document.createElement("tr");

      row.innerHTML = `

        <td>
          <strong>${escapeHTML(worker.name)}</strong>
        </td>

        <td>${escapeHTML(worker.project)}</td>

        <td>${money(salary)}</td>

        <td>${money(paid)}</td>

        <td>${money(due)}</td>

        <td>${lastPayment}</td>

        <td>
          <span class="status ${
            due > 0 ? "due" : "paid"
          }">
            ${due > 0 ? "Due" : "Paid"}
          </span>
        </td>
      `;

      tbody.appendChild(row);

    });

    const totalDue =
      Math.max(totalSalary - totalPaid, 0);

    $("totalSalary").textContent =
      money(totalSalary);

    $("totalPaid").textContent =
      money(totalPaid);

    $("totalDue").textContent =
      money(totalDue);

  }


  /* -------------------------------------------------------
     PAYMENT
  ------------------------------------------------------- */

  function populatePaymentWorkers() {

    const select = $("paymentWorker");

    select.innerHTML = `
      <option value="">Select Worker</option>
    `;

    workers.forEach(worker => {

      const option =
        document.createElement("option");

      option.value = worker.id;

      option.textContent =
        `${worker.name} (${worker.id})`;

      select.appendChild(option);

    });

  }


  $("paymentForm").addEventListener("submit", event => {

    event.preventDefault();

    const payment = {

      id:
        "PAY-" +
        Date.now(),

      workerId:
        $("paymentWorker").value,

      amount:
        Number($("paymentAmount").value),

      date:
        $("paymentDate").value,

      reference:
        $("paymentReference").value.trim()

    };

    payments.push(payment);

    saveData();

    event.target.reset();

    closeModal("paymentModal");

    renderSalary();

    updateDashboard();

    showToast("Payment recorded successfully.");

  });


  /* -------------------------------------------------------
     DASHBOARD
  ------------------------------------------------------- */

  function updateDashboard() {

    $("totalWorkers").textContent =
      workers.filter(
        worker => worker.status === "Active"
      ).length;

    const todayRecords =
      attendance.filter(
        record => record.date === today()
      );

    $("presentToday").textContent =
      todayRecords.filter(
        record =>
          record.status === "Present" ||
          record.status === "Late"
      ).length;

    $("leaveToday").textContent =
      todayRecords.filter(
        record => record.status === "Leave"
      ).length;

    let totalDue = 0;

    workers.forEach(worker => {

      const salary =
        Number(worker.salary || 0);

      const paid =
        payments
          .filter(
            payment =>
              payment.workerId === worker.id
          )
          .reduce(
            (sum, payment) =>
              sum + Number(payment.amount || 0),
            0
          );

      totalDue += Math.max(
        salary - paid,
        0
      );

    });

    $("pendingSalary").textContent =
      money(totalDue);

  }


  /* -------------------------------------------------------
     PROJECT FILTER
  ------------------------------------------------------- */

  function populateProjectFilter() {

    const select =
      $("attendanceProject");

    const current =
      select.value;

    const projects =
      [...new Set(
        workers
          .map(worker => worker.project)
          .filter(Boolean)
      )];

    select.innerHTML =
      `<option value="all">All Projects</option>`;

    projects.forEach(project => {

      const option =
        document.createElement("option");

      option.value = project;
      option.textContent = project;

      select.appendChild(option);

    });

    if (
      projects.includes(current)
    ) {
      select.value = current;
    }

  }


  /* -------------------------------------------------------
     SECURITY / OUTPUT ESCAPING
  ------------------------------------------------------- */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* -------------------------------------------------------
     INITIALIZE
  ------------------------------------------------------- */

  populateProjectFilter();

  renderWorkers();

  renderAttendance();

  renderSalary();

  updateDashboard();

});
