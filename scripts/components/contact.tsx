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
                social media, such as <Link>Instagram</Link>, Twitter, Codepen to a more personal note at
                mail@mathias-paumgarten.com.
            </Text>

            <Buffer />
        </div>
    </Wrapper>
);
