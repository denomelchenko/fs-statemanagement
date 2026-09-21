import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'

const App = () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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
    },
  })

  const vote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdoteMutation.mutate} />

      {isPending ? (
        <div>loading anecdotes...</div>
      ) : (
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default App
