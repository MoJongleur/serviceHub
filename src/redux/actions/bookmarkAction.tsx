// Const
import * as actionTypes from '../constants/actionTypes';

// Modules
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export function setBookmarksError(error: any) {
    return {
        type: actionTypes.SET_REQEUST_ERROR
    };
}

export function moveTo(data: object) {
    return {
        type: actionTypes.MOVE_TO_BOOKMARKS,
        data
    };
}

export function moveFrom(idx: number) {
    return {
        type: actionTypes.MOVE_FROM_BOOKMARKS,
        idx
    };
}


export function moveToBookmark(data: object) {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        try {
            dispatch(moveTo(data))
        } catch(err) {
            dispatch(setBookmarksError(err))
        }
    }
}

export function moveFromBookmark(idx: number) {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        try {
            dispatch(moveFrom(idx))
        } catch(err) {
            dispatch(setBookmarksError(err))
        }
    }
}
