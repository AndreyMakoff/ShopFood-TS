import userSlice, { JWT_PERSISTENT_STATE } from './slice';
import { configureStore } from '@reduxjs/toolkit';
import { saveState } from './storage';
import cartSlice, { CART_PERSISTENT_STATE } from './cartslice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice,
	},
});

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
	saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
