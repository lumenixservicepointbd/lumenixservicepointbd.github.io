/* =========================================================
   LUMENIX V5.1
   TECHNICIAN NETWORK
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const STORAGE = {
    technicians: "lumenix_technicians",
    bookings: "lumenix_service_bookings"
  };


  let technicians = JSON.parse(
    localStorage.getItem(STORAGE.technicians) || "[]"
  );

  let bookings = JSON.parse(
    localStorage.getItem(STORAGE.bookings) || "[]"
  );


  const $ = id => document.getElementById(id);


  /* =====================================================
     HELPERS
     ===================================================== */

  function saveTechnicians() {

    localStorage.setItem(
      STORAGE.technicians,
      JSON.stringify(technicians)
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


  function generateTechnicianID() {

    const number =
      String(technicians.length + 1)
        .padStart(5, "0");

    return `LSP-T-${number}`;

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

  $("addTechnicianBtn")
    .addEventListener(
      "click",
      () => openModal("technicianModal")
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
     REGISTER TECHNICIAN
     ===================================================== */

  $("technicianForm")
    .addEventListener("submit", event => {

      event.preventDefault();


      const mobile =
        $("technicianMobile")
          .value
          .trim();


      const duplicate =
        technicians.find(
          technician =>
            technician.mobile === mobile
        );


      if (duplicate) {

        toast(
          `This mobile number is already registered as ${duplicate.id}.`
        );

        return;

      }


      if (
        $("technicianSkill").value ===
        $("technicianSecondarySkill").value &&
        $("technicianSecondarySkill").value !== ""
      ) {

        toast(
          "Primary and secondary skills cannot be the same."
        );

        return;

      }


      const technician = {

        id:
          generateTechnicianID(),

        name:
          $("technicianName")
            .value
            .trim(),

        mobile,

        altMobile:
          $("technicianAltMobile")
            .value
            .trim(),

        experience:
          Number(
            $("technicianExperience").value
          ) || 0,

        primarySkill:
          $("technicianSkill").value,

        secondarySkill:
          $("technicianSecondarySkill").value,

        division:
          $("technicianDivision")
            .value
            .trim(),

        district:
          $("technicianDistrict")
            .value
            .trim(),

        area:
          $("technicianArea")
            .value
            .trim(),

        address:
          $("technicianAddress")
            .value
            .trim(),

        notes:
          $("technicianNotes")
            .value
            .trim(),

        verificationStatus:
          "Pending",

        availability:
          $("technicianAvailability").value,

        agreementAccepted:
          true,

        agreementDate:
          new Date().toISOString(),

        registrationDate:
          today(),

        status:
          "Active"

      };


      technicians.push(technician);

      saveTechnicians();

      event.target.reset();

      closeModal("technicianModal");

      renderAll();

      toast(
        `${technician.id} registered successfully. Verification is pending.`
      );

    });


  /* =====================================================
     SUMMARY
     ===================================================== */

  function renderSummary() {

    $("totalTechnicians").textContent =
      technicians.length;


    $("verifiedTechnicians").textContent =
      technicians.filter(
        technician =>
          technician.verificationStatus ===
          "Verified"
      ).length;


    $("availableTechnicians").textContent =
      technicians.filter(
        technician =>
          technician.availability ===
          "Available"
      ).length;


    $("assignedJobs").textContent =
      bookings.filter(
        booking =>
          booking.technicianId &&
          [
            "Assigned",
            "In Progress"
          ].includes(booking.status)
      ).length;

  }


  /* =====================================================
     FILTER
     ===================================================== */

  function renderTechnicians() {

    const tbody =
      $("technicianTableBody");


    const search =
      $("technicianSearch")
        .value
        .trim()
        .toLowerCase();


    const skill =
      $("skillFilter").value;


    const verification =
      $("verificationFilter").value;


    const availability =
      $("availabilityFilter").value;


    const list =
      technicians.filter(technician => {

        const searchable = [

          technician.id,
          technician.name,
          technician.mobile,
          technician.area,
          technician.district

        ]
          .join(" ")
          .toLowerCase();


        const searchMatch =
          !search ||
          searchable.includes(search);


        const skillMatch =
          skill === "all" ||
          technician.primarySkill === skill ||
          technician.secondarySkill === skill;


        const verificationMatch =
          verification === "all" ||
          technician.verificationStatus === verification;


        const availabilityMatch =
          availability === "all" ||
          technician.availability === availability;


        return (
          searchMatch &&
          skillMatch &&
          verificationMatch &&
          availabilityMatch
        );

      });


    tbody.innerHTML = "";


    if (!list.length) {

      tbody.innerHTML = `
        <tr>
          <td colspan="8"
              style="text-align:center;padding:35px;">
            No technicians found.
          </td>
        </tr>
      `;

      return;

    }


    list
      .slice()
      .reverse()
      .forEach(technician => {

        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            <strong>
              ${escapeHTML(technician.id)}
            </strong>
          </td>

          <td>
            <strong>
              ${escapeHTML(technician.name)}
            </strong>

            <br>

            <small>
              ${technician.experience} years experience
            </small>
          </td>

          <td>
            ${escapeHTML(technician.mobile)}
          </td>

          <td>
            ${escapeHTML(technician.primarySkill)}
          </td>

          <td>
            ${escapeHTML(
              technician.area || "-"
            )}
          </td>

          <td>

            <span class="badge verified ${
              verificationClass(
                technician.verificationStatus
              )
            }">

              ${escapeHTML(
                technician.verificationStatus
              )}

            </span>

          </td>

          <td>

            <span class="badge ${
              availabilityClass(
                technician.availability
              )
            }">

              ${escapeHTML(
                technician.availability
              )}

            </span>

          </td>

          <td>

            <button
              class="view-btn"
              data-profile="${escapeHTML(
                technician.id
              )}">

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
     BADGE CLASSES
     ===================================================== */

  function verificationClass(status) {

    if (status === "Verified") {
      return "success";
    }

    if (status === "Rejected") {
      return "rejected";
    }

    return "";

  }


  function availabilityClass(status) {

    if (status === "Busy") {
      return "busy";
    }

    if (status === "Offline") {
      return "offline";
    }

    return "available";

  }


  /* =====================================================
     SKILL QUICK FILTER
     ===================================================== */

  document
    .querySelectorAll(".skill-box")
    .forEach(button => {

      button.addEventListener("click", () => {

        const selectedSkill =
          button.dataset.skill;


        $("skillFilter").value =
          selectedSkill;


        document
          .querySelectorAll(".skill-box")
          .forEach(item =>
            item.classList.remove("active")
          );


        button.classList.add("active");

        renderTechnicians();

      });

    });


  /* =====================================================
     PROFILE
     ===================================================== */

  function showProfile(technicianID) {

    const technician =
      technicians.find(
        item =>
          item.id === technicianID
      );


    if (!technician) return;


    $("profileTitle").textContent =
      technician.name;


    $("profileName").textContent =
      technician.name;


    $("profileId").textContent =
      technician.id;


    $("profileAvatar").textContent =
      technician.name
        .charAt(0)
        .toUpperCase();


    $("profileMobile").textContent =
      technician.mobile || "-";


    $("profileAltMobile").textContent =
      technician.altMobile || "-";


    $("profileSkill").textContent =
      technician.primarySkill || "-";


    $("profileSecondarySkill").textContent =
      technician.secondarySkill || "-";


    $("profileExperience").textContent =
      `${technician.experience || 0} years`;


    $("profileDivision").textContent =
      technician.division || "-";


    $("profileDistrict").textContent =
      technician.district || "-";


    $("profileArea").textContent =
      technician.area || "-";


    $("profileAddress").textContent =
      technician.address || "-";


    $("profileNotes").textContent =
      technician.notes || "-";


    const verification =
      $("profileVerification");


    verification.textContent =
      technician.verificationStatus;


    verification.className =
      `badge verified ${
        verificationClass(
          technician.verificationStatus
        )
      }`;


    const availability =
      $("profileAvailability");


    availability.textContent =
      technician.availability;


    availability.className =
      `badge ${
        availabilityClass(
          technician.availability
        )
      }`;


    renderJobHistory(
      technicianID
    );


    openModal("profileModal");

  }


  /* =====================================================
     JOB HISTORY
     Compatible with future technicianId assignment.
     ===================================================== */

  function renderJobHistory(technicianID) {

    bookings = JSON.parse(
      localStorage.getItem(
        STORAGE.bookings
      ) || "[]"
    );


    const jobs =
      bookings.filter(
        booking =>
          booking.technicianId ===
          technicianID
      );


    $("jobCount").textContent =
      `${jobs.length} job${
        jobs.length === 1 ? "" : "s"
      }`;


    const tbody =
      $("jobHistoryBody");


    tbody.innerHTML = "";


    if (!jobs.length) {

      tbody.innerHTML = `
        <tr>
          <td colspan="5"
              style="text-align:center;padding:25px;">
            No assigned jobs yet.
          </td>
        </tr>
      `;

      return;

    }


    jobs
      .slice()
      .reverse()
      .forEach(job => {

        const row =
          document.createElement("tr");


        row.innerHTML = `

          <td>
            ${escapeHTML(job.id)}
          </td>

          <td>
            ${escapeHTML(
              job.customerName ||
              job.customerId ||
              "Customer"
            )}
          </td>

          <td>
            ${escapeHTML(job.service)}
          </td>

          <td>
            ${escapeHTML(job.date)}
          </td>

          <td>

            <span class="badge ${
              job.status === "Completed"
                ? "verified success"
                : "available"
            }">

              ${escapeHTML(job.status)}

            </span>

          </td>

        `;


        tbody.appendChild(row);

      });

  }


  /* =====================================================
     FILTER EVENTS
     ===================================================== */

  $("technicianSearch")
    .addEventListener(
      "input",
      renderTechnicians
    );


  $("skillFilter")
    .addEventListener(
      "change",
      renderTechnicians
    );


  $("verificationFilter")
    .addEventListener(
      "change",
      renderTechnicians
    );


  $("availabilityFilter")
    .addEventListener(
      "change",
      renderTechnicians
    );


  /* =====================================================
     INITIAL RENDER
     ===================================================== */

  function renderAll() {

    bookings = JSON.parse(
      localStorage.getItem(
        STORAGE.bookings
      ) || "[]"
    );

    renderSummary();

    renderTechnicians();

  }


  renderAll();

});
