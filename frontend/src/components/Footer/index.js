import './Footer.css';
import vsCodeLogo from './images/vs_code.png'
import reduxLogo from './images/redux_logo.png'
import postgresLogo from './images/postgres_logo.png'
import herokuLogo from './images/heroku_logo.png'

function Footer() {
    return (
        <>

            <footer>

                <i className="fa-brands fa-js link-footer"></i>
                <i className="fa-brands fa-react link-footer"></i>
                <img src={reduxLogo} />
                <i className="fa-brands fa-node link-footer"></i>
                <img src={postgresLogo} />
                <i className="fa-brands fa-html5 link-footer"></i>
                <i className="fa-brands fa-css3-alt link-footer"></i>
                <i className="fa-brands fa-git-alt link-footer"></i>
                <img src={vsCodeLogo} />
                <img src={herokuLogo} />
                <i className="fa-brands fa-github link-footer"></i>
                <i className="fa-brands fa-linkedin-in link-footer"></i>
            </footer>
        </>
    )
}

export default Footer;
