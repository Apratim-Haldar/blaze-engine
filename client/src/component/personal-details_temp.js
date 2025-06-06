class PersonalDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._caseData = null;
    this.context = this.getAttribute("context") || "client"; // Context is passed as an attribute

    // Fetch the external CSS file and load the form HTML
    this.renderComponent().then(() => {
      // After the component is fully rendered, if caseData is available, populate the form
      if (this._caseData) {
        this.populateForm();
      }
    });
  }

  // Render the component, including fetching and applying the CSS and HTML structure
  renderComponent() {
    return new Promise((resolve) => {
      fetch(
        "/node_modules/@blaze-case-ai/blaze-engine/client/style/floating-label.css"
      )
        .then((response) => response.text())
        .then((css) => {
          this.shadowRoot.innerHTML = `
            <style>
              ${css}
              .phone-group {
                display: flex;
                align-items: center;
              }

              .phone-group select {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px 0 0 4px;
                font-size: 14px;
                width: auto;
              }

              .phone-group input {
                padding: 10px;
                border: 1px solid #ccc;
                border-left: none;
                border-radius: 0 4px 4px 0;
                font-size: 14px;
                flex: 1;
              }

              .phone-group label {
                margin-left: 10px;
              }
            </style>
            <form id="personalForm">
              <div>
                <input type="text" id="firstName" name="${this.context}.firstName" required placeholder=" " />
                <label for="firstName">First Name</label>
              </div>
              <div>
                <input type="text" id="lastName" name="${this.context}.lastName" required placeholder=" " />
                <label for="lastName">Last Name</label>
              </div>
              <div>
                <input type="text" id="bsn" name="${this.context}.bsn" required placeholder=" " />
                <label for="bsn">BSN</label>
              </div>
              <div>
                <input type="date" id="dateOfBirth" name="${this.context}.dateOfBirth" required placeholder=" " />
                <label for="dateOfBirth">Date of Birth</label>
              </div>
              <div class="phone-group">
                <select id="countryCode" name="${this.context}.countryCode" required>
                  <option value="+1">+1 (US)</option>
                  <option value="+31">+31 (Netherlands)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                </select>
                <input type="tel" id="phoneNumber" name="${this.context}.phoneNumber" required placeholder=" " />
                <label for="phoneNumber">Phone Number</label>
              </div>
            </form>
          `;

          resolve(); // Resolve the promise once rendering is complete
        });
    });
  }

  // Capture form data dynamically
  captureFormData() {
    const form = this.shadowRoot.querySelector("#personalForm");
    const formData = {};

    // Capture form values and remove the 'client' prefix if necessary
    const formElements = form.querySelectorAll("input, select");
    formElements.forEach((el) => {
      formData[el.name.split(".").pop()] = el.value; // Strip the context (e.g., "client") from the names
    });

    return { [this.context]: formData }; // Return data with context (e.g., { client: { firstName, lastName, ... } })
  }

  // Set form data (used when editing)
  setFormData(data) {
    const form = this.shadowRoot.querySelector("#personalForm");
    Object.keys(data).forEach((key) => {
      const input = form.querySelector(`#${key}`);
      if (input) {
        input.value = data[key];
      }
    });
  }

  // Handle form submission and dispatch the event to the outer component
  handleSubmit(event) {
    event.preventDefault();
    const formData = this.captureFormData();
    this.dispatchEvent(new CustomEvent("formSubmitted", { detail: formData }));
  }

  // Ensure the form is fully rendered before accessing its elements
  connectedCallback() {
    this.shadowRoot.addEventListener("submit", this.handleSubmit.bind(this));

    // After the component is connected, populate the form if caseData is available
    if (this._caseData) {
      this.populateForm();
    }
  }

  // Setter for caseData
  set caseData(data) {
    this._caseData = data;

    // Ensure that the form is fully rendered before trying to populate
    if (this.shadowRoot.querySelector("#personalForm")) {
      this.populateForm();
    }
  }

  get caseData() {
    return this._caseData;
  }

  // Populate form with data from caseData
  populateForm() {
    if (!this._caseData || !this._caseData.client) return;

    const { firstName, lastName, bsn, dateOfBirth, countryCode, phoneNumber } =
      this._caseData.client;

    // Populate form fields
    const firstNameField = this.shadowRoot.querySelector("#firstName");
    if (firstNameField) firstNameField.value = firstName || "";

    const lastNameField = this.shadowRoot.querySelector("#lastName");
    if (lastNameField) lastNameField.value = lastName || "";

    const bsnField = this.shadowRoot.querySelector("#bsn");
    if (bsnField) bsnField.value = bsn || "";

    const dateOfBirthField = this.shadowRoot.querySelector("#dateOfBirth");
    if (dateOfBirthField) dateOfBirthField.value = dateOfBirth || "";

    const countryCodeField = this.shadowRoot.querySelector("#countryCode");
    if (countryCodeField) countryCodeField.value = countryCode || "";

    const phoneNumberField = this.shadowRoot.querySelector("#phoneNumber");
    if (phoneNumberField) phoneNumberField.value = phoneNumber || "";
  }
}

customElements.define("personal-details", PersonalDetails);
export default PersonalDetails;
