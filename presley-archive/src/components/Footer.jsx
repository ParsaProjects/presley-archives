import "./Footer.css";

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
                    <a href="/shipping">shipping & returns</a>
                    <a href="/authenticity">authenticity</a>
                </div>
            </div>
            <p className="footer-text">© 2025 Presley Archive</p>
        </footer>

    );

}

export default Footer;