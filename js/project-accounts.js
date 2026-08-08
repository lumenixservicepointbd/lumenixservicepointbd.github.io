/* =========================================================
   LUMENIX V5.1
   PROJECT ACCOUNTS MODULE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const STORAGE = {
    projects: "lumenix_projects",
    transactions: "lumenix_project_transactions",
    payments: "lumenix_project_payments"
  };

  let projects = JSON.parse(
    localStorage.getItem(STORAGE.projects) || "[]"
  );

  let transactions = JSON.parse(
    localStorage.getItem(STORAGE.transactions) || "[]"
  );

  let payments = JSON.parse(
    localStorage.getItem(STORAGE.payments) || "[]"
  );


  /* -------------------------------------------------------
     HELPERS
  ------------------------------------------------------- */

  const $ = id => document.getElementById(id);

  function saveData() {

    localStorage.setItem(
      STORAGE.projects,
      JSON.stringify(projects)
    );

    localStorage.setItem(
      STORAGE.transactions,
      JSON.stringify(transactions)
    );

    localStorage.setItem(
      STORAGE.payments,
      JSON.stringify(payments)
    );

  }


  function today() {
    return new Date().toISOString().split("T")[0];
  }


  function money(value) {

    return "৳" +
      Number(value || 0).toLocaleString("en-BD");

  }


  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function toast(message) {

    const element = $("toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {
      element.classList.remove("show");
    }, 2500);

  }


  /* -------------------------------------------------------
     DEMO PROJECT DATA
  ------------------------------------------------------- */

  if (projects.length === 0) {

    projects = [
      {
        id: "PRJ-00001",
        name: "Project A",
        customer: "Customer A",
        value: 500000,
        status: "Active"
      },
      {
        id: "PRJ-00002",
        name: "Project B",
        customer: "Customer B",
        value: 750000,
        status: "Active"
      },
      {
        id: "PRJ-00003",
        name: "Project C",
        customer: "Customer C",
        value: 350000,
        status: "Completed"
      }
    ];

    saveData();

  }


  /* -------------------------------------------------------
     PROJECT SELECTOR
  ------------------------------------------------------- */

  function populateProjects() {

    const select = $("projectSelect");

    const previous = select.value;

    select.innerHTML = "";

    projects.forEach(project => {

      const option =
        document.createElement("option");

      option.value = project.id;

      option.textContent =
        `${project.name} — ${project.customer}`;

      select.appendChild(option);

    });

    if (
      projects.some(project => project.id === previous)
    ) {

      select.value = previous;

    }

  }


  function getSelectedProject() {

    return projects.find(
      project =>
        project.id === $("projectSelect").value
    );

  }


  $("projectSelect").addEventListener(
    "change",
    renderAll
  );


  /* -------------------------------------------------------
     TRANSACTION MODAL
  ------------------------------------------------------- */

  function openModal(id) {

    $(id).classList.add("show");

  }


  function closeModal(id) {

    $(id).classList.remove("show");

  }


  $("openTransactionModal").addEventListener(
    "click",
    () => {

      $("transactionDate").value = today();

      openModal("transactionModal");

    }
  );


  $("openPaymentModal").addEventListener(
    "click",
    () => {

      $("paymentDate").value = today();

      openModal("paymentModal");

    }
  );


  document.querySelectorAll("[data-close]")
    .forEach(button => {

      button.addEventListener("click", () => {

        closeModal(
          button.dataset.close
        );

      });

    });


  document.querySelectorAll(".modal-overlay")
    .forEach(overlay => {

      overlay.addEventListener("click", event => {

        if (event.target === overlay) {

          overlay.classList.remove("show");

        }

      });

    });


  /* -------------------------------------------------------
     TRANSACTION FORM
  ------------------------------------------------------- */

  $("transactionForm").addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const project =
        getSelectedProject();

      if (!project) {

        toast("Please select a project.");

        return;

      }


      const transaction = {

        id:
          "TRX-" +
          Date.now(),

        projectId:
          project.id,

        type:
          $("transactionType").value,

        category:
          $("transactionCategory").value,

        date:
          $("transactionDate").value,

        amount:
          Number(
            $("transactionAmount").value || 0
          ),

        description:
          $("transactionDescription")
            .value
            .trim(),

        reference:
          $("transactionReference")
            .value
            .trim(),

        status:
          "Recorded"

      };


      transactions.push(transaction);

      saveData();

      event.target.reset();

      closeModal("transactionModal");

      renderAll();

      toast("Transaction saved successfully.");

    }
  );


  /* -------------------------------------------------------
     PAYMENT FORM
  ------------------------------------------------------- */

  $("paymentForm").addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const project =
        getSelectedProject();

      if (!project) {

        toast("Please select a project.");

        return;

      }


      const payment = {

        id:
          "PAY-" +
          Date.now(),

        projectId:
          project.id,

        customer:
          $("paymentCustomer")
            .value
            .trim(),

        method:
          $("paymentMethod").value,

        date:
          $("paymentDate").value,

        amount:
          Number(
            $("paymentAmount").value || 0
          ),

        reference:
          $("paymentReference")
            .value
            .trim(),

        status:
          "Received"

      };


      payments.push(payment);

      saveData();

      event.target.reset();

      closeModal("paymentModal");

      renderAll();

      toast("Payment recorded successfully.");

    }
  );


  /* -------------------------------------------------------
     PROJECT SUMMARY
  ------------------------------------------------------- */

  function renderSummary() {

    const project =
      getSelectedProject();

    if (!project) return;


    const projectTransactions =
      transactions.filter(
        item =>
          item.projectId === project.id
      );


    const projectPayments =
      payments.filter(
        item =>
          item.projectId === project.id
      );


    let income = 0;
    let expense = 0;

    let material = 0;
    let labour = 0;
    let other = 0;


    projectTransactions.forEach(item => {

      const amount =
        Number(item.amount || 0);


      if (item.type === "income") {

        income += amount;

      }


      if (item.type === "expense") {

        expense += amount;


        if (item.category === "Material") {

          material += amount;

        }

        else if (item.category === "Labour") {

          labour += amount;

        }

        else {

          other += amount;

        }

      }

    });


    const collected =
      projectPayments.reduce(
        (sum, item) =>
          sum + Number(item.amount || 0),
        0
      );


    /*
      Payment collection is also treated
      as project income for balance calculation.
    */

    const totalIncome =
      income + collected;

    const balance =
      totalIncome - expense;

    const profit =
      totalIncome - expense;


    $("projectStatus").textContent =
      project.status;

    $("projectValue").textContent =
      money(project.value);

    $("totalIncome").textContent =
      money(totalIncome);

    $("totalExpense").textContent =
      money(expense);

    $("currentBalance").textContent =
      money(balance);

    $("profitLoss").textContent =
      money(profit);

    $("materialCost").textContent =
      money(material);

    $("labourCost").textContent =
      money(labour);

    $("otherExpense").textContent =
      money(other);

    $("paymentCollected").textContent =
      money(collected);

  }


  /* -------------------------------------------------------
     TRANSACTION TABLE
  ------------------------------------------------------- */

  function renderTransactions() {

    const project =
      getSelectedProject();

    const tbody =
      $("transactionTableBody");

    if (!project) return;


    const typeFilter =
      $("transactionTypeFilter").value;

    const categoryFilter =
      $("expenseCategoryFilter").value;


    let list =
      transactions.filter(
        item =>
          item.projectId === project.id
      );


    if (typeFilter !== "all") {

      list =
        list.filter(
          item =>
            item.type === typeFilter
        );

    }


    if (categoryFilter !== "all") {

      list =
        list.filter(
          item =>
            item.category === categoryFilter
        );

    }


    tbody.innerHTML = "";


    if (list.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="7"
              style="text-align:center;padding:30px;">
            No transactions found.
          </td>
        </tr>
      `;

      return;

    }


    list
      .slice()
      .reverse()
      .forEach(item => {

        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            ${escapeHTML(item.date)}
          </td>

          <td>
            <span class="status ${
              item.type === "income"
                ? "income"
                : "expense"
            }">
              ${escapeHTML(item.type)}
            </span>
          </td>

          <td>
            ${escapeHTML(item.category)}
          </td>

          <td>
            ${escapeHTML(
              item.description || "-"
            )}
          </td>

          <td>
            ${escapeHTML(
              item.reference || "-"
            )}
          </td>

          <td>
            <strong>
              ${money(item.amount)}
            </strong>
          </td>

          <td>
            ${escapeHTML(item.status)}
          </td>

        `;


        tbody.appendChild(row);

      });

  }


  /* -------------------------------------------------------
     PAYMENT TABLE
  ------------------------------------------------------- */

  function renderPayments() {

    const project =
      getSelectedProject();

    const tbody =
      $("paymentTableBody");

    if (!project) return;


    const list =
      payments.filter(
        item =>
          item.projectId === project.id
      );


    tbody.innerHTML = "";


    if (list.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="6"
              style="text-align:center;padding:30px;">
            No payment records found.
          </td>
        </tr>
      `;

      return;

    }


    list
      .slice()
      .reverse()
      .forEach(payment => {

        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            ${escapeHTML(payment.date)}
          </td>

          <td>
            ${escapeHTML(payment.customer)}
          </td>

          <td>
            ${escapeHTML(payment.method)}
          </td>

          <td>
            ${escapeHTML(
              payment.reference || "-"
            )}
          </td>

          <td>
            <strong>
              ${money(payment.amount)}
            </strong>
          </td>

          <td>
            <span class="status paid">
              ${escapeHTML(payment.status)}
            </span>
          </td>

        `;


        tbody.appendChild(row);

      });

  }


  /* -------------------------------------------------------
     FILTER EVENTS
  ------------------------------------------------------- */

  $("transactionTypeFilter")
    .addEventListener(
      "change",
      renderTransactions
    );


  $("expenseCategoryFilter")
    .addEventListener(
      "change",
      renderTransactions
    );


  /* -------------------------------------------------------
     RENDER ALL
  ------------------------------------------------------- */

  function renderAll() {

    renderSummary();

    renderTransactions();

    renderPayments();

  }


  /* -------------------------------------------------------
     INITIALIZE
  ------------------------------------------------------- */

  populateProjects();

  renderAll();

});
