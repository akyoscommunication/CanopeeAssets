import {Notification, States, Module} from './types';

const Module1: Module = {
    id: 1,
    name: 'RH',
}

const Module2: Module = {
    id: 2,
    name: 'Timesheet',
}

export const data: Notification[] = Array.from({length: 5}, (v, k) => k + 4).map((id) => ({
    id,
    name: `Notification ${id}`,
    // randomly select a module
    module: Math.random() > 0.5 ? Module1 : Module2,
    type: 'Critical',
    // randomly generate a state
    state: Math.random() > 0.5 ? States.Read : States.Unread,
    // randomly generate a createdAt as string
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    target: 'https://www.google.com',
    actionNeeded: Math.random() > 0.5,
}))
