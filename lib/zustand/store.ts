import { Area } from 'types/meeting';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type LocalAreaProps = {
  localArea: Area;
  setLocalArea: (value: Area) => void;
}

export const useLocalArea = create<LocalAreaProps>()(
  persist(
    (set) => ({
      localArea: { city: '', dong: '', x: 127.06322356635977, y: 37.73773102502282 },
      setLocalArea: (area) => set({ localArea: area }),
    }),
    {
      name: 'area',
    }
  )
);