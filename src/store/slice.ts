// import { login } from './slice';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResponse } from '../componets/interface/auth.interface';
import { PREFIX } from '../componets/Helpers/Api';
import axios, { AxiosError } from 'axios';
import { Profile } from '../componets/interface/user.profile';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';
export interface UserPersistent {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	loginErrorMassege?: string;
	registerErrorMassege?: string;
	profile?: Profile;
}

const initialState: UserState = {
	jwt: loadState<UserPersistent>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password,
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string; name: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(
				`${PREFIX}/auth/register`,
				{
					email: params.email,
					password: params.password,
					name: params.name,
				}
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const getprofile = createAsyncThunk<Profile, void, { state: RootState }>(
	'user/profile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		logOut: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMassege = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMassege = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMassege = action.error.message;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMassege = action.error.message;
		});
		builder.addCase(getprofile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
