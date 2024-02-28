import axios from "axios";

export const ApiCharacters = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiEpisodes = axios.create({
  baseURL: "https://rickandmortyapi.com/api/episode",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiLocations = axios.create({
  baseURL: "https://rickandmortyapi.com/api/location",
  headers: {
    "Content-Type": "application/json",
  },
});
