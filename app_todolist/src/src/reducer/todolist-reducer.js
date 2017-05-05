/**
 * Created by li-rz on 17-5-2.
 */
import {} from '../action/todolist-action';
import {ACTION} from '../../config/action-type';
import NetworkStore from '../util/network-util'

export const data = async (state = {data: []}, action) => {
    switch (action.type) {
        case ACTION.GET:
            // state.data = await NetworkStore.getData();
            break;
        case ACTION.ADD:
            break;
        case ACTION.EDIT:
            break;

        case ACTION.SORT:
            break;
        default:
            break;
    }
    return state;
};

