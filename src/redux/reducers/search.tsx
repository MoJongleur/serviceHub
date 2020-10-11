import * as actionTypes from '../constants/actionTypes';

interface Element {
    etag: string,
    id: object,
    kind: string,
    snippet: object
}

interface reduceState {
    list: Array<Element>,
    searchString: string,
    pageToken: string,
    wait: boolean,
    error: string | object | null
}

interface reduceAction {
    data: Array<object>,
    type: string,
    nextPageToken: string,
    err: string | object | null,
    searchString: string
}

function reducer( state: reduceState = {list:[],pageToken:'',searchString:'',wait:false,error:null}, action: reduceAction ) {
    switch(action.type) {
        case actionTypes.SET_REQUEST_IN_PROCESS: return { ...state, wait: true, error: null };
        case actionTypes.SET_REQUEST_ENDED: return { ...state, searchString: action.searchString, wait: false, error: null, list: [...state.list, ...action.data], pageToken: action.nextPageToken };
        case actionTypes.SET_REQEUST_ERROR: return { ...state, wait: false, error: action.err };

        default: return state;
    }
}

export default reducer;