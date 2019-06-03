import * as React from "react";

import sharedStyles from "../../styles/shared.scss";

export const Work: React.FunctionComponent = () => (
    <div>
        <div className={ sharedStyles.titleWrapper }>
            <div className={ sharedStyles.bar }></div>
            <div className={ sharedStyles.title }>WORK</div>
        </div>
        <div className={ sharedStyles.paragraph }>
            01 - 02 - 03 - Window Wonderland - 05
        </div>
    </div>
);
