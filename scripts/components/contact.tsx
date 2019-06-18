import classnames from "classnames";
import * as React from "react";

import ss from "../../styles/shared.scss";

export const Contact: React.FunctionComponent = () => (
    <div>
        <div className={ ss.titleWrapper }>
            <div className={ ss.bar }></div>
            <div className={ ss.title }>CONTACT</div>
        </div>
        <div className={ classnames( ss.paragraph, ss.textWrapper ) }>
            Let’s get in touch. There is a whole spectrum from the least personal of following me on
            social media, such as Instagram, Twitter, Codepen to a more personal note at
            mail@mathias-paumgarten.com.
        </div>
        <div className={ classnames( ss.paragraph, ss.textWrapper ) }>
            If you need a PDF form of this, to hand it to the old founder of the agency you work at,
            I also have a Resume.
        </div>
    </div>
);
