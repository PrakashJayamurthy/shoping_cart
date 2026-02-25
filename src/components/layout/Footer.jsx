import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__left">
          <span>© {new Date().getFullYear()} Equal Experts Store ci/cd test4778</span>
        </div>
        <div className="footer__right">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/cart" className="footer__link">
            Cart
          </Link>
        </div>
      </div>
    </footer>
  );
}
