// @ts-ignore
import * as React from "react";
import { GalaxyContext } from "../provider";
import ListItem from "./ListItem";

export default function List() {
    const { data } = React.useContext(GalaxyContext);

    return <ul className="l-grid l-grid--4 l-grid--2:lg l-grid--1:md">
        {data?.map((item, index) => <li key={index}><ListItem item={item}/></li>)}
    </ul>
}
