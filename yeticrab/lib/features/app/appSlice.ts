import {createAppSlice} from '../../createAppSlice';

export interface AppSliceState {
    value: boolean;
}

const initialState: AppSliceState = {
    value: true,
};

export const appSlice = createAppSlice({
    name: 'app',
    initialState,
    reducers: (create) => ({
        changePriv: create.reducer((state) => {
            state.value = !state.value;
        }),
    }),
    selectors: {
        selectPrivilege: (app) => app.value,
    },
});
export const {changePriv} = appSlice.actions;
export const {selectPrivilege} = appSlice.selectors;
