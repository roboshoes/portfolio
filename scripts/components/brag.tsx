import * as React from "react";

import sharedStyles from "../../styles/shared.scss";
import styles from "./brag.scss";

export const Brag: React.FunctionComponent = () => (
    <div>
        <div className={ sharedStyles.titleWrapper }>
            <div className={ sharedStyles.bar }></div>
            <div className={ sharedStyles.title }>HUMBLE BRAG</div>
        </div>
        <p className={ sharedStyles.paragraph }>
        Awards
        <ul>
            <li className={ styles.item }>FWA</li>
            <li className={ styles.item }>Awwward</li>
            <li className={ styles.item }>Weeby's</li>
            <li className={ styles.item }>Mozilla Game Award</li>
        </ul>
        Patents
        <ul>
            <li className={ styles.item }>Systems and methods for interactive video generation and rendering</li>
            <li className={ styles.item }>Public Defense</li>
        </ul>
        Publications
        <ul><li className={ styles.item }>HTML5 Games Most Wanted</li></ul>
        </p>
    </div>
);
