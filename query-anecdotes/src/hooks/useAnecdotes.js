import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = ({ notify }) => {
  const queryClient = useQueryClient()

  const {
    isPending,
    isError,
    data: anecdotes,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
  })

  const addAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })

  const voteMutation = useMutation({
    mutationFn: (anecdote) =>
      anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 }),
    onSuccess: (votedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.map((anecdote) =>
          anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
        )
      )
      notify(`anecdote '${votedAnecdote.content}' voted`)
    },
  })

  return {
    anecdotes,
    isPending,
    isError,
    addAnecdote: addAnecdoteMutation.mutate,
    vote: voteMutation.mutate,
  }
}
