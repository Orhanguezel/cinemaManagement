export let state = {
  cinemas: [],
  films: [],
};

export function initializeAppState(cinemas, films) {
  state.cinemas = cinemas;
  state.films = films;
}

export function saveStateToLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

export function loadStateFromLocalStorage() {
  const loadedState = JSON.parse(localStorage.getItem("state"));
  if (loadedState) {
    state = loadedState;
  }
}


const STORAGE_KEY = "cinemas";

// LocalStorage'dan sinemaları yükle
export function loadCinemasFromLocalStorage() {
  const storedCinemas = localStorage.getItem(STORAGE_KEY);
  return storedCinemas ? JSON.parse(storedCinemas) : [];
}

// Sinemaları LocalStorage'a kaydet
export function saveCinemasToLocalStorage(cinemas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cinemas));
}

