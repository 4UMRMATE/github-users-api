import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faTh, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeView, toggleSortBar } from "../actions";

import SortBy from "./SortBy";

export function Panel() {
  const gridView = useSelector((state) => state.usersView);
  const sortBarDisplay = useSelector((state) => state.sortBarDisplay);
  const byNameAsc = useSelector((state) => state.sortByNameAsc);
  const byNameDesc = useSelector((state) => state.sortByNameDesc);
  const byFollowersAsc = useSelector((state) => state.sortByFollowersAsc);
  const dispatch = useDispatch();

  return (
    <div className="Panel">
      <div className="sort-options">
        <button
          className="sortButton"
          onClick={() => dispatch(toggleSortBar())}
        >
          <div className="sort-by">
            <p>{byNameAsc || byNameDesc ? "Name" : "Followers"}</p>
            <FontAwesomeIcon
              id="sort-arrow"
              icon={faArrowUp}
              style={
                byNameAsc || byFollowersAsc
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            />
            <div className="sort-by-options" style={{ display: "none" }}>
              <SortBy />
            </div>
          </div>
        </button>
        <div
          id="cover"
          style={sortBarDisplay ? { display: "flex" } : { display: "none" }}
          onClick={() => dispatch(toggleSortBar())}
        >
          <SortBy />
        </div>
      </div>
      <div className="view-options">
        {gridView ? (
          <button className="viewButton" onClick={() => dispatch(changeView())}>
            <FontAwesomeIcon icon={faThList} />
          </button>
        ) : (
          <button className="viewButton" onClick={() => dispatch(changeView())}>
            <FontAwesomeIcon icon={faTh} />
          </button>
        )}
      </div>
    </div>
  );
}
