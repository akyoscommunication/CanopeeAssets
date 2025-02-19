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

    React.useEffect(() => {
      // console.log(notification)
    })

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
            window.open(notification.target,'_self');
        })
    }

    return <a className="c-notification" href={notification.target} onClick={goTo}>
        <div className="c-notification__type">{notification.type}</div>
        <div className="c-notification__time">{timeString()}</div>
        <div className="c-notification__name">
            {
                notification.actionNeeded &&
		        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" className="c-icon mr-2 color-danger-500" fill="currentColor">
			        <path fill="currentColor"
			              d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15t75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26t-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19t-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z"/>
		        </svg>
            }
            {notification.name}
        </div>
        <div className="c-badge c-badge--primary-500">{notification.module ? notification.module.name : 'Canopee'}</div>
    </a>
}
