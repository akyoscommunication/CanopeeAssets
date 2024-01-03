import {ActionTypes, States} from './types';

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.Filter:
            return {
                ...state,
                filter: action.payload
            };
        case ActionTypes.MarkAsRead:
            return {
                ...state,
                data: state.data.map((notification: any) => {
                    if (notification.id === action.payload) {
                        notification.state = States.Read;
                    }
                    return notification;
                }
            )};
        case ActionTypes.MarkAsUnread:
            return {
                ...state,
                data: state.data.map((notification: any) => {
                    if (notification.id === action.payload) {
                        notification.state = States.Unread;
                    }
                    return notification;
                }
            )};
        case ActionTypes.ToggleOpen:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case ActionTypes.MarkAllAsRead:
            return {
                ...state,
                data: state.data.map((notification: any) => {
                    notification.state = States.Read;
                    return notification;
                })
            }
        default:
            return state;
    }
}
