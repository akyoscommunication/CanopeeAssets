// @ts-ignore
import * as React from "react";
import { GalaxyContext } from "../provider";
import ListItem from "./ListItem";

export default function List() {
    const { data } = React.useContext(GalaxyContext);

    const customers = Object.keys(data);

    return <div className="c-modal__body">
        {customers.map((customer, index) => {
            return <div key={index} className="c-widget">
                <div className="c-widget__header">
                    <h3 className="c-title c-title--h3">{customer}</h3>
                </div>
                <ul className="l-grid l-grid--4 l-grid--2:lg l-grid--1:md">
                    {data[customer].map((item, index) => <li key={index}><ListItem item={item}/></li>)}
                </ul>
            </div>
        })}
    </div>
}
