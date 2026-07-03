import { create } from 'zustand';
import type { User } from '@/types/auth';
import type { RequestAnalytics } from '@/types/history';
import type { SwaggerSchemaState } from '@/types/schema';

interface AppStore {
  user: User | null;
  isAuthLoading: boolean;
  schema: SwaggerSchemaState;
  history: RequestAnalytics[];

  setUser: (user: User | null) => void;
  setIsAuthLoading: (isLoading: boolean) => void;
  setSchema: (schema: SwaggerSchemaState) => void;
  setRawSchemaContent: (rawContent: string) => void;
  addToHistory: (item: RequestAnalytics) => void;
  clearHistory: () => void;
}

const initialSchema: SwaggerSchemaState = {
  rawContent: '',
  parsedContent: null,
  format: 'json',
  isValid: false,
  error: null,
};

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  isAuthLoading: true,
  schema: initialSchema,
  history: [],

  setUser: (user) => set({ user }),

  setIsAuthLoading: (isAuthLoading) => set({ isAuthLoading }),

  setSchema: (schema) => set({ schema }),

  setRawSchemaContent: (rawContent) =>
    set((state) => ({
      schema: {
        ...state.schema,
        rawContent,
      },
    })),

  addToHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history],
    })),

  clearHistory: () => set({ history: [] }),
}));
