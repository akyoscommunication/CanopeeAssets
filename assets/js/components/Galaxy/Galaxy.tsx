// @ts-ignore
import * as React from "react";
import { GalaxyContext } from "./provider";
import Modal from "./ui/Modal";
import {positioningElement} from "../../utils/index";

export default function Galaxy({ url }) {
    const [state, setState] = React.useState({
        loading: true,
        error: false,
        isOpen: false,
        data: null
    } as any)

    const toggleOpen = () => {
        setState(s => ({ ...s, isOpen: !s.isOpen }))
    }

    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setState({ ...state, loading: false, data: data['hydra:member'] }))
            .catch(error => setState({ ...state, loading: false, error }))
    }, [])

    // put the modal near the c-galaxy__ico
    React.useEffect(() => {
        const ico = document.querySelector('.c-galaxy__ico') as HTMLElement
        const modal = document.querySelector('.c-galaxy .c-modal') as HTMLElement

        if (state.isOpen) {
            positioningElement(ico, modal)

            // check resize
            window.addEventListener('resize', () => {
                positioningElement(ico, modal)
            })

            window.addEventListener('scroll', () => {
                positioningElement(ico, modal)
            })
        }
    }, [state.isOpen])

    return <GalaxyContext.Provider value={state}>
        <div className="c-galaxy">
            <div className="c-galaxy__ico" onClick={toggleOpen}>
                <i className="icomoon-galaxy"></i>
            </div>
            <Modal isOpen={state.isOpen} toggleOpen={toggleOpen}/>
        </div>
    </GalaxyContext.Provider>
}
