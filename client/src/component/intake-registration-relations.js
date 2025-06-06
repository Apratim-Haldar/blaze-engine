import "./personal-details.js"; // Import PersonalDetails instead of IntakeRegistrationPersonal

class IntakeRegistrationRelations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.relations = [];

    // Fetch the external CSS file for floating labels
    fetch(
      "/node_modules/@blaze-case-ai/blaze-engine/client/style/floating-label.css"
    )
      .then((response) => response.text())
      .then((css) => {
        this.shadowRoot.innerHTML = `
          <style>
            ${css}

            .accordion {
              background-color: #eee;
              border: 1px solid #ccc;
              padding: 10px;
              margin: 10px 0;
              cursor: pointer;
            }

            .accordion-content {
              display: none;
              padding: 10px;
              border: 1px solid #ccc;
              border-top: none;
            }

            .accordion.active .accordion-content {
              display: block;
            }

            .add-relation-btn {
              display: inline-block;
              padding: 8px 12px;
              background-color: #007bff;
              color: #fff;
              border: none;
              cursor: pointer;
              border-radius: 4px;
              margin-bottom: 10px;
            }

            .modal {
              display: none;
              position: fixed;
              z-index: 1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.4);
            }

            .modal-content {
              background-color: #fff;
              margin: 15% auto;
              padding: 20px;
              border: 1px solid #888;
              width: 50%;
              position: relative;
            }

            .close {
              color: #aaa;
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 28px;
              font-weight: bold;
              cursor: pointer;
            }

            .close:hover, .close:focus {
              color: black;
              text-decoration: none;
            }
          </style>

          <button class="add-relation-btn">Add Relation</button>

          <div class="relations-list"></div>

          <!-- Modal for adding relation -->
          <div class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <div id="relationForm">
                <div class="relationship-group">
                  <select id="relationship" name="relationship" required>
                    <option value=""></option> <!-- Empty option for floating effect -->
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                  </select>
                  <label for="relationship">Relationship</label>
                </div>
                <!-- Replaced intake-registration-personal with personal-details -->
                <personal-details context="relation"></personal-details>
                <button type="button" id="saveRelation">Save Relation</button>
              </div>
            </div>
          </div>
        `;

        // Now add event listeners once the content is available
        this.modal = this.shadowRoot.querySelector(".modal");
        this.shadowRoot
          .querySelector(".add-relation-btn")
          .addEventListener("click", this.showModal.bind(this));
        this.shadowRoot
          .querySelector(".close")
          .addEventListener("click", this.hideModal.bind(this));
        this.shadowRoot
          .querySelector("#saveRelation")
          .addEventListener("click", this.saveRelation.bind(this));

        const select = this.shadowRoot.querySelector("#relationship");
        select.addEventListener("change", function () {
          if (select.value) {
            select.classList.add("filled");
          } else {
            select.classList.remove("filled");
          }
        });
      });
  }

  showModal() {
    this.modal.style.display = "block";
  }

  hideModal() {
    this.modal.style.display = "none";
  }

  saveRelation(event) {
    event.preventDefault();

    const relationship = this.shadowRoot.querySelector("#relationship").value;

    // Ensure the custom element is fully loaded before accessing its shadow DOM
    const personalDetailsComponent =
      this.shadowRoot.querySelector("personal-details");

    if (!personalDetailsComponent) {
      console.error("personal-details component not found.");
      return;
    }

    // Ensure the PersonalDetails form is populated
    const checkPersonalForm = () => {
      if (personalDetailsComponent.shadowRoot) {
        const personalForm =
          personalDetailsComponent.shadowRoot.querySelector("#personalForm");

        if (personalForm) {
          if (personalForm.checkValidity() && relationship) {
            // Capture form data from PersonalDetails component
            const personalData =
              personalDetailsComponent.captureFormData().relation;

            const formData = {
              ...personalData, // Merge personal details
              relationship: relationship, // Add relationship field
            };

            this.relations.push(formData);
            this.hideModal();
            this.renderRelations();
          } else {
            personalForm.reportValidity();
          }
        } else {
          console.error("personalForm not found.");
        }
      } else {
        requestAnimationFrame(checkPersonalForm); // Keep checking until shadowRoot and form are available
      }
    };

    requestAnimationFrame(checkPersonalForm); // Start checking on the next frame
  }

  renderRelations() {
    const relationsList = this.shadowRoot.querySelector(".relations-list");
    relationsList.innerHTML = "";

    this.relations.forEach((relation, index) => {
      const accordion = document.createElement("div");
      accordion.classList.add("accordion");
      accordion.innerHTML = `
          ${relation.firstName} ${relation.lastName} (${relation.relationship})
          <div class="accordion-content">
            <!-- Add context when rendering personal-details -->
            <personal-details context="relation"></personal-details>
          </div>
        `;

      const accordionContent = accordion.querySelector(".accordion-content");
      accordion.addEventListener("click", function () {
        accordion.classList.toggle("active");
        if (accordion.classList.contains("active")) {
          const personalComponent =
            accordionContent.querySelector("personal-details");
          personalComponent.shadowRoot.querySelector("#firstName").value =
            relation.firstName;
          personalComponent.shadowRoot.querySelector("#lastName").value =
            relation.lastName;
          personalComponent.shadowRoot.querySelector("#dateOfBirth").value =
            relation.dateOfBirth;
          personalComponent.shadowRoot.querySelector("#countryCode").value =
            relation.countryCode;
          personalComponent.shadowRoot.querySelector("#phoneNumber").value =
            relation.phoneNumber;
        }
      });

      relationsList.appendChild(accordion);
    });
  }
}

customElements.define(
  "intake-registration-relations",
  IntakeRegistrationRelations
);
