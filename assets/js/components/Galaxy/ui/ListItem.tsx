// @ts-ignore
import * as React from "react";
import {GalaxyContext} from "../provider";

// type item as ExternalLink
interface Props {
    item: ExternalLink;
}

export default function ListItem({item}: Props) {
    const { domains } = React.useContext(GalaxyContext);

    // @ts-ignore
    let isBlank = '_blank';
    domains.forEach((domain: string) => {
        if(item.url.includes(domain)) {
            isBlank = '_self';
        }
    });

    return <a href={item.url} target={isBlank} className="c-galaxy-item">
        <div className="c-galaxy-item__ico">
            <img src={item.icon} alt={item.name}/>
        </div>
        <div className="c-title c-title--h3">{item.name}</div>
    </a>
}
