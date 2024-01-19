// @ts-ignore
import React, {createContext} from "react";

export const NotificationContext = createContext({
    loading: true as boolean,
    error: false as boolean,
    isOpen: false as boolean,
    filter: '*' as string,
    data: [] as Notification[] | [],
});

export const NotificationDispatcherContext = createContext({});
