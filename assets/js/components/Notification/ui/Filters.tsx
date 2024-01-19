// @ts-ignore
import * as React from "react";
import {NotificationContext, NotificationDispatcherContext} from "../provider";
import {States} from "../types";

export default function Filters() {
    const stateContext = React.useContext(NotificationContext)
    const dispatch: any = React.useContext(NotificationDispatcherContext)

    const filter = (state: string) => dispatch({ type: 'filter', payload: state })

    return <ul className="c-filter c-filter--style-3">
        <li className={"c-filter__item"+(stateContext.filter === "*" ? " active" : "")} onClick={() => filter('*')}>Toutes</li>
        {Object.keys(States).map((state, index) => <li key={index} className={`c-filters__item ${stateContext.filter === States[state] ? " active" : ""}`} onClick={() => filter(States[state])}>{States[state]}</li>)}
    </ul>
}
