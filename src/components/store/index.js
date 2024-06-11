// components/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterParam';

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        // ui: uiSlice.reducer,
    }
});

export const actions = {
    filterParam: filterSlice.actions,
    // ui: uiSlice.actions,
};

export default store;