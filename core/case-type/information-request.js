const BlazeCase = require("@blaze-case-ai/blaze-engine/core/case-type/blaze-case");

class IntakeCase extends BlazeCase {
  constructor() {
    super(
      "information-request", // Unique identifier for the Intake case type
      "Information Request", // Human-readable label for the Intake case type
      [
        {
          id: "initial_contact",
          label: "Initial Contact",
          steps: [
            {
              id: "receive_information",
              label: "Receive Information",
              status: "in_progress",
            },
            {
              id: "validate_information",
              label: "Validate Information",
              status: "pending_validation",
            },
          ],
        },
        {
          id: "review",
          label: "Review",
          steps: [
            {
              id: "review_details",
              label: "Review Details",
              status: "under_review",
            },
            {
              id: "finalize_review",
              label: "Finalize Review",
              status: "review_completed",
            },
          ],
        },
        {
          id: "completion",
          label: "Completion",
          steps: [
            { id: "close_case", label: "Close Case", status: "completed" },
          ],
        },
      ]
    );
  }

  // Optionally, override or extend any methods specific to IntakeCase
}

module.exports = new IntakeCase();
