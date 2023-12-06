// @ts-ignore
import * as React from "react";
import List from "./List";

export default function Modal({ isOpen, toggleOpen }) {
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

    return <dialog className="c-modal c-modal--widget" ref={modalRef}>
        <div className="c-modal__content">
            <header className="c-modal__header">
                <h2 className="c-title c-title--h2">Galaxie</h2>
            </header>
            <List />
        </div>
    </dialog>
}
