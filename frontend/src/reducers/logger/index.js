const initialState = {
    actions: []
};

const logs = (state = initialState, action) => {
    return {
        ...state,
        actions: [
            ...state.actions,
            action
        ]
    };
};

export default logs;
