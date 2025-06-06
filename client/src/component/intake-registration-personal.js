import "./personal-details.js";

class IntakeRegistrationPersonal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Fetch the external CSS file
    fetch(
      "/node_modules/@blaze-case-ai/blaze-engine/client/style/floating-label.css"
    )
      .then((response) => response.text())
      .then((css) => {
        this.shadowRoot.innerHTML = `
          <style>
            ${css}
          </style>
          <!-- Embed the personal-details component here with a context -->
          <personal-details context="client"></personal-details>
        `;

        // Immediately try to assign caseData after component creation
        this._assignCaseDataToPersonalDetails();

        // Observe changes in the shadow DOM to detect when personal-details is available
        this._observePersonalDetails();

        // Handle form submission within the outer component if needed
        this.shadowRoot.addEventListener(
          "formSubmitted",
          this.handleSubmit.bind(this)
        );
      });

    // Initialize _caseData as null
    this._caseData = null;
  }

  // Setter for caseData
  set caseData(data) {
    this._caseData = data;
    // Try assigning caseData immediately after it's set
    this._assignCaseDataToPersonalDetails();
  }

  get caseData() {
    return this._caseData;
  }

  // Observe the shadow DOM to ensure personal-details is available before setting caseData
  _observePersonalDetails() {
    const observer = new MutationObserver(() => {
      this._assignCaseDataToPersonalDetails(); // Assign caseData when personal-details is added
    });

    // Start observing the shadow DOM for child changes
    observer.observe(this.shadowRoot, { childList: true, subtree: true });
  }

  // Assign caseData to personal-details once it's available
  _assignCaseDataToPersonalDetails() {
    const personalDetailsComponent =
      this.shadowRoot.querySelector("personal-details");
    if (personalDetailsComponent && this._caseData) {
      personalDetailsComponent.caseData = this._caseData; // Pass caseData to personal-details
    }
  }

  handleSubmit(event) {
    const formData = event.detail;
    console.log("Form submitted:", formData);
    this.dispatchEvent(new CustomEvent("formSubmitted", { detail: formData }));
  }
}

customElements.define(
  "intake-registration-personal",
  IntakeRegistrationPersonal
);
export default IntakeRegistrationPersonal;
