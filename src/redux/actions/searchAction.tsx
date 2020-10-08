// Const
import * as actionTypes from '../constants/actionTypes';

// Modules
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Youtube from "youtube.ts";

const youtube = new Youtube('AIzaSyA7vkpGZwrPUW3Exzb32uE66pnKqnjWQFI')

interface IncomingData {
    etag: string,
    items: Array<{id: object, snippet: object}>,
    kind: string,
    nextPageToken: string,
    pageInfo: object,
    regionCode: string
}

export function setRequestInProcess() {
    return {
        type: actionTypes.SET_REQUEST_IN_PROCESS
    };
}

export function setRequestEnded(searchString:string, data:IncomingData) {
    return {
        type: actionTypes.SET_REQUEST_ENDED,
        data: data.items,
        searchString
    };
}

export function setRequestError(error: any) {
    return {
        type: actionTypes.SET_REQEUST_ERROR
    };
}

export function loadMoreIncrement() {
    return {
        type: actionTypes.LOAD_MORE_INCREMENT
    };
}

export function loadMoreInProcess() {
    return {
        type: actionTypes.LOAD_MORE_IN_PROCESS
    };
}

export function loadMoreEnded() {
    return {
        type: actionTypes.LOAD_MORE_ENDED
    };
}

export function searchAsync(searchString: string, count: number) {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        try {
            dispatch(setRequestInProcess())
            const videoSearch = await youtube.videos.search({q: searchString, maxResults: count});
            dispatch(setRequestEnded(searchString, videoSearch))
        } catch(err) {
            dispatch(setRequestError(err))
        }
    }
}

export function loadMore() {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        try {
            dispatch(loadMoreInProcess())
            dispatch(loadMoreIncrement())
            dispatch(loadMoreEnded())
        } catch(err) {
            // TODO тут можно было бы основываясь на количестве результатов нашего запроса выдавать ошибку/убирать кнопку из видимости/что-то еще, но я вспомнил об этом куске кода когда уже все было готово и решил забить)
        }
    }
}
