import Link from "next/link";

function Logo() {
    return (
        <Link
            href={"/"}
            className="Logo text-s md:text-2xl font-semibold md:font-bold  "
        >
            Next.js w/ Supabase
        </Link>
    );
}

export default Logo;
