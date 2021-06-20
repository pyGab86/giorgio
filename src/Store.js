import { createStore } from 'redux';


const initialState = {
    recording: [
        {
            record: false
        }
    ],
    songs: [
        {
            songs: []
        }
    ]
}


const symbolReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REC':
            return {
                ...state,
                recording: [...state.recording, action.payload]
            }
        case 'NOTE':
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case 'ADD_SONG':
            return {
                ...state,
                songs: [...state.songs, action.payload]
            }
        default:
            return state;
    }
}


const Store = createStore(symbolReducer);

export default Store;