
import { useCallback } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";
import {
    fetchContactsStart,
    fetchContactsSuccess,
    fetchContactsFailure,
    toggleFavourite,
    Contact,
} from "../store/slices/contactsSlice";
import { RootState, useAppDispatch } from "../store";

export const useContacts = () => {
    const dispatch = useAppDispatch();
    const { list, favourites, loading, error } = useSelector((s: RootState) => s.contacts);

    const fetchContacts = useCallback(async () => {
        dispatch(fetchContactsStart());
        try {
            const res = await api.get("/users");
            const users = res.data.users as Contact[];
            dispatch(fetchContactsSuccess(users));
        } catch (err: any) {
            dispatch(fetchContactsFailure(err?.response?.data?.message ?? err.message ?? "Failed to load contacts"));
        }
    }, [dispatch]);

    const toggleFav = useCallback(
        (contact: Contact) => {
            dispatch(toggleFavourite(contact));
        },
        [dispatch]
    );

    return {
        list,
        favourites,
        loading,
        error,
        fetchContacts,
        toggleFav,
    };
};
