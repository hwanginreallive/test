const initState = {
    user: {
        access_token: localStorage.getItem('access_token'),
        role: localStorage.getItem('role'),
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload,
            };

        default:
            throw new Error('invalid action');
    }
}
export { initState };
export default reducer;
