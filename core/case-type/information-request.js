const BlazeCase = require("@blaze-case-ai/blaze-engine/core/case-type/blaze-case");

class InformationRequestCase extends BlazeCase {
  constructor() {
    super(
      "information-request",
      "Information Request",
      [
  {
    "id": "initial_contact",
    "label": "Initial Contact",
    "steps": [
      {
        "id": "receive_information",
        "label": "Receive Information",
        "status": "in_progress",
        "type": "manual"
      },
      {
        "id": "validate_information",
        "label": "Validate Information",
        "status": "pending_validation",
        "type": "manual"
      }
    ]
  },
  {
    "id": "review",
    "label": "Review",
    "steps": [
      {
        "id": "review_details",
        "label": "Review Details",
        "status": "under_review",
        "type": "manual"
      },
      {
        "id": "finalize_review",
        "label": "Finalize Review",
        "status": "review_completed",
        "type": "manual"
      }
    ]
  },
  {
    "id": "completion",
    "label": "Completion",
    "steps": [
      {
        "id": "close_case",
        "label": "Close Case",
        "status": "completed",
        "type": "manual"
      }
    ]
  },
]
    );
  }
}

module.exports = new InformationRequestCase();