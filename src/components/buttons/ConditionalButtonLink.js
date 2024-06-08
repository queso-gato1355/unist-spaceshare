"use client";

import ButtonLink from "./ButtonLink";

export default function ConditionalButtonLink({ hrefWhenTrue, hrefWhenFalse, baseValue, children, ...rest}) {

    return (
        <ButtonLink
            href={baseValue ? hrefWhenTrue : hrefWhenFalse}
            {...rest}
        >
            {children}
        </ButtonLink>
    );
}
