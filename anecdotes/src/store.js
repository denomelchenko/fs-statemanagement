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
      const anecdote = get().anecdotes.find((item) => item.id === id)
      if (!anecdote) {
        return
      }
      const votedAnecdote = await anecdoteService.update({
        ...anecdote,
        votes: anecdote.votes + 1,
      })
      set((state) => ({
        anecdotes: state.anecdotes.map((item) =>
          item.id === votedAnecdote.id ? votedAnecdote : item
        ),
      }))
    },
    create: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
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
