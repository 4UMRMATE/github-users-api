import "../assets/css/footer.css";
import icoFB from "../assets/images/footer-ico/FB.png";
import icoCP from "../assets/images/footer-ico/CP.png";
import icoGM from "../assets/images/footer-ico/GM.png";
import icoGH from "../assets/images/footer-ico/GH.png";
import icoLN from "../assets/images/footer-ico/LN.png";

export default function Footer() {
  return (
    <div className="Footer">
      <footer className="footer-container">
        <ul className="footer-info links">
          <a
            href="https://www.facebook.com/SICH007"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={icoFB} alt="icon" />
          </a>
          <a
            href="https://codepen.io/4umrmate"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={icoCP} alt="icon" />
          </a>
          <a href="mailto:sich.mate@gmail.com" target="_blank" rel="noreferrer">
            <img className="icon" src={icoGM} alt="icon" />
          </a>
          <a
            href="https://github.com/4UMRMATE"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={icoGH} alt="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/4umrmate/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={icoLN} alt="icon" />
          </a>
        </ul>
        <ul className="footer-info">
          <li>
            <span>Author: Mate Sichinava</span>
          </li>
          <li>&copy; Copyright 2021</li>
        </ul>
      </footer>
    </div>
  );
}
