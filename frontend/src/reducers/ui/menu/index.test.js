import {
    openDrawer,
    closeDrawer
} from '../../../actions/ui_menu';
import reducer from './index';

describe(
    'UI Menu reducer',
    () => {
        it(
            'when openDrawer is dispatched should return isDrawerOpen to true',
            () => {
                const action = openDrawer();

                const state = reducer(undefined, action);

                expect(state.isDrawerOpen).toBe(true);
            }
        );

        it(
            'when closeDrawer is dispatched should return isDrawerOpen to false',
            () => {
                const action = closeDrawer();

                const state = reducer(undefined, action);

                expect(state.isDrawerOpen).toBe(false);
            }
        );
    }
);