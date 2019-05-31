import * as React from "react";

import styles from "./header.scss";

export const Header: React.FunctionComponent = () => (
    <header className={ styles.header }>
        <span className={ styles.bar }></span>
        <span className={ styles.title }>MATHIAS PAUMGARTEN</span>
    </header>
);
