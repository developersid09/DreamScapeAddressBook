
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Contact = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    image: string;
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
    };
    company: {
        name: string;
        department?: string;
        title?: string;
        address?: any;
    };
};

type ContactsState = {
    list: Contact[];
    favourites: Record<string, Contact>;
    loading: boolean;
    error?: string | null;
};

const initialState: ContactsState = {
    list: [],
    favourites: {},
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        fetchContactsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchContactsSuccess(state, action: PayloadAction<Contact[]>) {
            state.list = action.payload;
            state.loading = false;
        },
        fetchContactsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        toggleFavourite(state, action: PayloadAction<Contact>) {
            const c = action.payload;
            if (state.favourites[c.id]) {
                delete state.favourites[c.id];
            } else {
                state.favourites[c.id] = c;
            }
        },
        clearFavourites(state) {
            state.favourites = {};
        },
    },
});

export const {
    fetchContactsStart,
    fetchContactsSuccess,
    fetchContactsFailure,
    toggleFavourite,
    clearFavourites,
} = contactsSlice.actions;

export default contactsSlice.reducer;
export type { Contact };
