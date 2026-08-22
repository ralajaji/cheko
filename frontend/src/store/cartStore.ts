import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartState = {
  counts: Record<number, number>
  increment: (id: number) => void
  decrement: (id: number) => void
  getCount: (id: number) => number
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      counts: {},
      increment: (id) =>
        set((state) => ({
          counts: { ...state.counts, [id]: (state.counts[id] ?? 0) + 1 },
        })),
      decrement: (id) =>
        set((state) => {
          const current = state.counts[id] ?? 0
          if (current <= 0) return state
          return { counts: { ...state.counts, [id]: current - 1 } }
        }),
      getCount: (id) => get().counts[id] ?? 0,
    }),
    {
      name: 'cart-storage',
    },
  ),
)

export default useCartStore
