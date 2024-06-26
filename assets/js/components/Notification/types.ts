// Entity: Notification
// @ts-ignore
export type Notification = {
    id: number;
    name: string;
    module: Module;
    type: string;
    createdAt: string;
    target: string;
    state: States;
    actionNeeded: boolean;
};

export enum States {
    Read = 'read',
    Unread = 'unread'
}

export type Module = {
    id: number;
    name: string;
}

// Type: ActionTypes
export enum ActionTypes {
    Filter = 'filter',
    MarkAsRead = 'markAsRead',
    MarkAsUnread = 'markAsUnread',
    ToggleOpen = 'toggleOpen',
    MarkAllAsRead = "markAllAsRead"
}
