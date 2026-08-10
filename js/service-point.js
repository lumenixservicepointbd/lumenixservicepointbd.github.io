/* =========================================================
   LUMENIX V5.1
   SERVICE POINT BD
   COMPLETE JAVASCRIPT
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       STORAGE
       ===================================================== */

    const CUSTOMER_KEY = "lumenixServiceCustomers";
    const BOOKING_KEY = "lumenixServiceBookings";


    function getData(key) {

        try {

            return JSON.parse(
                localStorage.getItem(key)
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveData(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }


    /* =====================================================
       DATA
       ===================================================== */

    let customers = getData(CUSTOMER_KEY);

    let bookings = getData(BOOKING_KEY);


    /* =====================================================
       ELEMENT HELPERS
       ===================================================== */

    function find(...selectors) {

        for (const selector of selectors) {

            const element =
                document.querySelector(selector);

            if (element) return element;

        }

        return null;

    }


    function findAll(selector) {

        return document.querySelectorAll(selector);

    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        let toast =
            find(
                "#spToast",
                ".sp-toast",
                "#toast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "sp-toast";

            toast.id = "spToast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            window.lumenixToastTimer
        );


        window.lumenixToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2500);

    }


    /* =====================================================
       DASHBOARD BUTTON
       ===================================================== */

    const dashboardButtons =
        findAll(
            "#dashboardBtn, #dashboardButton, .sp-dashboard-btn"
        );


    dashboardButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "dashboard.html";

            }
        );

    });


    /* =====================================================
       BUSINESS DIVISION BUTTONS
       ===================================================== */

    const divisionButtons =
        findAll(
            ".business-action"
        );


    divisionButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const href =
                    button.getAttribute("href");


                if (href && href !== "#") {

                    return;

                }


                event.preventDefault();

                showToast(
                    "This business division is selected."
                );

            }
        );

    });


    /* =====================================================
       SERVICE CATEGORY
       ===================================================== */

    const categoryButtons =
        findAll(
            ".category-card"
        );


    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const service =
                    button.dataset.service ||
                    button.querySelector("strong")?.textContent ||
                    "Service";


                const serviceSelect =
                    find(
                        "#bookingService",
                        "#serviceFilter"
                    );


                if (serviceSelect) {

                    const option =
                        Array.from(
                            serviceSelect.options
                        ).find(function (option) {

                            return (
                                option.value === service ||
                                option.textContent.trim() === service
                            );

                        });


                    if (option) {

                        serviceSelect.value =
                            option.value;

                    }

                }


                showToast(
                    service + " selected."
                );

            }
        );

    });


    /* =====================================================
       CUSTOMER MODAL
       ===================================================== */

    const modal =
        find(
            "#customerModal",
            ".sp-modal-overlay"
        );


    const openCustomerButtons =
        findAll(
            "#openCustomerModal",
            "#addCustomerBtn",
            "#customerBtn",
            ".customer-action"
        );


    function openCustomerModal() {

        if (!modal) return;

        modal.classList.add("active");

        modal.style.display = "flex";

    }


    function closeCustomerModal() {

        if (!modal) return;

        modal.classList.remove("active");

        modal.style.display = "none";

    }


    openCustomerButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openCustomerModal();

            }
        );

    });


    const closeModalButtons =
        findAll(
            "#closeCustomerModal",
            ".sp-modal-close",
            "[data-close='customerModal']"
        );


    closeModalButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                closeCustomerModal();

            }
        );

    });


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    closeCustomerModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeCustomerModal();

            }

        }
    );


    /* =====================================================
       CUSTOMER FORM
       ===================================================== */

    const customerForm =
        find(
            "#customerForm"
        );


    if (customerForm) {

        customerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    find(
                        "#customerName",
                        "#customer_name"
                    )?.value.trim() || "";


                const phone =
                    find(
                        "#customerPhone",
                        "#customer_phone"
                    )?.value.trim() || "";


                const address =
                    find(
                        "#customerAddress",
                        "#customer_address"
                    )?.value.trim() || "";


                if (!name || !phone) {

                    showToast(
                        "Customer name and phone are required."
                    );

                    return;

                }


                const customer = {

                    id:
                        "CUS-" +
                        Date.now(),

                    name: name,

                    phone: phone,

                    address: address,

                    createdAt:
                        new Date().toISOString()

                };


                customers.push(customer);

                saveData(
                    CUSTOMER_KEY,
                    customers
                );


                customerForm.reset();

                closeCustomerModal();

                updateDashboard();

                showToast(
                    "Customer registered successfully."
                );

            }
        );

    }


    /* =====================================================
       BOOKING
       ===================================================== */

    const bookingForm =
        find(
            "#bookingForm"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const customer =
                    find(
                        "#bookingCustomer",
                        "#booking_customer"
                    )?.value.trim() || "";


                const service =
                    find(
                        "#bookingService",
                        "#booking_service"
                    )?.value || "";


                const area =
                    find(
                        "#bookingArea",
                        "#booking_area"
                    )?.value.trim() || "";


                const date =
                    find(
                        "#bookingDate",
                        "#booking_date"
                    )?.value || "";


                const technician =
                    find(
                        "#bookingTechnician",
                        "#booking_technician"
                    )?.value.trim() || "";


                if (!customer || !service || !date) {

                    showToast(
                        "Customer, service and date are required."
                    );

                    return;

                }


                const booking = {

                    id:
                        "BK-" +
                        Date.now(),

                    customer: customer,

                    service: service,

                    area: area,

                    date: date,

                    technician: technician,

                    status: "Pending",

                    createdAt:
                        new Date().toISOString()

                };


                bookings.push(booking);

                saveData(
                    BOOKING_KEY,
                    bookings
                );


                bookingForm.reset();

                updateDashboard();

                renderBookings();

                showToast(
                    "New service booking added."
                );

            }
        );

    }


    /* =====================================================
       BOOKING FILTER
       ===================================================== */

    const searchInput =
        find(
            "#bookingSearch",
            "#searchBooking",
            "#searchCustomer"
        );


    const statusFilter =
        find(
            "#bookingStatusFilter",
            "#statusFilter"
        );


    const serviceFilter =
        find(
            "#bookingServiceFilter",
            "#serviceFilter"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderBookings
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderBookings
        );

    }


    if (serviceFilter) {

        serviceFilter.addEventListener(
            "change",
            renderBookings
        );

    }


    /* =====================================================
       BOOKING TABLE
       ===================================================== */

    function renderBookings() {

        const tableBody =
            find(
                "#bookingTableBody",
                "#serviceBookingBody",
                "#bookingsBody"
            );


        if (!tableBody) return;


        const search =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        const status =
            statusFilter?.value || "all";


        const service =
            serviceFilter?.value || "all";


        let filtered =
            bookings.filter(function (booking) {

                const searchMatch =

                    !search ||

                    String(booking.id || "")
                        .toLowerCase()
                        .includes(search) ||

                    String(booking.customer || "")
                        .toLowerCase()
                        .includes(search);


                const statusMatch =

                    status === "all" ||

                    booking.status === status;


                const serviceMatch =

                    service === "all" ||

                    booking.service === service;


                return (
                    searchMatch &&
                    statusMatch &&
                    serviceMatch
                );

            });


        tableBody.innerHTML = "";


        if (filtered.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="empty-state"
                    >
                        No service booking found.
                    </td>

                </tr>

            `;

            return;

        }


        filtered
            .slice()
            .reverse()
            .forEach(function (booking) {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${escapeHTML(booking.id)}
                    </td>

                    <td>
                        ${escapeHTML(booking.customer)}
                    </td>

                    <td>
                        ${escapeHTML(booking.service)}
                    </td>

                    <td>
                        ${escapeHTML(booking.area || "-")}
                    </td>

                    <td>
                        ${escapeHTML(booking.date || "-")}
                    </td>

                    <td>
                        ${escapeHTML(booking.technician || "-")}
                    </td>

                    <td>
                        ${escapeHTML(booking.status || "Pending")}
                    </td>

                `;


                tableBody.appendChild(row);

            });

    }


    /* =====================================================
       UPDATE SUMMARY
       ===================================================== */

    function updateDashboard() {

        const totalCustomers =
            find(
                "#totalCustomers"
            );


        const totalBookings =
            find(
                "#totalBookings"
            );


        const completedServices =
            find(
                "#completedServices"
            );


        const pendingServices =
            find(
                "#pendingServices"
            );


        if (totalCustomers) {

            totalCustomers.textContent =
                customers.length;

        }


        if (totalBookings) {

            totalBookings.textContent =
                bookings.length;

        }


        const completed =
            bookings.filter(function (item) {

                return (
                    String(item.status)
                        .toLowerCase() ===
                    "completed"
                );

            }).length;


        const pending =
            bookings.filter(function (item) {

                return (
                    String(item.status)
                        .toLowerCase() ===
                    "pending"
                );

            }).length;


        if (completedServices) {

            completedServices.textContent =
                completed;

        }


        if (pendingServices) {

            pendingServices.textContent =
                pending;

        }

    }


    /* =====================================================
       STATUS UPDATE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-booking-status]"
                );


            if (!button) return;


            const bookingId =
                button.dataset.bookingId;


            const newStatus =
                button.dataset.bookingStatus;


            const booking =
                bookings.find(function (item) {

                    return item.id === bookingId;

                });


            if (!booking) return;


            booking.status =
                newStatus;


            saveData(
                BOOKING_KEY,
                bookings
            );


            renderBookings();

            updateDashboard();

            showToast(
                "Booking status updated."
            );

        }
    );


    /* =====================================================
       SAFE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    updateDashboard();

    renderBookings();


    console.log(
        "LUMENIX V5.1 Service Point loaded successfully."
    );

});
