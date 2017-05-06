/**
 * Created by li-rz on 17-5-2.
 */
import {ACTION} from '../../config/action-type'

/**
 * get item
 * @param page
 * @returns {{type: number, page: *}}
 */
export function getList(page) {
    if(!page) {
        page = {page: 1}
    }
    return {
        type: ACTION.GET,
        page
    }
}

/**
 * add item
 * @param data
 * @returns {{type: number, data: *}}
 */
export function addItem(data) {
    return {
        type: ACTION.ADD,
        data
    }
}

/**
 * edit item
 * @param id
 * @param data
 * @returns {{type: number, data: *}}
 */
export function editItem(id, data) {
    return {
        type: ACTION.EDIT,
        data,
        id
    }
}

export function deleteItem(id) {
    return {
        type: ACTION.DELETE,
        id
    }
}

/**
 * sort item
 * @param sortType
 * @returns {{type: number, sortType: *}}
 */
export function sortItem(sortType) {
    return {
        type: ACTION.SORT,
        sortType
    }
}