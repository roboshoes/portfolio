import classnames from "classnames";
import * as React from "react";

import ss from "../../styles/shared.scss";
import { Title } from "./title";
import { Wrapper } from "./wrapper";
import { Text } from "./text";
import { Buffer } from "./buffer";
import { Link } from "./link";

export const Contact: React.FunctionComponent<{ delay: number }> = ( { delay } ) => (
    <Wrapper>
        <Title value="CONTACT" delay={ delay }/>

        <div className={ ss.textWrapper }>
            <Text delay={ delay + 100 } >
                Let’s get in touch. There is a whole spectrum from the least personal of following me on
                social media, such as <Link href="https://instagram.com/roboshoes">Instagram</Link>
                , <Link href="https://twitter.com/roboshoes">Twitter</Link>
                , <Link href="https://codepen.io/roboshoes">Codepen</Link> to a more personal note
                at <Link href="mailto:mail@mathias-paumgarten.com">mail@mathias-paumgarten.com</Link>.
            </Text>

            <Buffer />
        </div>
    </Wrapper>
);
