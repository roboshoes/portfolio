import * as React from "react";

import sharedStyles from "../../styles/shared.scss";

export const Contact: React.FunctionComponent = () => (
    <div>
        <div className={ sharedStyles.titleWrapper }>
            <div className={ sharedStyles.bar }></div>
            <div className={ sharedStyles.title }>CONTACT</div>
        </div>
        <div className={ sharedStyles.paragraph }>
            Let’s get in touch. There is a whole spectrum from the least personal of following me on
            social media, such as Instagram, Twitter, Codepen to a more personal note at
            mail@mathias-paumgarten.com.
        </div>
        <div className={ sharedStyles.paragraph }>
            If you need a PDF form of this, to hand it to the old founder of the agency you work at,
            I also have a Resume.
        </div>
    </div>
);
