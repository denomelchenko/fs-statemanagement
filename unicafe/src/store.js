import { create } from 'zustand'

export const useUnicafeStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  incrementGood: () => set((state) => ({ good: state.good + 1 })),
  incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
  incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
}))

export const useGood = () => useUnicafeStore((state) => state.good)
export const useNeutral = () => useUnicafeStore((state) => state.neutral)
export const useBad = () => useUnicafeStore((state) => state.bad)
export const useIncrementGood = () => useUnicafeStore((state) => state.incrementGood)
export const useIncrementNeutral = () => useUnicafeStore((state) => state.incrementNeutral)
export const useIncrementBad = () => useUnicafeStore((state) => state.incrementBad)
