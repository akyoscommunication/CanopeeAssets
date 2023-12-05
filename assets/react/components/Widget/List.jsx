import React, {useContext, useState} from "react";
import ListItem from "@canopee_app/assets/react/components/Widget/ListItem";
import {WidgetContext} from "@canopee_app/assets/react/provider/Widget/widgetCreateProvider";

export default function ({ loading }) {
	const widgetContext = useContext(WidgetContext);
	const [state, setState] = useState({
		search: '',
	});
	
	const filterWidgets = () => {
		if (!state.search) {
			return widgetContext.widgets;
		}
		
		return widgetContext.widgets.filter(widget => widget.name.toLowerCase().includes(state.search.toLowerCase()));
	}
	
	return <>
		<header className="c-modal__header">
			<h2 className="c-title c-title--h2">Widgets</h2>
			<div className="form-group">
				<label htmlFor="search">Rechercher</label>
				<input
					type="search"
					placeholder="Rechercher"
					id="search"
					value={state.search}
					onChange={e => setState({ ...state, search: e.target.value })}
				/>
			</div>
		</header>
		{loading && <div>Loading...</div>}
		{filterWidgets().map(widget => <ListItem key={widget.id} widget={widget} />)}
	</>;
}
