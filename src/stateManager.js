export let state = {
  cinemas: [],
  films: [],
  salons: [],
};

// Uygulama durumunu başlat
export function initializeAppState(cinemas = [], films = [], salons = []) {
  state.cinemas = cinemas;
  state.films = films;
  state.salons = salons;
  saveStateToLocalStorage(); // Durumu LocalStorage'a kaydet
}

// Tüm durumu LocalStorage'a kaydet
export function saveStateToLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

// Tüm durumu LocalStorage'dan yükle
export function loadStateFromLocalStorage() {
  const loadedState = localStorage.getItem("state");
  if (loadedState) {
    const parsedState = JSON.parse(loadedState);
    state.cinemas = parsedState.cinemas || [];
    state.films = parsedState.films || [];
    state.salons = parsedState.salons || [];
  }
}

// **Sadece sinemalar için** LocalStorage işlemleri
const CINEMAS_STORAGE_KEY = "cinemas";

// Sinemaları LocalStorage'dan yükle
export function loadCinemasFromLocalStorage() {
  const storedCinemas = localStorage.getItem(CINEMAS_STORAGE_KEY);
  state.cinemas = storedCinemas ? JSON.parse(storedCinemas) : [];
  return state.cinemas;
}

// Sinemaları LocalStorage'a kaydet
export function saveCinemasToLocalStorage(cinemas) {
  state.cinemas = cinemas;
  localStorage.setItem(CINEMAS_STORAGE_KEY, JSON.stringify(cinemas));
  saveStateToLocalStorage(); // Global state'i de güncelle
}

// **Sadece salonlar için** LocalStorage işlemleri
const SALONS_STORAGE_KEY = "salons";

// Salonları LocalStorage'dan yükle
export function loadSalonsFromLocalStorage() {
  const storedSalons = localStorage.getItem(SALONS_STORAGE_KEY);
  state.salons = storedSalons ? JSON.parse(storedSalons) : [];
  return state.salons;
}

// Salonları LocalStorage'a kaydet
export function saveSalonsToLocalStorage(salons) {
  state.salons = salons;
  localStorage.setItem(SALONS_STORAGE_KEY, JSON.stringify(salons));
  saveStateToLocalStorage(); // Global state'i de güncelle
}

// **Sadece filmler için** LocalStorage işlemleri
const FILMS_STORAGE_KEY = "films";

// Filmleri LocalStorage'dan yükle
export function loadFilmsFromLocalStorage() {
  const storedFilms = localStorage.getItem(FILMS_STORAGE_KEY);
  state.films = storedFilms ? JSON.parse(storedFilms) : [];
  return state.films;
}

// Filmleri LocalStorage'a kaydet
export function saveFilmsToLocalStorage(films) {
  state.films = films;
  localStorage.setItem(FILMS_STORAGE_KEY, JSON.stringify(films));
  saveStateToLocalStorage(); // Global state'i de güncelle
}

export function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}


// Tüm LocalStorage verilerini temizle
export function resetData() {
  localStorage.clear(); // LocalStorage'ı temizle
  alert("Veriler sıfırlandı. Varsayılan veriler yükleniyor.");
  window.location.reload(); // Sayfayı yeniden yükle
}

