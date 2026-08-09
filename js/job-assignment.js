/* =========================================================
   LUMENIX V5.1
   JOB ASSIGNMENT + AREA / SKILL MATCHING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const STORAGE = {
    bookings: "lumenix_service_bookings",
    technicians: "lumenix_technicians"
  };


  let bookings = JSON.parse(
    localStorage.getItem(STORAGE.bookings) || "[]"
  );

  let technicians = JSON.parse(
    localStorage.getItem(STORAGE.technicians) || "[]"
  );


  const $ = id => document.getElementById(id);


  /* =====================================================
     HELPERS
     ===================================================== */

  function saveBookings() {

    localStorage.setItem(
      STORAGE.bookings,
      JSON.stringify(bookings)
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


  function toast(message) {

    const element = $("toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {

      element.classList.remove("show");

    }, 2600);

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
     STATUS
     ===================================================== */

  function statusClass(status) {

    switch (status) {

      case "Assigned":
        return "assigned";

      case "In Progress":
        return "progress";

      case "Completed":
        return "completed";

      case "Cancelled":
        return "cancelled";

      default:
        return "pending";

    }

  }


  /* =====================================================
     SUMMARY
     ===================================================== */

  function renderSummary() {

    $("pendingCount").textContent =
      bookings.filter(
        item => item.status === "Pending"
      ).length;


    $("assignedCount").textContent =
      bookings.filter(
        item => item.status === "Assigned"
      ).length;


    $("progressCount").textContent =
      bookings.filter(
        item => item.status === "In Progress"
      ).length;


    $("completedCount").textContent =
      bookings.filter(
        item => item.status === "Completed"
      ).length;

  }


  /* =====================================================
     REQUEST LIST
     ===================================================== */

  function renderRequests() {

    const search =
      $("searchInput")
        .value
        .trim()
        .toLowerCase();


    const status =
      $("statusFilter").value;


    const list =
      bookings.filter(booking => {

        const searchable = [

          booking.id,
          booking.customerName,
          booking.customerId,
          booking.service,
          booking.area,
          booking.district,
          booking.division

        ]
          .join(" ")
          .toLowerCase();


        const searchMatch =
          !search ||
          searchable.includes(search);


        const statusMatch =
          status === "all" ||
          booking.status === status;


        return searchMatch && statusMatch;

      });


    const tbody =
      $("requestTableBody");


    tbody.innerHTML = "";


    if (!list.length) {

      tbody.innerHTML = `
        <tr>
          <td colspan="8">
            <div class="empty-state">
              No service requests found.
            </div>
          </td>
        </tr>
      `;

      return;

    }


    list
      .slice()
      .reverse()
      .forEach(booking => {

        const technician =
          technicians.find(
            tech =>
              tech.id ===
              booking.technicianId
          );


        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            <strong>
              ${escapeHTML(booking.id || "-")}
            </strong>
          </td>

          <td>
            ${escapeHTML(
              booking.customerName ||
              booking.customerId ||
              "-"
            )}
          </td>

          <td>
            ${escapeHTML(
              booking.service || "-"
            )}
          </td>

          <td>
            ${escapeHTML(
              booking.area ||
              booking.district ||
              "-"
            )}
          </td>

          <td>
            ${escapeHTML(
              booking.date || "-"
            )}
          </td>

          <td>
            <span class="badge ${statusClass(
              booking.status
            )}">
              ${escapeHTML(
                booking.status || "Pending"
              )}
            </span>
          </td>

          <td>
            ${
              technician
                ? escapeHTML(technician.name)
                : "-"
            }
          </td>

          <td>

            ${
              ["Pending", "Assigned"].includes(
                booking.status
              )

              ? `
                <button
                  class="view-btn"
                  data-assign="${escapeHTML(
                    booking.id
                  )}">
                  ${
                    booking.status === "Assigned"
                      ? "Reassign"
                      : "Assign"
                  }
                </button>
              `

              : `
                <button
                  class="view-btn"
                  data-job="${escapeHTML(
                    booking.id
                  )}">
                  View
                </button>
              `
            }

          </td>

        `;


        tbody.appendChild(row);

      });


    document
      .querySelectorAll("[data-assign]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            openAssignment(
              button.dataset.assign
            );

          }
        );

      });


    document
      .querySelectorAll("[data-job]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            openJobDetail(
              button.dataset.job
            );

          }
        );

      });

  }


  /* =====================================================
     MATCHING ENGINE
     ===================================================== */

  function normalize(value) {

    return String(value || "")
      .trim()
      .toLowerCase();

  }


  function calculateMatch(booking, technician) {

    let score = 0;

    const reasons = [];


    /* AREA MATCH */

    const bookingArea =
      normalize(booking.area);

    const technicianArea =
      normalize(technician.area);


    const bookingDistrict =
      normalize(booking.district);

    const technicianDistrict =
      normalize(technician.district);


    const bookingDivision =
      normalize(booking.division);

    const technicianDivision =
      normalize(technician.division);


    if (
      bookingArea &&
      technicianArea &&
      bookingArea === technicianArea
    ) {

      score += 50;

      reasons.push("Area Match");

    }

    else if (
      bookingDistrict &&
      technicianDistrict &&
      bookingDistrict === technicianDistrict
    ) {

      score += 30;

      reasons.push("District Match");

    }

    else if (
      bookingDivision &&
      technicianDivision &&
      bookingDivision === technicianDivision
    ) {

      score += 15;

      reasons.push("Division Match");

    }


    /* SKILL MATCH */

    const service =
      normalize(booking.service);


    const primary =
      normalize(technician.primarySkill);


    const secondary =
      normalize(technician.secondarySkill);


    if (
      service &&
      primary &&
      (
        service.includes(primary) ||
        primary.includes(service)
      )
    ) {

      score += 40;

      reasons.push("Primary Skill Match");

    }

    else if (
      service &&
      secondary &&
      (
        service.includes(secondary) ||
        secondary.includes(service)
      )
    ) {

      score += 25;

      reasons.push("Secondary Skill Match");

    }


    /* AVAILABILITY */

    if (
      technician.availability ===
      "Available"
    ) {

      score += 20;

      reasons.push("Available");

    }

    else if (
      technician.availability ===
      "Busy"
    ) {

      score += 5;

      reasons.push("Currently Busy");

    }


    /* VERIFICATION */

    if (
      technician.verificationStatus ===
      "Verified"
    ) {

      score += 10;

      reasons.push("Verified");

    }


    return {
      score,
      reasons
    };

  }


  /* =====================================================
     FIND MATCHES
     ===================================================== */

  function getMatches(booking) {

    return technicians

      .filter(
        technician =>
          technician.status !== "Inactive"
      )

      .map(technician => {

        const match =
          calculateMatch(
            booking,
            technician
          );


        return {
          technician,
          score: match.score,
          reasons: match.reasons
        };

      })

      .filter(
        item =>
          item.score > 0
      )

      .sort(
        (a, b) =>
          b.score - a.score
      );

  }


  /* =====================================================
     ASSIGNMENT MODAL
     ===================================================== */

  function openAssignment(bookingID) {

    const booking =
      bookings.find(
        item =>
          item.id === bookingID
      );


    if (!booking) {

      toast("Booking not found.");

      return;

    }


    $("assignmentTitle").textContent =
      `Assign Technician — ${booking.id}`;


    $("requestSummary").innerHTML = `

      <div class="request-summary-grid">

        <div class="summary-item">
          <span>Booking ID</span>
          <strong>${escapeHTML(
            booking.id
          )}</strong>
        </div>

        <div class="summary-item">
          <span>Customer</span>
          <strong>${escapeHTML(
            booking.customerName ||
            booking.customerId ||
            "-"
          )}</strong>
        </div>

        <div class="summary-item">
          <span>Service</span>
          <strong>${escapeHTML(
            booking.service || "-"
          )}</strong>
        </div>

        <div class="summary-item">
          <span>Location</span>
          <strong>${escapeHTML(
            [
              booking.area,
              booking.district
            ]
              .filter(Boolean)
              .join(", ") || "-"
          )}</strong>
        </div>

      </div>

    `;


    renderMatches(booking);

    openModal("assignmentModal");

  }


  /* =====================================================
     RENDER MATCHES
     ===================================================== */

  function renderMatches(booking) {

    const matches =
      getMatches(booking);


    $("matchCount").textContent =
      `${matches.length} match${
        matches.length === 1 ? "" : "es"
      }`;


    const container =
      $("technicianMatches");


    container.innerHTML = "";


    if (!matches.length) {

      container.innerHTML = `

        <div class="empty-state">

          No matching technicians found.

          <br><br>

          Try checking the service area,
          skill category or technician availability.

        </div>

      `;

      return;

    }


    matches.forEach((item, index) => {

      const technician =
        item.technician;


      const card =
        document.createElement("div");


      card.className =
        `technician-card ${
          index === 0
            ? "recommended"
            : ""
        }`;


      card.innerHTML = `

        <div class="tech-avatar">
          ${escapeHTML(
            technician.name
              .charAt(0)
              .toUpperCase()
          )}
        </div>


        <div class="tech-info">

          <h4>
            ${escapeHTML(
              technician.name
            )}

            ${
              index === 0
                ? " ⭐"
                : ""
            }
          </h4>

          <p>
            ${escapeHTML(
              technician.id
            )}
            ·
            ${escapeHTML(
              technician.mobile
            )}
          </p>

          <p>
            ${escapeHTML(
              technician.primarySkill
            )}
            ·
            ${technician.experience || 0}
            years experience
          </p>

          <div class="match-tags">

            ${
              item.reasons
                .map(
                  reason => `
                    <span class="match-tag match">
                      ${escapeHTML(reason)}
                    </span>
                  `
                )
                .join("")
            }

          </div>

        </div>


        <div>

          <span class="badge ${
            technician.availability ===
            "Available"
              ? "available"
              : technician.availability ===
                "Busy"
                ? "busy"
                : "offline"
          }">

            ${escapeHTML(
              technician.availability
            )}

          </span>

          <br><br>

          <strong>
            ${item.score} pts
          </strong>

          <br><br>

          <button
            class="assign-btn"
            data-select-tech="${escapeHTML(
              technician.id
            )}"
            data-booking="${escapeHTML(
              booking.id
            )}">

            Assign

          </button>

        </div>

      `;


      container.appendChild(card);

    });


    container
      .querySelectorAll(
        "[data-select-tech]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            assignTechnician(
              button.dataset.booking,
              button.dataset.selectTech
            );

          }
        );

      });

  }


  /* =====================================================
     ASSIGN TECHNICIAN
     ===================================================== */

  function assignTechnician(
    bookingID,
    technicianID
  ) {

    const booking =
      bookings.find(
        item =>
          item.id === bookingID
      );


    const technician =
      technicians.find(
        item =>
          item.id === technicianID
      );


    if (!booking || !technician) {

      toast("Assignment failed.");

      return;

    }


    booking.technicianId =
      technician.id;


    booking.technicianName =
      technician.name;


    booking.assignedAt =
      new Date().toISOString();


    booking.status =
      "Assigned";


    /* Technician becomes busy */

    technician.availability =
      "Busy";


    localStorage.setItem(
      STORAGE.technicians,
      JSON.stringify(technicians)
    );


    saveBookings();


    closeModal("assignmentModal");


    renderAll();


    toast(
      `${technician.name} assigned to ${booking.id}.`
    );

  }


  /* =====================================================
     JOB DETAIL
     ===================================================== */

  function openJobDetail(bookingID) {

    const booking =
      bookings.find(
        item =>
          item.id === bookingID
      );


    if (!booking) return;


    const technician =
      technicians.find(
        item =>
          item.id ===
          booking.technicianId
      );


    $("jobTitle").textContent =
      booking.id;


    $("jobDetail").innerHTML = `

      <div class="detail-grid">

        <div class="detail-box">
          <span>Booking ID</span>
          <strong>${escapeHTML(
            booking.id
          )}</strong>
        </div>

        <div class="detail-box">
          <span>Status</span>

          <strong>
            <span class="badge ${statusClass(
              booking.status
            )}">
              ${escapeHTML(
                booking.status
              )}
            </span>
          </strong>
        </div>

        <div class="detail-box">
          <span>Customer</span>
          <strong>${escapeHTML(
            booking.customerName ||
            booking.customerId ||
            "-"
          )}</strong>
        </div>

        <div class="detail-box">
          <span>Service</span>
          <strong>${escapeHTML(
            booking.service || "-"
          )}</strong>
        </div>

        <div class="detail-box">
          <span>Division</span>
          <strong>${escapeHTML(
            booking.division || "-"
          )}</strong>
        </div>

        <div class="detail-box">
          <span>District</span>
          <strong>${escapeHTML(
            booking.district || "-"
          )}</strong>
        </div>

        <div class="detail-box">
          <span>Area</span>
          <strong>${escapeHTML(
            booking.area || "-"
          )}</strong>
        </div>

        <div class="detail-box">
          <span>Date</span>
          <strong>${escapeHTML(
            booking.date || "-"
          )}</strong>
        </div>

        <div class="detail-box full">
          <span>Assigned Technician</span>

          <strong>
            ${
              technician
                ? `${escapeHTML(
                    technician.name
                  )} (${escapeHTML(
                    technician.id
                  )})`
                : "Not assigned"
            }
          </strong>

        </div>

        <div class="detail-box full">
          <span>Service Address</span>
          <strong>${escapeHTML(
            booking.address ||
            "-"
          )}</strong>
        </div>

        <div class="detail-box full">
          <span>Customer Note</span>
          <strong>${escapeHTML(
            booking.note ||
            booking.notes ||
            "-"
          )}</strong>
        </div>

      </div>

    `;


    openModal("jobModal");

  }


  /* =====================================================
     FILTER EVENTS
     ===================================================== */

  $("searchInput")
    .addEventListener(
      "input",
      renderRequests
    );


  $("statusFilter")
    .addEventListener(
      "change",
      renderRequests
    );


  $("refreshBtn")
    .addEventListener(
      "click",
      () => {

        bookings = JSON.parse(
          localStorage.getItem(
            STORAGE.bookings
          ) || "[]"
        );


        technicians = JSON.parse(
          localStorage.getItem(
            STORAGE.technicians
          ) || "[]"
        );


        renderAll();

        toast("Data refreshed.");

      }
    );


  /* =====================================================
     INITIAL
     ===================================================== */

  function renderAll() {

    renderSummary();

    renderRequests();

  }


  renderAll();

});
