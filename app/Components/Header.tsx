import React from "react";
import Logo from "./Logo";
import Upload from "./Upload";

function Header() {
    return (
        <header className=" py-[2vh] px-[4vw] flex justify-between shadow-md shadow-secondary">
            <Logo />
            <Upload />
        </header>
    );
}

export default Header;
