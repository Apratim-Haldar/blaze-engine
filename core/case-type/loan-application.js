// filepath: /C:/Users/USER/OneDrive/Desktop/buk/core/case-type/loan-application.js
const BlazeCase = require("@blaze-case-ai/blaze-engine/core/case-type/blaze-case");

class LoanApplicationCase extends BlazeCase {
  constructor() {
    super(
      "loan-application", // Unique identifier for the Loan Application case type
      "Loan Application", // Human-readable label
      [
        {
          id: "application",
          label: "Application",
          steps: [
            {
              id: "personal_details",
              label: "Personal Details",
              status: "in_progress",
              view: "loan-application-personal-details", // Link to a UI component
            },
            {
              id: "financial_details",
              label: "Financial Details",
              status: "pending_validation",
              view: "loan-application-financial-details", // Link to a UI component
            },
            {
              id: "review_application",
              label: "Review Application",
              status: "pending_review",
            },
          ],
        },
        {
          id: "approval",
          label: "Approval",
          steps: [
            {
              id: "credit_check",
              label: "Credit Check",
              status: "in_progress",
            },
            {
              id: "approval_decision",
              label: "Approval Decision",
              status: "pending_approval",
            },
          ],
        },
        {
          id: "completion",
          label: "Completion",
          steps: [
            {
              id: "disburse_funds",
              label: "Disburse Funds",
              status: "completed",
            },
          ],
        },
      ]
    );
  }
}

module.exports = new LoanApplicationCase();
