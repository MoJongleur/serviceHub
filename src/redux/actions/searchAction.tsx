// Const
import * as actionTypes from '../constants/actionTypes';

// Modules
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';

const endpoint = 'https://www.googleapis.com/youtube/v3/search';
const GToken = 'AIzaSyDoPaRbVKiCTaZFZj2Ud_FptW_uhvzde4I';

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
        nextPageToken: data.nextPageToken,
        searchString
    };
}

export function setRequestError(error: any) {
    return {
        type: actionTypes.SET_REQEUST_ERROR
    };
}

export function searchAsync(searchString: string, pageToken?: string) {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        try {
            dispatch(setRequestInProcess())
            const response = await axios.get(endpoint, {params: {q: searchString, maxResults: 5, key: GToken, pageToken: pageToken, part: 'snippet'}}).then((r) => r.data);
            dispatch(setRequestEnded(searchString, response))
        } catch(err) {
            dispatch(setRequestError(err))
        }
    }
}
