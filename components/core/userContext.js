import React, { useReducer } from 'react';

const UserContext = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'actionOne':
			return {
				...state,
			};
		case 'actionTwo':
			return {
				...state,
			};
		default:
			return state;
	}
};

const UserContextProvider = props => {
	const [state, dispatch] = React.useReducer(reducer, {user: '0'});

	return (
		<UserContext.Provider
			value={ {
				...state,
				actionOne: () => dispatch({ type: "actionOne", payload: 'props' }),
				actionTwo: () => dispatch({ type: "actoinTwo", payload: 'props' })
			} }
		>
			{props.children}
		</UserContext.Provider>
	);
};

export { UserContext, UserContextProvider };
