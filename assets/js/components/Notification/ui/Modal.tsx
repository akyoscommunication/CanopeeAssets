// @ts-ignore
import * as React from "react";
import {NotificationContext, NotificationDispatcherContext} from "../provider";
import Filters from "./Filters";
import List from "./List";
import {ActionTypes} from "../types";

export default function Modal({ isOpen, toggleOpen }) {
    const dispatch: any = React.useContext(NotificationDispatcherContext)
    const state: any = React.useContext(NotificationContext)
    const modalRef = React.useRef(null)

    React.useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [isOpen])

    React.useEffect(() => {
        modalRef.current && modalRef.current.addEventListener('click', evt => {
            if (evt.target === modalRef.current) {
                toggleOpen();
            }
        })
    }, []);

    return <dialog className="c-modal c-modal--notification" ref={modalRef}>
        <div className="c-modal__content">
            <header className="c-modal__header l-grid l-grid--2 l-grid--1:md">
                <h2 className="c-title c-title--h2 l-grid-col--12">Notifications</h2>
                <Filters/>
                <div className="c-link l-grid-col--end l-grid-col--middle" onClick={() => dispatch({ type: ActionTypes.MarkAllAsRead })}>Marquer comme lu</div>
            </header>
            <List/>
        </div>
        <footer className="c-modal__footer">
            <a href={state.host+"/notifications"} target="_blank" className="c-link">Voir toutes les notifications</a>
        </footer>
    </dialog>
}
