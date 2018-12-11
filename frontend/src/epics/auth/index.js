import {
    of,
    concat
} from 'rxjs';
import {
    map,
    switchMap
} from 'rxjs/operators';
import {
    LOGIN
} from '../../constants';
import {
    fetchLogin,
    loginGranted,
    loginDenied
} from '../../actions/auth';
import * as Users from '../../services/users';

export function loginEpic(action$) {
    return action$.ofType(LOGIN).pipe(
        switchMap(
            ({payload}) => {
                return concat(
                    of(fetchLogin(payload.username, payload.password)),
                    Users.login(payload.username, payload.password).pipe(
                        map(
                            (response) => {
                                if(response.errorCode) {
                                    return loginDenied(response.message);
                                }
                                return loginGranted(response.username, response.avatar, response.token, response.admin);
                            }
                        )
                    )
                );
            }
        )
    );
}