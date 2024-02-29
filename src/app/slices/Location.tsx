import { RootState } from "@/store";
import { Loaction } from "@/types/location";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [] as Loaction[],
};

export const LocationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    setLocations: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLocations } = LocationSlice.actions;

export const Locations = (state: RootState) => state.location.data;

export default LocationSlice.reducer;
