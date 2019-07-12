import * as React from "react";

export const Buffer: React.FunctionComponent<{ height?: number }> =
    ( { height } ) => <div style={ { height: height || 15 } }></div>;
