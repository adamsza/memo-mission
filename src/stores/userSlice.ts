import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string;
}

const initialState: UserState = {
    name: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
});

export const { changeName } = userSlice.actions;

export default userSlice.reducer;