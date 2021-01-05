import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  sortByNameAsc,
  sortByNameDesc,
  sortByFollowersAsc,
  sortByFollowersDesc,
} from "../actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function SortBy() {
  const sortBarDisplay = useSelector((state) => state.sortBarDisplay);
  const byNameAsc = useSelector((state) => state.sortByNameAsc);
  const byNameDesc = useSelector((state) => state.sortByNameDesc);
  const byFollowersAsc = useSelector((state) => state.sortByFollowersAsc);
  const byFollowersDesc = useSelector((state) => state.sortByFollowersDesc);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = sortBarDisplay ? "hidden" : "";
  });

  return (
    <div className="SortBy">
      <ul className="options">
        {sortBarDisplay ? (
          <li className="options-title">
            <h1>Sort by</h1>
          </li>
        ) : (
          ""
        )}
        <li
          className={`option ${byNameAsc ? "active-sort" : ""}`}
          onClick={() => dispatch(sortByNameAsc())}
        >
          Name <FontAwesomeIcon icon={faArrowUp} />
        </li>
        <li
          className={`option ${byNameDesc ? "active-sort" : ""}`}
          onClick={() => dispatch(sortByNameDesc())}
        >
          Name <FontAwesomeIcon icon={faArrowDown} />
        </li>
        <li
          className={`option ${byFollowersAsc ? "active-sort" : ""}`}
          onClick={() => dispatch(sortByFollowersAsc())}
        >
          Followers <FontAwesomeIcon icon={faArrowUp} />
        </li>
        <li
          className={`option ${byFollowersDesc ? "active-sort" : ""}`}
          onClick={() => dispatch(sortByFollowersDesc())}
        >
          Followers <FontAwesomeIcon icon={faArrowDown} />
        </li>
      </ul>
    </div>
  );
}
