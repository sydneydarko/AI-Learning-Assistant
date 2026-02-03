import { MOCK_NOTES } from "@/src/mocks/notes";
import { create } from "zustand";

const STORAGE_KEY = "luma_notes";

let mmkvStorage;
try {
  const { MMKV } = require("react-native-mmkv");
  const storage = new MMKV({ id: "luma-storage" });
  mmkvStorage = {
    getItem: (name) => storage.getString(name) ?? null,
    setItem: (name, value) => storage.set(name, value),
    removeItem: (name) => storage.delete(name),
  };
} catch (_) {
  const fallback = {};
  mmkvStorage = {
    getItem: (name) => fallback[name] ?? null,
    setItem: (name, value) => { fallback[name] = value; },
    removeItem: (name) => { delete fallback[name]; },
  };
}

export const useNotesStore = create((set, get) => ({
  notes: [],
  _hydrated: false,

  hydrate: () => {
    if (get()._hydrated) return;
    const raw = mmkvStorage.getItem(STORAGE_KEY);
    let notes = [];
    try {
      if (raw) notes = JSON.parse(raw);
    } catch (_) {}
    if (notes.length === 0) notes = [...MOCK_NOTES];
    set({ notes, _hydrated: true });
  },

  persist: () => {
    const { notes } = get();
    mmkvStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  },

  setNotes: (notes) => {
    set({ notes });
    get().persist();
  },

  addNote: (note) => {
    const notes = [note, ...get().notes];
    set({ notes });
    get().persist();
    return note.id;
  },

  updateNote: (id, updates) => {
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    }));
    get().persist();
  },

  deleteNote: (id) => {
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    get().persist();
  },

  getNoteById: (id) => get().notes.find((n) => n.id === id) ?? null,
}));
