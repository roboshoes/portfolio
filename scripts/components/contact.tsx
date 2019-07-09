import classnames from "classnames";
import * as React from "react";

import ss from "../../styles/shared.scss";
import { Title } from "./title";
import { Wrapper } from "./wrapper";
import { Text } from "./text";
import { Buffer } from "./buffer";

export const Contact: React.FunctionComponent<{ delay: number }> = ( { delay } ) => (
    <Wrapper>
        <Title value="CONTACT" delay={ delay }/>

        <div className={ ss.textWrapper }>
            <Text delay={ delay + 100 } text={`
                Let’s get in touch. There is a whole spectrum from the least personal of following me on
                social media, such as Instagram, Twitter, Codepen to a more personal note at
                mail@mathias-paumgarten.com.`} />

            <Buffer />

            <Text delay={ delay + 300 } text={`
                If you need a PDF form of this, to hand it to the old founder of the agency you work at,
                I also have a Resume.`} />

            <Buffer />
        </div>
    </Wrapper>
);
