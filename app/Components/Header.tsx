import React from "react";
import Logo from "./Logo";
import Upload from "./Upload";
import Tasks from "./Tasks";

function Header() {
    return (
        <header className=" py-[2vh] px-[4vw] flex justify-between items-center shadow-md shadow-secondary">
            <Logo />
            <Tasks />
            <Upload />
        </header>
    );
}

export default Header;
