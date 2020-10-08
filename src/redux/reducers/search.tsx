import * as actionTypes from '../constants/actionTypes';

interface Element {
    etag: string,
    id: object,
    kind: string,
    snippet: object
}

interface reduceState {
    list: Array<Element>,
    count: number,
    searchString: string,
    wait: boolean,
    error: string | object | null
}

interface reduceAction {
    data: {id: {videoId: string}},
    type: string,
    err: string | object | null,
    searchString: string
}

function reducer( state: reduceState = {list:[],count:5,searchString:'',wait:false,error:null}, action: reduceAction ) {
    switch(action.type) {
        case actionTypes.SET_REQUEST_IN_PROCESS: return { ...state, wait: true, error: null };
        case actionTypes.SET_REQUEST_ENDED: return { ...state, searchString: action.searchString, wait: false, error: null, list: action.data };
        case actionTypes.SET_REQEUST_ERROR: return { ...state, wait: false, error: action.err };
        case actionTypes.LOAD_MORE_INCREMENT: return { ...state, count: state.count+5 }

        default: return state;
    }
}

export default reducer;