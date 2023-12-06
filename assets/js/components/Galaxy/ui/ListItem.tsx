// @ts-ignore
import * as React from "react";

// type item as ExternalLink
interface Props {
    item: ExternalLink;
}

export default function ListItem({item}: Props) {
    return <a href={item.url} className="c-widget-edit">
        <div className="c-widget-edit__ico">
            <img src={item.icon} alt={item.name}/>
        </div>
        <div className="c-title c-title--h3">{item.name}</div>
    </a>
}
