import classnames from "classnames";
import * as React from "react";

import ss from "../../styles/shared.scss";
import { observeRoute } from "../services/router";
import { DETAIL_ROUTE } from "./detail";

export const Wrapper: React.FunctionComponent = ( { children } ) => {
    const [ hidden, setHidden ] = React.useState( false );

    React.useEffect( () => {
        const subscription = observeRoute( DETAIL_ROUTE ).subscribe( on => setHidden( on ) );

        return () => {
            subscription.unsubscribe();
        };
    }, [] );

    return <div className={ classnames( ss.hidable, { [ ss.hidden ]: hidden } ) }>
        { children }
    </div>;
};
