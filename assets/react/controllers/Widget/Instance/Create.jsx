import React, {useEffect, useReducer, useRef, useState} from 'react';
import List from "@canopee_app/assets/react/components/Widget/List";
import {WidgetCreateProvider} from "@canopee_app/assets/react/provider/Widget/widgetCreateProvider";
import {getComponent} from "@symfony/ux-live-component";

export default function ({ widgets, instances, controller }) {
	const [state, setState] = useState({
		loading: false,
		controller: null,
	});
	const dialog = useRef(null);
	
	const widgetAlreadyAdded = widget => {
		return instances.find(instance => instance.widget.id === widget.id);
	}
	
	const initWidgets = widgets.map(widget => {
		return {
			...widget,
			instanceId: widgetAlreadyAdded(widget)?.id,
		};
	})
	
	const toggleIsOpen = () => {
		if (dialog.current.open) {
			dialog.current.close();
		} else {
			dialog.current.showModal();
		}
	}
	
	const fetchComponent = async () => {
		const component = await getComponent(document.querySelector(`*[data-live-id=${controller}]`));
		setState({ ...state, controller: component });
	}
	
	useEffect(() => {
		dialog.current && dialog.current.addEventListener('click', evt => {
			if (evt.target === dialog.current) {
				toggleIsOpen();
			}
		})
	}, []);
	
	useEffect(() => {
		fetchComponent().catch(err => console.error(err));
	}, []);
	
	return <WidgetCreateProvider widgets={initWidgets} controller={state.controller}>
		<a className="c-button c-button--primary c-button--style-default" onClick={toggleIsOpen}>
			<div className="c-button__ico">
				<i className="icomoon-create-dashboard"></i>
			</div>
			Ajouter un widget
		</a>
		<dialog className="c-modal c-modal--widget" ref={dialog}>
			<div className="c-modal__content">
				<List />
			</div>
		</dialog>
	</WidgetCreateProvider>;
}
