import * as React from "react";

import s from "./header.scss";
import { Wrapper } from "./wrapper";

export const Header: React.FunctionComponent = () => (
    <Wrapper>
        <header className={ s.header }>
            <span className={ s.bar }></span>
            <span className={ s.title }>MATHIAS PAUMGARTEN</span>
        </header>
    </Wrapper>
);
