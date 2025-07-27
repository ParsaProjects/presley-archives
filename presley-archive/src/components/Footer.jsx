import "./Footer.css";
import { Link } from "react-router-dom";

function Footer(){
    return (
        <footer>
            <div className="footer-container">

                <div className="footer-links">
                    <h2>stay in touch</h2>
                    <a href="https://www.depop.com/presley_archive/">depop</a>
                    <a href="https://www.instagram.com/presley_archive/">instagram</a>
                </div>

                <div className="info">
                    <h2>info</h2>
                    <Link to="/info/Shipping">shipping & returns</Link>
                    <Link to="/info/Authenticity">authenticity</Link>
                </div>
            </div>
            <p className="footer-text">© 2025 presley archive</p>
        </footer>

    );

}

export default Footer;