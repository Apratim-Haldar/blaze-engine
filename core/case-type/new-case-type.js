const BlazeCase = require("@blaze-case-ai/blaze-engine/core/case-type/blaze-case");

class NewCaseTypeCase extends BlazeCase {
  constructor() {
    super(
      "new-case-type",
      "new case type",
      [
  {
    "id": "stage-1",
    "label": "Stage 1",
    "steps": [
      {
        "id": "step-1",
        "label": "Step 1",
        "status": "development",
        "view": "dev",
        "type": "manual"
      }
    ]
  }
]
    );
  }
}

module.exports = new NewCaseTypeCase();