import reducer from './index';

describe(
    'Logs reducer',
    () => {
        it(
            'should return only one action when first action arrive',
            () => {
                const action = {
                    type: 'FIRST_ACTION',
                    payload: 'Hello Redux',
                    error: false
                };

                const state = reducer(undefined, action);

                expect(state.actions.length).toBe(1);
                expect(state.actions[0]).toEqual(action);
            }
        );
    }
);