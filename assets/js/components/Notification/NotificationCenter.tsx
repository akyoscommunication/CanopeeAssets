// @ts-ignore
import * as React from "react";
import {NotificationContext, NotificationDispatcherContext} from "./provider";
import {data} from "./data";
import {reducer} from "./reducer";
import {ActionTypes} from "./types";
import Modal from "./ui/Modal";
import { positioningElement } from "../../utils/index";

type NotificationCenterProps = {
    host: string,
    data: Array<Notification>
}

export default function NotificationCenter({host, data} : NotificationCenterProps) {
    const [state, dispatch] = React.useReducer(reducer, {
        loading: true,
        data,
        host,
        error: null,
        isOpen: false,
        filter: '*',
    })

    const toggleOpen = () => dispatch({ type: ActionTypes.ToggleOpen })

    React.useEffect(() => {
        // fetch('/api/notifications')
        //     .then(res => res.json())
        //     .then(data => setState({ ...state, loading: false, data: data['hydra:member'] }))
        //     .catch(error => setState({ ...state, loading: false, error }))
    }, [])

    React.useEffect(() => {
        const ico = document.querySelector('.c-notification-center__ico') as HTMLElement
        const modal = document.querySelector('.c-notification-center .c-modal') as HTMLElement
        const initialWidth = '412px'

        if (state.isOpen) {
            positioningElement(ico, modal, 50, 25, initialWidth)

            // check resize
            window.addEventListener('resize', () => {
                positioningElement(ico, modal, 50, 25, initialWidth)
            })

            window.addEventListener('scroll', () => {
                positioningElement(ico, modal, 50, 25, initialWidth)
            })
        }
    }, [state.isOpen])

    return <NotificationContext.Provider value={state}>
        <NotificationDispatcherContext.Provider value={dispatch}>
            <div className="c-notification-center">
                <div className="c-notification-center__ico" onClick={toggleOpen}>
                    <i className="icomoon-bell"></i>
                </div>
                <Modal toggleOpen={toggleOpen} isOpen={state.isOpen}/>
            </div>
        </NotificationDispatcherContext.Provider>
    </NotificationContext.Provider>
}
