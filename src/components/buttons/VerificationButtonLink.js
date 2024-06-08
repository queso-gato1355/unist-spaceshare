'use client';

import ConditionalButtonLink from "./ConditionalButtonLink";
import UserContext from "@/context/UserContext";
import { useContext, useState, useEffect } from "react";

export default function VerificationButtonLink({href, children, ...rest}) {
    const { user } = useContext(UserContext);

    return (
        <ConditionalButtonLink
            baseValue={user}
            hrefWhenTrue={href}
            hrefWhenFalse="/login"
            {...rest}
        >
            {children}
        </ConditionalButtonLink>
    );

}