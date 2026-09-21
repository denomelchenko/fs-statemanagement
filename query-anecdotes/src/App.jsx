import { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationContext } from './context/NotificationContext'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const [notification, setNotification] = useState(null)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  const { anecdotes, isPending, isError, addAnecdote, vote } = useAnecdotes({
    notify,
  })

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
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
    </NotificationContext.Provider>
  )
}

export default App
