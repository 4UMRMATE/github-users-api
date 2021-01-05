import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function GoBack() {
  return (
    <div className="GoBack">
      <Link to="/">
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </Link>
    </div>
  );
}
