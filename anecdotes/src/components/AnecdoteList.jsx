import { useAnecdoteActions, useAnecdotes } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} data-testid="anecdote-item">
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
