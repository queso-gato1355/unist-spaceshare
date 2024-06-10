// components/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filter';

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        // ui: uiSlice.reducer,
    }
});

export const actions = {
    filter: filterSlice.actions,
    // ui: uiSlice.actions,
};

export default store;