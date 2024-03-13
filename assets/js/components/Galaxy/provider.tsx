// @ts-ignore
import React, {createContext} from "react";

export const GalaxyContext = createContext({
    loading: true as boolean,
    error: false as boolean,
    isOpen: false as boolean,
    data: [] as ExternalLink[] | [],
    domains: [] as string[] | []
});
