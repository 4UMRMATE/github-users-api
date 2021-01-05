import avatar from "../assets/images/GithubAvatar.png";

import GoBack from "./GoBack";

export default function NotFound() {
  return (
    <div className="NotFound">
      <GoBack />
      <div className="error-info">
        <h1>Error 404</h1>
        <img src={avatar} alt="error-image"></img>
        <h3>Sorry,</h3>
        <h4>This isn't the page you're looking for</h4>
        <h4>Try different search or go back to landing page</h4>
      </div>
    </div>
  );
}
