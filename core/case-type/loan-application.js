const BlazeCase = require("@blaze-case-ai/blaze-engine/core/case-type/blaze-case");

class LoanApplicationCase extends BlazeCase {
  constructor() {
    super(
      "loan-application",
      "Loan Application",
      [
  {
    "id": "application",
    "label": "Application",
    "steps": [
      {
        "id": "personal_details",
        "label": "Personal Details",
        "status": "in_progress",
        "view": "loan-application-personal-details",
        "type": "manual"
      },
      {
        "id": "financial_details",
        "label": "Financial Details",
        "status": "pending_validation",
        "view": "loan-application-financial-details",
        "type": "manual"
      },
      {
        "id": "review_application",
        "label": "Review Application",
        "status": "pending_review",
        "type": "manual"
      }
    ]
  },
  {
    "id": "approval",
    "label": "Approval",
    "steps": [
      {
        "id": "credit_check",
        "label": "Credit Check",
        "status": "in_progress",
        "type": "manual"
      },
      {
        "id": "approval_decision",
        "label": "Approval Decision",
        "status": "pending_approval",
        "type": "manual"
      }
    ]
  },
  {
    "id": "completion",
    "label": "Completion",
    "steps": [
      {
        "id": "disburse_funds",
        "label": "Disburse Funds",
        "status": "completed",
        "type": "manual"
      }
    ]
  }
]
    );
  }
}

module.exports = new LoanApplicationCase();