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
    const [rand, setRand] = React.useState(0)

    const unRead = state.data.filter((notification: any) => notification.state === 'unread').length

    const toggleOpen = () => dispatch({ type: ActionTypes.ToggleOpen })

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

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.001) {
                setRand(1)
            } else {
                if (rand === 1) {
                    setRand(0)
                }
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [rand])

    return <NotificationContext.Provider value={state}>
        <NotificationDispatcherContext.Provider value={dispatch}>
            <div className={
                "c-notification-center "
                +(unRead ? 'c-notification-center--unread' : 'c-notification-center--read')
                +(" c-notification-center--animation-"+rand)
            }>
                <div className="c-notification-center__ico" onClick={toggleOpen}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="c-icon" fill="currentColor">
                        <title>bell</title>
                        <path
                            d="M25.585 17.944v0.068l0.064 0.023c0.923 0.326 1.722 0.93 2.288 1.728s0.872 1.752 0.874 2.731v3.227c0 0.402-0.16 0.788-0.444 1.073s-0.67 0.444-1.073 0.444h-5.141l-0.019 0.071c-0.366 1.347-1.165 2.536-2.274 3.383s-2.466 1.307-3.861 1.307c-1.396 0-2.753-0.459-3.861-1.307s-1.908-2.037-2.274-3.383l-0.019-0.071h-5.141c-0.402 0-0.788-0.16-1.073-0.444s-0.444-0.67-0.444-1.073v-3.227c0.003-0.979 0.308-1.933 0.874-2.731s1.365-1.402 2.288-1.728l0.065-0.023v-5.2c0.002-2.264 0.806-4.453 2.267-6.181s3.488-2.883 5.72-3.26l0.081-0.014v-1.841c0-0.402 0.16-0.788 0.444-1.073s0.67-0.444 1.073-0.444c0.402 0 0.788 0.16 1.073 0.444s0.444 0.67 0.444 1.073v1.841l0.081 0.014c2.232 0.377 4.258 1.532 5.72 3.26s2.265 3.918 2.267 6.181v5.131zM22.455 17.75h0.097v-4.938c0-1.738-0.69-3.404-1.919-4.633s-2.895-1.919-4.632-1.919c-1.738 0-3.404 0.69-4.633 1.919s-1.919 2.895-1.919 4.633v4.938h13.006zM13.225 27.238h-0.168l0.084 0.145c0.29 0.502 0.706 0.92 1.208 1.212s1.071 0.447 1.651 0.45h0.001c0.58-0.004 1.149-0.159 1.651-0.45s0.918-0.709 1.208-1.212l0.084-0.145h-5.719zM25.682 24.205h0.097v-1.71c0-0.454-0.18-0.889-0.501-1.209s-0.756-0.501-1.209-0.501h-16.136c-0.454 0-0.889 0.18-1.209 0.501s-0.501 0.756-0.501 1.209v1.71h19.46z"></path>
                    </svg>
                </div>
                {unRead > 0 && <div className="c-badge c-badge--size-xs c-badge--danger-500">{unRead > 10 ? <small>+9</small> : unRead}</div>}
                <Modal toggleOpen={toggleOpen} isOpen={state.isOpen}/>
            </div>
        </NotificationDispatcherContext.Provider>
    </NotificationContext.Provider>
}
