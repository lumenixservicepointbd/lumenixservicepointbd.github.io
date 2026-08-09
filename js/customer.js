/* =========================================================
   LUMENIX V5.1
   CUSTOMER SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const STORAGE = {
    customers: "lumenix_service_customers",
    bookings: "lumenix_service_bookings"
  };


  let customers = JSON.parse(
    localStorage.getItem(STORAGE.customers) || "[]"
  );

  let bookings = JSON.parse(
    localStorage.getItem(STORAGE.bookings) || "[]"
  );


  const $ = id => document.getElementById(id);


  /* =====================================================
     HELPERS
     ===================================================== */

  function saveCustomers() {

    localStorage.setItem(
      STORAGE.customers,
      JSON.stringify(customers)
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


  function today() {

    return new Date()
      .toISOString()
      .split("T")[0];

  }


  function generateCustomerID() {

    const number =
      String(customers.length + 1)
        .padStart(5, "0");

    return `LSP-C-${number}`;

  }


  function toast(message) {

    const element = $("toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {

      element.classList.remove("show");

    }, 2500);

  }


  function openModal(id) {

    $(id).classList.add("show");

  }


  function closeModal(id) {

    $(id).classList.remove("show");

  }


  /* =====================================================
     MODAL EVENTS
     ===================================================== */

  $("addCustomerBtn").addEventListener(
    "click",
    () => openModal("customerModal")
  );


  document
    .querySelectorAll("[data-close]")
    .forEach(button => {

      button.addEventListener("click", () => {

        closeModal(
          button.dataset.close
        );

      });

    });


  document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

      overlay.addEventListener("click", event => {

        if (event.target === overlay) {

          overlay.classList.remove("show");

        }

      });

    });


  /* =====================================================
     REGISTER CUSTOMER
     ===================================================== */

  $("customerForm")
    .addEventListener("submit", event => {

      event.preventDefault();


      const mobile =
        $("customerMobile")
          .value
          .trim();


      /*
       Prevent duplicate mobile registration.
      */

      const duplicate =
        customers.find(
          customer =>
            customer.mobile === mobile
        );


      if (duplicate) {

        toast(
          `This mobile number is already registered as ${duplicate.id}.`
        );

        return;

      }


      const customer = {

        id:
          generateCustomerID(),

        name:
          $("customerName")
            .value
            .trim(),

        mobile,

        altMobile:
          $("customerAltMobile")
            .value
            .trim(),

        type:
          $("customerType").value,

        businessName:
          $("businessName")
            .value
            .trim(),

        division:
          $("customerDivision")
            .value
            .trim(),

        district:
          $("customerDistrict")
            .value
            .trim(),

        area:
          $("customerArea")
            .value
            .trim(),

        address:
          $("customerAddress")
            .value
            .trim(),

        registrationDate:
          today(),

        status:
          "Active"

      };


      customers.push(customer);

      saveCustomers();

      event.target.reset();

      closeModal("customerModal");

      renderAll();

      toast(
        `${customer.id} registered successfully.`
      );

    });


  /* =====================================================
     SUMMARY
     ===================================================== */

  function renderSummary() {

    $("totalCustomers").textContent =
      customers.length;


    $("activeCustomers").textContent =
      customers.filter(
        customer =>
          customer.status === "Active"
      ).length;


    const serviceCustomerIDs =
      new Set(
        bookings.map(
          booking =>
            booking.customerId
        )
      );


    $("serviceCustomers").textContent =
      customers.filter(
        customer =>
          serviceCustomerIDs.has(
            customer.id
          )
      ).length;


    const currentMonth =
      new Date()
        .toISOString()
        .slice(0, 7);


    $("newCustomers").textContent =
      customers.filter(
        customer =>
          customer.registrationDate
            ?.startsWith(currentMonth)
      ).length;

  }


  /* =====================================================
     CUSTOMER TABLE
     ===================================================== */

  function renderCustomers() {

    const tbody =
      $("customerTableBody");


    const search =
      $("customerSearch")
        .value
        .trim()
        .toLowerCase();


    const type =
      $("customerTypeFilter").value;


    const status =
      $("customerStatusFilter").value;


    const list =
      customers.filter(customer => {

        const searchable = [

          customer.id,
          customer.name,
          customer.mobile,
          customer.businessName,
          customer.area,
          customer.district

        ]
          .join(" ")
          .toLowerCase();


        const searchMatch =
          !search ||
          searchable.includes(search);


        const typeMatch =
          type === "all" ||
          customer.type === type;


        const statusMatch =
          status === "all" ||
          customer.status === status;


        return (
          searchMatch &&
          typeMatch &&
          statusMatch
        );

      });


    tbody.innerHTML = "";


    if (!list.length) {

      tbody.innerHTML = `
        <tr>
          <td colspan="8"
              style="text-align:center;padding:35px;">
            No customers found.
          </td>
        </tr>
      `;

      return;

    }


    list
      .slice()
      .reverse()
      .forEach(customer => {

        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            <strong>
              ${escapeHTML(customer.id)}
            </strong>
          </td>

          <td>

            <strong>
              ${escapeHTML(customer.name)}
            </strong>

            ${
              customer.businessName
                ? `<br><small>
                    ${escapeHTML(customer.businessName)}
                   </small>`
                : ""
            }

          </td>

          <td>
            ${escapeHTML(customer.mobile)}
          </td>

          <td>
            ${escapeHTML(customer.type)}
          </td>

          <td>
            ${escapeHTML(
              customer.area || "-"
            )}
          </td>

          <td>
            ${escapeHTML(
              customer.registrationDate
            )}
          </td>

          <td>

            <span class="status ${
              customer.status === "Active"
                ? "active"
                : "inactive"
            }">

              ${escapeHTML(customer.status)}

            </span>

          </td>

          <td>

            <button
              class="view-btn"
              data-profile="${escapeHTML(customer.id)}">

              View Profile

            </button>

          </td>

        `;


        tbody.appendChild(row);

      });


    document
      .querySelectorAll("[data-profile]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            showProfile(
              button.dataset.profile
            );

          }
        );

      });

  }


  /* =====================================================
     CUSTOMER PROFILE
     ===================================================== */

  function showProfile(customerID) {

    const customer =
      customers.find(
        item =>
          item.id === customerID
      );


    if (!customer) return;


    $("profileName").textContent =
      customer.name;


    $("profileCustomerName").textContent =
      customer.name;


    $("profileCustomerId").textContent =
      customer.id;


    $("profileAvatar").textContent =
      customer.name
        .charAt(0)
        .toUpperCase();


    $("profileMobile").textContent =
      customer.mobile || "-";


    $("profileAltMobile").textContent =
      customer.altMobile || "-";


    $("profileType").textContent =
      customer.type || "-";


    $("profileBusiness").textContent =
      customer.businessName || "-";


    $("profileDivision").textContent =
      customer.division || "-";


    $("profileDistrict").textContent =
      customer.district || "-";


    $("profileArea").textContent =
      customer.area || "-";


    $("profileRegistration").textContent =
      customer.registrationDate || "-";


    $("profileAddress").textContent =
      customer.address || "-";


    const statusElement =
      $("profileStatus");


    statusElement.textContent =
      customer.status;


    statusElement.className =
      `profile-status ${
        customer.status === "Active"
          ? ""
          : "inactive"
      }`;


    renderCustomerHistory(
      customerID
    );


    openModal("profileModal");

  }


  /* =====================================================
     CUSTOMER SERVICE HISTORY
     ===================================================== */

  function renderCustomerHistory(customerID) {

    const history =
      bookings.filter(
        booking =>
          booking.customerId === customerID
      );


    $("historyCount").textContent =
      `${history.length} booking${
        history.length === 1 ? "" : "s"
      }`;


    const tbody =
      $("historyTableBody");


    tbody.innerHTML = "";


    if (!history.length) {

      tbody.innerHTML = `
        <tr>
          <td colspan="5"
              style="text-align:center;padding:25px;">
            No service history available.
          </td>
        </tr>
      `;

      return;

    }


    history
      .slice()
      .reverse()
      .forEach(booking => {

        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            <strong>
              ${escapeHTML(booking.id)}
            </strong>
          </td>

          <td>
            ${escapeHTML(booking.service)}
          </td>

          <td>
            ${escapeHTML(booking.date)}
          </td>

          <td>
            ${escapeHTML(
              booking.technician ||
              "Not Assigned"
            )}
          </td>

          <td>

            <span class="status ${
              getStatusClass(booking.status)
            }">

              ${escapeHTML(
                booking.status
              )}

            </span>

          </td>

        `;


        tbody.appendChild(row);

      });

  }


  /* =====================================================
     BOOKING STATUS CLASS
     ===================================================== */

  function getStatusClass(status) {

    const map = {

      "Pending": "pending",
      "Confirmed": "confirmed",
      "Assigned": "assigned",
      "In Progress": "progress",
      "Completed": "completed",
      "Cancelled": "cancelled"

    };

    return map[status] || "pending";

  }


  /* =====================================================
     FILTERS
     ===================================================== */

  $("customerSearch")
    .addEventListener(
      "input",
      renderCustomers
    );


  $("customerTypeFilter")
    .addEventListener(
      "change",
      renderCustomers
    );


  $("customerStatusFilter")
    .addEventListener(
      "change",
      renderCustomers
    );


  /* =====================================================
     INITIALIZE
     ===================================================== */

  function renderAll() {

    /*
      Refresh booking data so that service history
      created by Service Point BD is visible.
    */

    bookings = JSON.parse(
      localStorage.getItem(
        STORAGE.bookings
      ) || "[]"
    );


    renderSummary();

    renderCustomers();

  }


  renderAll();

});
