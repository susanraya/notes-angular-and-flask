"""US-011 "Host notes data in India": the notes_db component is required to run on
infrastructure located in India (see docs/sdlc/traceability-matrix.md and the India
data-residency rules this project is built under).

There is no code-level signal for where the PostgreSQL server physically runs --
`DATABASE_URL` is just a connection string, and no view or column records a region. That
is a property of which AWS region the client's account deploys the database into, decided
at infrastructure/deployment time, not something a pytest run against the app's own code
can observe or assert. Covering it needs the deployment configuration (e.g. the AWS region
in the IaC/deployment manifest) reviewed directly, not a test against this repository's
application code.
"""

import pytest


@pytest.mark.skip(
    reason=(
        "US-011 'host notes data in India' is a deployment/infrastructure property (the "
        "AWS region PostgreSQL runs in) -- it has no application-level signal to assert "
        "against from here. Verify by inspecting the deployment's region configuration, "
        "not by a test against this repository's code."
    )
)
def test_notes_db_runs_in_an_india_region() -> None:
    raise AssertionError("not observable from application code; see module docstring")
