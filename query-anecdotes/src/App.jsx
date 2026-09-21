import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotify } from './components/NotificationContext'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { notify } = useNotify()
  const { anecdotes, isPending, isError, addAnecdote, vote } = useAnecdotes({
    notify,
  })

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

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
