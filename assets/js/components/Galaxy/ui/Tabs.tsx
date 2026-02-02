// @ts-ignore
import * as React from "react";
import { GalaxyContext } from "../provider";

export default function Tabs() {
    const { data, activeCustomer, setActiveCustomer } = React.useContext(GalaxyContext);
    
    const customers = Object.keys(data);

    if (customers.length <= 1) {
        return null;
    }

    return <div className="c-tabs c-tabs--galaxy">
        <ul className="c-tabs__list">
            {customers.map((customer, index) => (
                <li 
                    key={index} 
                    className={`c-tabs__item ${activeCustomer === customer ? 'active' : ''}`}
                    onClick={() => setActiveCustomer(customer)}
                >
                    <button className="c-tabs__button" type="button">
                        {customer}
                    </button>
                </li>
            ))}
        </ul>
    </div>
}