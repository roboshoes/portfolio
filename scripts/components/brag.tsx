import classnames from "classnames";
import * as React from "react";

import ss from "../../styles/shared.scss";
import s from "./brag.scss";
import { Title } from "./title";
import { Wrapper } from "./wrapper";

export const Brag: React.FunctionComponent = () => (
    <Wrapper>
        <Title value="HUMBLE BRAG" />

        <div className={ classnames( ss.paragraph, ss.textWrapper ) }>
            Awards

            <ul>
                <li className={ s.item }>FWA</li>
                <li className={ s.item }>Awwward</li>
                <li className={ s.item }>Weeby's</li>
                <li className={ s.item }>Mozilla Game Award</li>
            </ul>

            Patents

            <ul>
                <li className={ s.item }>Systems and methods for interactive video generation and rendering</li>
                <li className={ s.item }>Public Defense</li>
            </ul>

            Publications

            <ul><li className={ s.item }>HTML5 Games Most Wanted</li></ul>
        </div>
    </Wrapper>
);
