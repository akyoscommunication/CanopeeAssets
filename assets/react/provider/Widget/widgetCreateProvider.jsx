import React, {createContext, useEffect, useReducer} from "react";

export const WidgetContext = createContext({
	widgets: [],
	controller: null,
});
export const WidgetDispatchContext = createContext(null);

const reducer = (state, action) => {
	switch (action.type) {
		case 'add':
			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							instanceId: action.payload.instanceId,
						};
					}
					return widget;
				}),
			};
		case 'remove':
			// find widget in state by id and set alreadyAdded to false
			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							instanceId: null,
						};
					}
					return widget;
				}),
			};
		case 'setController':
			return {
				...state,
				controller: action.payload,
			}
		default:
			return state;
	}
}

export function WidgetCreateProvider({ widgets, controller, children }) {
	const [ws, dispatch] = useReducer(reducer, {
		widgets,
		controller,
	});
	
	useEffect(() => {
		if (controller) {
			dispatch({ type: 'setController', payload: controller });
		}
	}, [controller]);
	
	return (
		<WidgetContext.Provider value={ws}>
			<WidgetDispatchContext.Provider value={dispatch}>
				{children}
			</WidgetDispatchContext.Provider>
		</WidgetContext.Provider>
	);
}
