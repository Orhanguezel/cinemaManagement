// LocalStorage Yardımcı Fonksiyonları
export const Storage = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};
