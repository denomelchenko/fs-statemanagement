import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    vote: async (id) => {
      // Increment locally first: two rapid clicks then read 1 and 2, not 0 and 0.
      // Doing it after the round trip loses a vote whenever a second click lands
      // before the first response arrives.
      set((state) => ({
        anecdotes: state.anecdotes.map((item) =>
          item.id === id ? { ...item, votes: item.votes + 1 } : item
        ),
      }))

      const votedAnecdote = get().anecdotes.find((item) => item.id === id)
      if (!votedAnecdote) {
        return
      }

      const savedAnecdote = await anecdoteService.update(votedAnecdote)

      // Only take the server's answer if no further vote happened meanwhile.
      set((state) => ({
        anecdotes: state.anecdotes.map((item) =>
          item.id === id && item.votes === votedAnecdote.votes
            ? savedAnecdote
            : item
        ),
      }))
    },
    create: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter((item) => item.id !== id),
      }))
    },
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
