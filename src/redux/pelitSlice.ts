import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const haePelit = createAsyncThunk("pelit/haePelit", async () => {

  const yhteys = await fetch("https://liiga.fi/api/v1/games/");

  return await yhteys.json();

});



const pelit: any[]  = [];

export const pelitSlice = createSlice({
    name: "pelilista",
    initialState: { pelit: [...pelit] },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(haePelit.fulfilled, (state, action) => {
            state.pelit = action.payload;
        });
    },
});

export default pelitSlice.reducer;