import React from "react";

function Footer({ font }: { font: string }) {
    return (
        <footer
            className={`py-[2vh] px-[4vh] bg-secondary text-secondary-content ${font}`}
        >
            All Rights deserverd&copy;
        </footer>
    );
}

export default Footer;
