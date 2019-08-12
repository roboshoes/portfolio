import * as React from "react";

import s from "./link.scss";

export const Link: React.FunctionComponent<{ href: string }> = ( { href, children } ) =>
    <a className={ s.wrapper } href={ href } target="_blank">{ children }</a>;
