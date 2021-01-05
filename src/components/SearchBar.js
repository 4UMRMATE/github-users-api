import React, { useState, useEffect, useRef } from "react";
import octokit from "./Octokit";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toggleResults } from "../actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const searchUser = async (user) => {
  let searchResults = [];
  try {
    return await octokit
      .request(`GET https://api.github.com/search/users?q=${user}`)
      .then((response) => {
        if (response.data.items.length > 0) {
          for (let i = 0; i < 3; i++) {
            if (response.data.items[i] !== undefined) {
              searchResults.push({
                name: response.data.items[i].login,
                image: response.data.items[i].avatar_url,
              });
            }
          }
        }
        return searchResults;
      });
  } catch (error) {
    console.error(error);
  }
};

export default function SearchBar() {
  const [inputUser, setInputUser] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsDisplay, setSuggestionsDisplay] = useState(false);
  const [visitsDisplay, setVisitsDisplay] = useState(true);

  const resultsDisplay = useSelector((state) => state.toggleResults);
  const myRef = useRef();
  const dispatch = useDispatch();

  let recentVisits = [];
  if (sessionStorage.recentVisits) {
    recentVisits = JSON.parse(sessionStorage.recentVisits);
  }

  const handleInput = (e) => {
    setInputUser(e.target.value);
    if (e.target.value.length >= 3) {
      setVisitsDisplay(false);
      setSuggestionsDisplay(true);

      searchUser(e.target.value).then((searchResults) =>
        setSuggestions(searchResults)
      );
    } else {
      setSuggestions([]);
      setVisitsDisplay(true);
      setSuggestionsDisplay(false);
    }
  };

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      dispatch(toggleResults(false));
    }
  };

  const handleClickInside = () => dispatch(toggleResults(true));

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="SearchBar" ref={myRef}>
      <form className="search-form">
        <input
          id="search-input"
          type="text"
          onChange={handleInput}
          value={inputUser}
          autoComplete="off"
          onClick={handleClickInside}
          style={
            resultsDisplay
              ? { borderBottom: "4px solid var(--color-link)" }
              : { border: "" }
          }
        />
        <button id="submit">
          <Link to={`/${inputUser}`}>
            <FontAwesomeIcon id="search-icon" icon={faSearch} />
          </Link>
        </button>
      </form>
      <div
        className="search-results"
        style={resultsDisplay ? { display: "flex" } : { display: "none" }}
      >
        <div
          className="suggestions"
          style={suggestionsDisplay ? { display: "flex" } : { display: "none" }}
        >
          <h2 className="result-title">Suggestions</h2>
          {suggestions.map((suggestion, idx) => {
            return (
              <a
                className="suggestion"
                href={`/${suggestion.name}`}
                key={idx}
                tabIndex="0"
              >
                <img
                  src={suggestion.image}
                  alt="avatar"
                  width="100"
                  height="100"
                ></img>
                <li className="suggestion-name">{suggestion.name}</li>
              </a>
            );
          })}
        </div>
        <div
          className="recent-visits"
          style={visitsDisplay ? { display: "flex" } : { display: "none" }}
        >
          <h2 className="result-title">Recent Searches</h2>
          {recentVisits.map((recentVisit, idx) => {
            return (
              <a className="visited" href={`/${recentVisit.name}`} key={idx}>
                <img
                  src={recentVisit.image}
                  width="100"
                  height="100"
                  alt="avatar"
                ></img>
                <li className="suggestion-name">{recentVisit.name}</li>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
