import React, { useReducer } from 'react';
import authContext from '../authContext';
import reducer, { initState } from '../reducer';
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return <authContext.Provider value={[state, dispatch]}>{children}</authContext.Provider>;
};

export default ContextProvider;
