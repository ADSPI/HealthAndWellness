import React from 'react';
import "./footer.css";
import {Link, withRouter} from 'react-router-dom';

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '30px',
  width: '100%',
}

function Footer({ children }) {

    const sobeParaOTopo = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
        <div style={phantom} />
            <div style={style}>
                <center>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://client-health-wellness.herokuapp.com/"> health-wellness.com</a> |  • <Link to="/">Página inicial</Link>  • <Link onClick={() => sobeParaOTopo()}>Início da página</Link>
                </center>
            </div>
        </div>
    )
}

export default Footer;