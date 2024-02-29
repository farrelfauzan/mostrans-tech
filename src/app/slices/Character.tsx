import { RootState } from "@/store";
import { Character } from "@/types/character";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [] as Character[],
  character: {} as Character,
};

export const CharacterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      state.data = action.payload;
    },
    setCharacterLocation: (state, action) => {
      const findCharacter: Character[] = state.data?.filter((item) => {
        return item.id === state.character.id;
      });
      findCharacter[0].location.name = action.payload;
      // change the location of the character with the new one
      state.data = state.data.map((item) => {
        if (item.id === state.character.id) {
          return findCharacter[0];
        }
        return item;
      });
    },
    setCharacterLocationDetail: (state, action) => {
      state.character.location.name = action.payload;
    },
    setCharacterDetail: (state, action) => {
      state.character = action.payload;
    },
  },
});

export const { setCharacter } = CharacterSlice.actions;
export const { setCharacterDetail } = CharacterSlice.actions;
export const { setCharacterLocation } = CharacterSlice.actions;
export const { setCharacterLocationDetail } = CharacterSlice.actions;

export const Characters = (state: RootState) => state.character.data;
export const CharacterDetail = (state: RootState) => state.character.character;

export default CharacterSlice.reducer;
