import {combineEpics} from 'redux-observable';

import * as authEpic from './auth';

export default combineEpics(
    ...Object.values(authEpic)
);