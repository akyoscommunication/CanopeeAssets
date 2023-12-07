import React from "react";
import {WidgetContext, WidgetDispatchContext} from "@canopee_app/assets/react/provider/Widget/widgetCreateProvider";

const ListItem = React.memo(({ widget }) => {
	const widgetContext = React.useContext(WidgetContext);
	const dispatch = React.useContext(WidgetDispatchContext);
	
	const addWidget = () => {
		widgetContext.controller?.action('add', { widget: widget.id }).then(() => {
			widget = {
				...widget,
				instanceId: widgetContext.controller.valueStore.props.lastInstanceAdded,
			}
			
			dispatch({ type: 'add', payload: widget });
		})
	}
	
	const removeWidget = () => {
		widgetContext.controller?.action('remove', { instance: widget.instanceId }).then(() => {
			widget = {
				...widget,
				instanceId: null,
			}
			
			dispatch({ type: 'remove', payload: widget });
		})
	}
	
	return <div className={`c-widget-instance ${widget.instanceId ? 'added' : ''}`}>
		<div className="c-widget-instance__ico" onClick={() => {
			if (widget.instanceId) {
				removeWidget();
			} else {
				addWidget();
			}
		}}>
			{widget.instanceId ? <i className="icomoon-minus-circle"></i> : <i className="icomoon-plus-circle"></i>}
		</div>
		<div className="c-widget-instance__thumb">
			<img src={"/stream_document?file=/uploads/widget/"+widget.image} alt={widget.name}/>
		</div>
		<div className="c-widget-instance__content">
			<h3 className="c-title c-title--h3">{widget.name}</h3>
			<p className="c-text">{widget.description}</p>
		</div>
	</div>;
})

export default ListItem;
