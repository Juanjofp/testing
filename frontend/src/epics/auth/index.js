import {Observable} from 'rxjs';
import switchMap from 'rxjs/add/operator/switchMap';
import map from 'rxjs/add/operator/map';
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
    return action$.ofType(LOGIN)
        .switchMap(
            ({payload}) => Observable.concat(
                Observable.of(fetchLogin(payload.username, payload.password)),
                Users.login(payload.username, payload.password)
                    .map(
                        (response) => {
                            if(response.code) {
                                return loginDenied(response.message);
                            }
                            return loginGranted(response.username, response.avatar, response.token, response.admin);
                        }
                    )
            )
        );
}