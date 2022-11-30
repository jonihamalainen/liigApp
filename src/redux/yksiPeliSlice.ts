import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const haePeli = createAsyncThunk("peli/haePeli", async (id : string) => {

  const yhteys : Response = await fetch(`https://liiga.fi/api/v1/games/2023/${id}`);

  return await yhteys.text();

});


const peli: string  = "";

export const yksiPeliSlice = createSlice({
    name: "peli",
    initialState: { peli: peli },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(haePeli.fulfilled, (state, action) => {
            state.peli = action.payload;
        });
    },
});

export default yksiPeliSlice.reducer;