/* =========================================================
   LUMENIX V5.1
   SERVICE POINT BD
   Customer + Service Booking Module
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

  function saveData() {

    localStorage.setItem(
      STORAGE.customers,
      JSON.stringify(customers)
    );

    localStorage.setItem(
      STORAGE.bookings,
      JSON.stringify(bookings)
    );

  }


  function today() {

    return new Date()
      .toISOString()
      .split("T")[0];

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


  function generateID(prefix, collection) {

    const number =
      String(collection.length + 1)
        .padStart(5, "0");

    return `${prefix}-${number}`;

  }


  /* =====================================================
     DEMO DATA
     Only created when localStorage is empty.
     ===================================================== */

  if (customers.length === 0) {

    customers = [
      {
        id: "LSP-C-00001",
        name: "Demo Customer",
        mobile: "01700000000",
        altMobile: "",
        type: "Individual",
        division: "Dhaka",
        district: "Dhaka",
        area: "Demo Area",
        address: "Demo Address",
        registrationDate: today(),
        status: "Active"
      }
    ];

  }


  if (bookings.length === 0) {

    bookings = [
      {
        id: "LSP-B-00001",
        customerId: "LSP-C-00001",
        service: "Electrical",
        date: today(),
        time: "10:00",
        division: "Dhaka",
        district: "Dhaka",
        area: "Demo Area",
        address: "Demo Address",
        description: "Demo electrical service request.",
        technician: "Not Assigned",
        status: "Pending",
        termsAccepted: true,
        createdAt: new Date().toISOString()
      }
    ];

  }


  saveData();


  /* =====================================================
     MODALS
     ===================================================== */

  function openModal(id) {

    $(id).classList.add("show");

  }


  function closeModal(id) {

    $(id).classList.remove("show");

  }


  $("newCustomerBtn").addEventListener(
    "click",
    () => openModal("customerModal")
  );


  $("newBookingBtn").addEventListener(
    "click",
    () => {

      populateCustomerSelect();

      $("bookingDate").value = today();

      openModal("bookingModal");

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


  /* =====================================================
     CUSTOMER REGISTRATION
     ===================================================== */

  $("customerForm")
    .addEventListener("submit", event => {

      event.preventDefault();


      const customer = {

        id:
          generateID("LSP-C", customers),

        name:
          $("customerName")
            .value
            .trim(),

        mobile:
          $("customerMobile")
            .value
            .trim(),

        altMobile:
          $("customerAltMobile")
            .value
            .trim(),

        type:
          $("customerType").value,

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

      saveData();

      event.target.reset();

      closeModal("customerModal");

      renderAll();

      toast(
        `Customer ${customer.id} registered successfully.`
      );

    });


  /* =====================================================
     CUSTOMER SELECT
     ===================================================== */

  function populateCustomerSelect() {

    const select =
      $("bookingCustomer");

    select.innerHTML =
      `<option value="">Select Customer</option>`;


    customers.forEach(customer => {

      const option =
        document.createElement("option");

      option.value =
        customer.id;

      option.textContent =
        `${customer.name} — ${customer.mobile}`;

      select.appendChild(option);

    });

  }


  /* =====================================================
     AUTO FILL CUSTOMER LOCATION
     ===================================================== */

  $("bookingCustomer")
    .addEventListener("change", () => {

      const customer =
        customers.find(
          item =>
            item.id ===
            $("bookingCustomer").value
        );


      if (!customer) return;


      $("bookingDivision").value =
        customer.division || "";

      $("bookingDistrict").value =
        customer.district || "";

      $("bookingArea").value =
        customer.area || "";

      $("bookingAddress").value =
        customer.address || "";

    });


  /* =====================================================
     SERVICE CATEGORY QUICK SELECT
     ===================================================== */

  document.querySelectorAll(".service-box")
    .forEach(button => {

      button.addEventListener("click", () => {

        const service =
          button.dataset.service;

        $("bookingService").value =
          service;

        document
          .querySelectorAll(".service-box")
          .forEach(item =>
            item.classList.remove("active")
          );

        button.classList.add("active");

        openModal("bookingModal");

        $("bookingDate").value = today();

        populateCustomerSelect();

      });

    });


  /* =====================================================
     CREATE BOOKING
     ===================================================== */

  $("bookingForm")
    .addEventListener("submit", event => {

      event.preventDefault();


      const customerId =
        $("bookingCustomer").value;


      const customer =
        customers.find(
          item =>
            item.id === customerId
        );


      if (!customer) {

        toast("Please select a customer.");

        return;

      }


      if (!$("termsAccepted").checked) {

        toast(
          "Terms & Conditions acceptance is required."
        );

        return;

      }


      const booking = {

        id:
          generateID("LSP-B", bookings),

        customerId,

        service:
          $("bookingService").value,

        date:
          $("bookingDate").value,

        time:
          $("bookingTime").value,

        division:
          $("bookingDivision")
            .value
            .trim(),

        district:
          $("bookingDistrict")
            .value
            .trim(),

        area:
          $("bookingArea")
            .value
            .trim(),

        address:
          $("bookingAddress")
            .value
            .trim(),

        description:
          $("bookingDescription")
            .value
            .trim(),

        technician:
          "Not Assigned",

        status:
          "Pending",

        termsAccepted:
          true,

        agreementDate:
          new Date().toISOString(),

        createdAt:
          new Date().toISOString()

      };


      bookings.push(booking);

      saveData();

      event.target.reset();

      closeModal("bookingModal");

      renderAll();

      toast(
        `Booking ${booking.id} created successfully.`
      );

    });


  /* =====================================================
     BOOKING STATUS CLASS
     ===================================================== */

  function statusClass(status) {

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
     RENDER SUMMARY
     ===================================================== */

  function renderSummary() {

    $("totalCustomers").textContent =
      customers.length;

    $("totalBookings").textContent =
      bookings.length;

    $("completedBookings").textContent =
      bookings.filter(
        item =>
          item.status === "Completed"
      ).length;

    $("pendingBookings").textContent =
      bookings.filter(
        item =>
          item.status === "Pending"
      ).length;

  }


  /* =====================================================
     BOOKING TABLE
     ===================================================== */

  function renderBookings() {

    const tbody =
      $("bookingTableBody");


    const search =
      $("bookingSearch")
        .value
        .trim()
        .toLowerCase();


    const status =
      $("statusFilter").value;


    const service =
      $("serviceFilter").value;


    let list =
      bookings.filter(booking => {

        const customer =
          customers.find(
            item =>
              item.id ===
              booking.customerId
          );


        const customerName =
          customer?.name || "";


        const matchesSearch =
          !search ||

          booking.id
            .toLowerCase()
            .includes(search) ||

          customerName
            .toLowerCase()
            .includes(search) ||

          booking.area
            .toLowerCase()
            .includes(search);


        const matchesStatus =
          status === "all" ||
          booking.status === status;


        const matchesService =
          service === "all" ||
          booking.service === service;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesService
        );

      });


    tbody.innerHTML = "";


    if (list.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="8"
              style="text-align:center;padding:35px;">
            No service bookings found.
          </td>
        </tr>
      `;

      return;

    }


    list
      .slice()
      .reverse()
      .forEach(booking => {

        const customer =
          customers.find(
            item =>
              item.id ===
              booking.customerId
          );


        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            <strong>
              ${escapeHTML(booking.id)}
            </strong>
          </td>

          <td>
            ${escapeHTML(
              customer?.name || "Unknown"
            )}
            <br>
            <small>
              ${escapeHTML(
                customer?.mobile || ""
              )}
            </small>
          </td>

          <td>
            ${escapeHTML(booking.service)}
          </td>

          <td>
            ${escapeHTML(
              booking.area || "-"
            )}
          </td>

          <td>
            ${escapeHTML(booking.date)}
          </td>

          <td>
            ${escapeHTML(
              booking.technician
            )}
          </td>

          <td>

            <select
              class="status-select"
              data-id="${escapeHTML(booking.id)}">

              ${[
                "Pending",
                "Confirmed",
                "Assigned",
                "In Progress",
                "Completed",
                "Cancelled"
              ]
                .map(option => `
                  <option
                    value="${option}"
                    ${
                      booking.status === option
                        ? "selected"
                        : ""
                    }>
                    ${option}
                  </option>
                `)
                .join("")}

            </select>

          </td>

          <td>

            <button
              class="view-btn"
              data-view="${escapeHTML(
                booking.id
              )}">
              View
            </button>

          </td>

        `;


        tbody.appendChild(row);

      });


    document
      .querySelectorAll(".status-select")
      .forEach(select => {

        select.addEventListener(
          "change",
          () => {

            updateBookingStatus(
              select.dataset.id,
              select.value
            );

          }
        );

      });


    document
      .querySelectorAll("[data-view]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            showBookingDetails(
              button.dataset.view
            );

          }
        );

      });

  }


  /* =====================================================
     UPDATE STATUS
     ===================================================== */

  function updateBookingStatus(
    bookingId,
    newStatus
  ) {

    const booking =
      bookings.find(
        item =>
          item.id === bookingId
      );


    if (!booking) return;


    booking.status =
      newStatus;


    saveData();

    renderAll();

    toast(
      `${bookingId} status updated to ${newStatus}.`
    );

  }


  /* =====================================================
     BOOKING DETAILS
     ===================================================== */

  function showBookingDetails(
    bookingId
  ) {

    const booking =
      bookings.find(
        item =>
          item.id === bookingId
      );


    if (!booking) return;


    const customer =
      customers.find(
        item =>
          item.id ===
          booking.customerId
      );


    $("detailsTitle").textContent =
      booking.id;


    $("bookingDetails").innerHTML = `

      <div class="detail-grid">

        <div class="detail-item">
          <span>Booking ID</span>
          <strong>
            ${escapeHTML(booking.id)}
          </strong>
        </div>

        <div class="detail-item">
          <span>Status</span>
          <strong>
            ${escapeHTML(booking.status)}
          </strong>
        </div>

        <div class="detail-item">
          <span>Customer</span>
          <strong>
            ${escapeHTML(
              customer?.name || "-"
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Mobile</span>
          <strong>
            ${escapeHTML(
              customer?.mobile || "-"
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Service</span>
          <strong>
            ${escapeHTML(
              booking.service
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Preferred Date</span>
          <strong>
            ${escapeHTML(
              booking.date
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Preferred Time</span>
          <strong>
            ${escapeHTML(
              booking.time || "-"
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Technician</span>
          <strong>
            ${escapeHTML(
              booking.technician
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Division</span>
          <strong>
            ${escapeHTML(
              booking.division || "-"
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>District</span>
          <strong>
            ${escapeHTML(
              booking.district || "-"
            )}
          </strong>
        </div>

        <div class="detail-item">
          <span>Area</span>
          <strong>
            ${escapeHTML(
              booking.area || "-"
            )}
          </strong>
        </div>

        <div class="detail-item full">
          <span>Service Address</span>
          <strong>
            ${escapeHTML(
              booking.address || "-"
            )}
          </strong>
        </div>

        <div class="detail-item full">
          <span>Problem / Description</span>
          <strong>
            ${escapeHTML(
              booking.description || "-"
            )}
          </strong>
        </div>

        <div class="detail-item full">
          <span>Terms & Consent</span>
          <strong>
            ${
              booking.termsAccepted
                ? "Accepted"
                : "Not Accepted"
            }
          </strong>
        </div>

      </div>

    `;


    openModal("detailsModal");

  }


  /* =====================================================
     FILTER EVENTS
     ===================================================== */

  $("bookingSearch")
    .addEventListener(
      "input",
      renderBookings
    );


  $("statusFilter")
    .addEventListener(
      "change",
      renderBookings
    );


  $("serviceFilter")
    .addEventListener(
      "change",
      renderBookings
    );


  /* =====================================================
     INITIAL RENDER
     ===================================================== */

  function renderAll() {

    renderSummary();

    renderBookings();

  }


  populateCustomerSelect();

  renderAll();

});
