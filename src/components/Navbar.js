import ThemeSwitch from "./ThemeSwitch";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div id="logo">
        <Link id="logo-link" to="/">
          <h1>Github Users</h1>
        </Link>
      </div>
      <SearchBar />
      <ThemeSwitch />
    </div>
  );
}
