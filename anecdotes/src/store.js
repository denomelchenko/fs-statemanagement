import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        ),
      })),
    create: (content) =>
      set((state) => ({
        anecdotes: state.anecdotes.concat({
          content,
          id: (100000 * Math.random()).toFixed(0),
          votes: 0,
        }),
      })),
    setFilter: (filter) => set({ filter }),
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export const sortByVotes = (anecdotes) =>
  anecdotes.toSorted((a, b) => b.votes - a.votes)

export const filterAnecdotes = (anecdotes, filter) =>
  anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
