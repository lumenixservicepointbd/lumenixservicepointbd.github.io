<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LUMENIX Job Assignment</title>
  <link rel="stylesheet" href="css/job-assignment.css">
</head>

<body>

<main class="assignment-page">

  <header class="page-header">
    <div>
      <span class="eyebrow">LUMENIX V5.1</span>
      <h1>Job Assignment</h1>
      <p>Match service requests with technicians by area, skill and availability.</p>
    </div>

    <button class="primary-btn" id="refreshBtn">↻ Refresh</button>
  </header>


  <!-- SUMMARY -->

  <section class="summary-grid">

    <div class="summary-card blue">
      <span>Pending Requests</span>
      <strong id="pendingCount">0</strong>
      <small>Waiting for assignment</small>
    </div>

    <div class="summary-card green">
      <span>Assigned</span>
      <strong id="assignedCount">0</strong>
      <small>Technicians assigned</small>
    </div>

    <div class="summary-card orange">
      <span>In Progress</span>
      <strong id="progressCount">0</strong>
      <small>Active jobs</small>
    </div>

    <div class="summary-card purple">
      <span>Completed</span>
      <strong id="completedCount">0</strong>
      <small>Finished jobs</small>
    </div>

  </section>


  <!-- REQUESTS -->

  <section class="content-card">

    <div class="section-header">

      <div>
        <h2>Service Requests</h2>
        <p>Select a request to find matching technicians.</p>
      </div>

      <div class="filters">

        <input
          id="searchInput"
          type="search"
          placeholder="Search booking, customer or area..."
        >

        <select id="statusFilter">
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

    </div>


    <div class="table-wrapper">

      <table>

        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Technician</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody id="requestTableBody"></tbody>

      </table>

    </div>

  </section>


  <!-- ASSIGNMENT MODAL -->

  <div class="modal-overlay" id="assignmentModal">

    <div class="modal large-modal">

      <div class="modal-header">

        <div>
          <span class="eyebrow">TECHNICIAN MATCHING</span>
          <h2 id="assignmentTitle">Assign Technician</h2>
        </div>

        <button class="close-btn" data-close="assignmentModal">×</button>

      </div>


      <div class="request-summary" id="requestSummary"></div>


      <div class="matching-header">

        <div>
          <h3>Recommended Technicians</h3>

          <p>
            Matching priority:
            <strong>Area → Skill → Availability</strong>
          </p>
        </div>

        <span class="match-count" id="matchCount">
          0 matches
        </span>

      </div>


      <div id="technicianMatches" class="technician-matches"></div>


      <div class="modal-actions">

        <button
          class="secondary-btn"
          data-close="assignmentModal">
          Cancel
        </button>

      </div>

    </div>

  </div>


  <!-- JOB DETAIL MODAL -->

  <div class="modal-overlay" id="jobModal">

    <div class="modal large-modal">

      <div class="modal-header">

        <div>
          <span class="eyebrow">JOB DETAILS</span>
          <h2 id="jobTitle">Service Job</h2>
        </div>

        <button class="close-btn" data-close="jobModal">×</button>

      </div>


      <!-- EXISTING JOB DETAILS -->

      <div class="job-detail" id="jobDetail"></div>


      <!-- TECHNICIAN JOB MANAGEMENT -->

      <section
        class="technician-job-panel"
        id="technicianJobPanel"
        hidden>

        <div class="technician-job-header">

          <div>
            <span class="eyebrow">TECHNICIAN OPERATIONS</span>
            <h3>Job Management</h3>
            <p>
              Track acceptance, work progress and completion.
            </p>
          </div>

          <span
            class="job-status-pill"
            id="technicianJobStatus">
            Assigned
          </span>

        </div>


        <!-- STATUS FLOW -->

        <div class="technician-status-flow">

          <div
            class="tech-status-step"
            data-status-step="Assigned">

            <div class="tech-status-circle">1</div>

            <strong>Assigned</strong>
            <small>Technician assigned</small>

          </div>


          <div class="tech-status-line"></div>


          <div
            class="tech-status-step"
            data-status-step="In Progress">

            <div class="tech-status-circle">2</div>

            <strong>In Progress</strong>
            <small>Work started</small>

          </div>


          <div class="tech-status-line"></div>


          <div
            class="tech-status-step"
            data-status-step="Completed">

            <div class="tech-status-circle">3</div>

            <strong>Completed</strong>
            <small>Work finished</small>

          </div>

        </div>


        <!-- ACTION -->

        <div class="technician-action-box">

          <h4>Technician Action</h4>

          <div id="technicianActionArea"></div>

        </div>


        <!-- COMPLETION -->

        <div
          class="technician-completion-box"
          id="technicianCompletionBox"
          hidden>

          <h4>Complete Service Job</h4>

          <div class="technician-form-grid">

            <div class="technician-form-group">

              <label for="technicianCompletionNotes">
                Completion Notes *
              </label>

              <textarea
                id="technicianCompletionNotes"
                rows="4"
                placeholder="Write completed work details..."></textarea>

            </div>


            <div class="technician-form-group">

              <label for="technicianCustomerConfirmation">
                Customer Confirmation
              </label>

              <select id="technicianCustomerConfirmation">

                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Not Available">
                  Not Available
                </option>

              </select>

            </div>

          </div>


          <button
            class="technician-complete-btn"
            id="technicianCompleteBtn">

            ✓ Complete Job

          </button>

        </div>


        <!-- TIMELINE -->

        <div class="technician-timeline-box">

          <h4>Job Timeline</h4>

          <div id="technicianJobTimeline"></div>

        </div>

      </section>

    </div>

  </div>


  <div class="toast" id="toast"></div>


  <script src="js/job-assignment.js"></script>

</main>

</body>
</html>
