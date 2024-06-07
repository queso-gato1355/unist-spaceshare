import Link from "next/link";

const ButtonLink = ({ href, children, ...rest }) => {
    return (
        <Link href={href} passHref>
            <button {...rest}>{children}</button>
        </Link>
    );
};

export default ButtonLink;
