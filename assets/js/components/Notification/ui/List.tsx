// @ts-ignore
import * as React from "react";
import { NotificationContext } from "../provider";
import { Notification } from "../types";
import ListItem from "./ListItem";

export default function List() {
    const state = React.useContext(NotificationContext)

    const filteredData: any = state.data.filter((notification: Notification) => notification.state === state.filter || state.filter === '*')
    // order by createdAt
    filteredData.sort((a: Notification, b: Notification) => {
        if (a.createdAt > b.createdAt) {
            return -1
        }
        if (a.createdAt < b.createdAt) {
            return 1
        }
        return 0
    })

    // emoji triste si pas de notifications

    return <ul className="c-notifications">
        {filteredData.length === 0 && <li className="c-notification c-notification--empty">Oh non ... il n'y a pas de notifications 😢</li>}
        {filteredData.map((notification: Notification) => <li key={notification.id}><ListItem notification={notification}/></li>)}
    </ul>
}
