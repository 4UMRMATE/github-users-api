import React, { useState } from "react";
import "../assets/css/switch.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  const setThemeMode = () => {
    let root = document.documentElement;

    if (darkMode) {
      root.style.setProperty("--color-prime", "#24292e");
      root.style.setProperty("--color-main-canvas", "#eaeaea");
      root.style.setProperty("--color-alt-canvas", "#f6f8fa");
    } else {
      root.style.setProperty("--color-prime", "#c9d1d9"); // #24292e
      root.style.setProperty("--color-main-canvas", "#0d1117");
      root.style.setProperty("--color-alt-canvas", "#161b22");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="ThemeSwitch">
      <ul className="radio-switch ">
        <li className="radio-switch__item">
          <input
            className="radio-switch__input sr-only"
            type="radio"
            name="radio-switch-name"
            id="radio-1"
            onChange={setThemeMode}
          />
          <label className="radio-switch__label" htmlFor="radio-1">
            <FontAwesomeIcon icon={faSun} />
          </label>
        </li>

        <li className="radio-switch__item">
          <input
            className="radio-switch__input sr-only"
            type="radio"
            name="radio-switch-name"
            id="radio-2"
            onChange={setThemeMode}
          />
          <label className="radio-switch__label" htmlFor="radio-2">
            <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
          </label>
          <div
            aria-hidden="true"
            id="theme-marker"
            className="radio-switch__marker"
          ></div>
        </li>
      </ul>
    </div>
  );
}
