import {
    getGlobalNotes,
    createGlobalNote,
    editGlobalNote,
    deleteGlobalNote
} from "./note.action";

export {noteReducer} from './note.reducer';
export {watchNotes} from './note.saga';

export const noteActions = {
    getGlobalNotes,
    createGlobalNote,
    editGlobalNote,
    deleteGlobalNote
}

