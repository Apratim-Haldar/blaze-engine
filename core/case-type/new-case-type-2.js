const BlazeCase = require("@blaze-case-ai/blaze-engine/core/case-type/blaze-case");

class NewCaseType2Case extends BlazeCase {
  constructor() {
    super(
      "new-case-type-2",
      "new case type 2",
      [
  {
    "id": "stage1",
    "label": "Stage 1",
    "steps": [
      {
        "id": "step1",
        "label": "Step 1",
        "status": "pending",
        "view": "summary"
      },
      {
        "id": "step2",
        "label": "Step 2",
        "status": "confirmed",
        "view": "confirmation"
      }
    ]
  }
]
    );
  }
}

module.exports = new NewCaseType2Case();