// @ts-ignore
import * as React from "react";
import { GalaxyContext } from "./provider";
import Modal from "./ui/Modal";
import {positioningElement} from "../../utils/index";

export default function Galaxy({ url, modules, domains }) {
    const [state, setState] = React.useState({
        loading: true,
        error: false,
        isOpen: false,
        data: modules,
        domains: domains,
        activeCustomer: null
    } as any)

    const setActiveCustomer = (customer: string) => {
        setState((s: any) => ({ ...s, activeCustomer: customer }))
    }

    React.useEffect(() => {
        if (modules && Object.keys(modules).length > 0) {
            const firstCustomer = Object.keys(modules)[0]
            setState((s: any) => ({ ...s, activeCustomer: firstCustomer }))
        }
    }, [modules])

    const toggleOpen = () => {
        setState(s => ({ ...s, isOpen: !s.isOpen }))
    }

    React.useEffect(() => {
        if (modules) return;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const fetchedData = data['hydra:member']
                const firstCustomer = Object.keys(fetchedData)[0]
                setState({ ...state, loading: false, data: fetchedData, activeCustomer: firstCustomer })
            })
            .catch(error => setState({ ...state, loading: false, error }))
    }, [])

    // put the modal near the c-galaxy__ico
    React.useEffect(() => {
        const ico = document.querySelector('.c-galaxy__ico') as HTMLElement
        const modal = document.querySelector('.c-galaxy .c-modal') as HTMLElement
        const initialWidth = '25.75rem'

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

    return <GalaxyContext.Provider value={{ ...state, setActiveCustomer }}>
        <div className="c-galaxy">
            <div className="c-galaxy__ico" onClick={toggleOpen}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="c-icon" fill="currentColor">
                    <title>galaxy</title>
                    <path
                        d="M5.818 2.909c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M5.818 16c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M5.818 29.091c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M32 2.909c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M32 16c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M32 29.091c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M18.909 2.909c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M18.909 16c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                    <path
                        d="M18.909 29.091c0 1.607-1.302 2.909-2.909 2.909s-2.909-1.302-2.909-2.909c0-1.607 1.302-2.909 2.909-2.909s2.909 1.302 2.909 2.909z"></path>
                </svg>
            </div>
            <Modal isOpen={state.isOpen} toggleOpen={toggleOpen}/>
        </div>
    </GalaxyContext.Provider>
}
