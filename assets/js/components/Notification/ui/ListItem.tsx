// @ts-ignore
import * as React from "react";
import { NotificationDispatcherContext } from "../provider";
import {ActionTypes, Notification, States} from "../types";

type ListItemProps = {
    notification: Notification
}

export default function ListItem({ notification } : ListItemProps) {
    const dispatch: any = React.useContext(NotificationDispatcherContext)

    // get minutes from createdAt since now
    // @ts-ignore
    const minutes = Math.floor((new Date() - new Date(notification.createdAt)) / 60000);
    const timeString = () => {
        if (notification.state === States.Read) return "Lu";
        if (minutes > 1440) return `Il y a ${Math.floor(minutes / 1440)} j`;
        if (minutes > 60) return `Il y a ${Math.floor(minutes / 60)} h`;
        if (minutes === 0) return "À l'instant";

        return `Il y a ${minutes} min`;
    }

    const goTo = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        fetch(`/notifications/assets/${notification.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
            body: JSON.stringify({
                state: States.Read,
            })
        }).then(() => {
            dispatch({ type: ActionTypes.MarkAsRead, payload: notification.id })
            window.open(notification.target, '_blank');
        })
    }

    return <a className="c-notification" href={notification.target} target="_blank" onClick={goTo}>
        <div className="c-notification__type">{notification.type}</div>
        <div className="c-notification__time">{timeString()}</div>
        <div className="c-notification__name">{notification.name}</div>
        <div className="c-badge c-badge--primary-500">{notification.module ? notification.module.name : 'Canopee'}</div>
    </a>
}
