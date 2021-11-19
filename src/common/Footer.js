import React from "react";
import choreBoardLogo from "../assets/images/chore-board-logo.svg";

function Footer() {
    return (
        <div className="Footer">
            <img className="Footer__logo" src={choreBoardLogo} alt={"Chore Board Logo"}></img>
            <p className="Footer__copyright">&copy; Copyright 2021 </p>
        </div>
    );
};

export default Footer;