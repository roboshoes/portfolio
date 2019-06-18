import * as React from "react";

import s from "./header.scss";

export const Header: React.FunctionComponent = () => (
    <header className={ s.header }>
        <span className={ s.bar }></span>
        <span className={ s.title }>MATHIAS PAUMGARTEN</span>
    </header>
);
