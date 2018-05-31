import {
    updateUsername,
    updatePassword
} from '../../../actions/ui_login';
import reducer, {getUsername, getPassword} from './index';

describe(
    'UI Login reducer',
    () => {
        it(
            'when change username to juanjo',
            () => {
                const newUsername = 'juanjo';
                
                const action = updateUsername(newUsername);
                const state = reducer(undefined, action);

                expect(getUsername(state)).toEqual(newUsername);
            }
        );

        it(
            'when change password to 12345',
            () => {
                const newPassword = '123456';

                const action = updatePassword(newPassword);
                const state = reducer(undefined, action);

                expect(getPassword(state)).toEqual(newPassword);
            }
        );
    }
);