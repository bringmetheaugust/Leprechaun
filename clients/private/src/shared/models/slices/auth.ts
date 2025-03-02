import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@app/store";
import { AuthSuccessDTO } from "@shared/api/auth/dto";
import { signIn, signOut } from "@shared/api/auth";

const LOCALSTORAGE_TOKEN_KEY = 'token';
const LOCALSTORAGE_TOKEN = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

interface AuthState {
    isAuth: boolean
    accessToken: AuthSuccessDTO['accessToken'] | null
}

const initialState: AuthState = {
    isAuth: Boolean(LOCALSTORAGE_TOKEN),
    accessToken: LOCALSTORAGE_TOKEN,
}

function setSuccessAuth(state: AuthState, { payload }: PayloadAction<AuthSuccessDTO>): void {
    state = Object.assign(state, { isAuth: true, accessToken: payload.accessToken } as Partial<AuthState>);
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, payload.accessToken);
}

function setLogout(state: AuthState): void {
    state = Object.assign(state, { accessToken: null, isAuth: false });
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInForce: setSuccessAuth,
        signOutForce: setLogout,
    },
    extraReducers(builder) {
        builder.addCase(authSignInAction.fulfilled, setSuccessAuth);
        builder.addCase(authSignOutAction.fulfilled, setLogout)
    },
});

export const authSignInAction = createAsyncThunk('user/signin', signIn);
export const authSignOutAction = createAsyncThunk('user/signout', signOut);
export const authSignOutForceAction = authSlice.actions.signOutForce;
export const authSignInForceAction = authSlice.actions.signInForce;

export const authSelector = (state: RootState) => state.auth;
