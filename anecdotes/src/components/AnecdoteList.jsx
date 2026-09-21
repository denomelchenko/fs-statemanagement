import {
  filterAnecdotes,
  sortByVotes,
  useAnecdoteActions,
  useAnecdotes,
  useFilter,
} from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { vote } = useAnecdoteActions()
  const visibleAnecdotes = sortByVotes(filterAnecdotes(anecdotes, filter))

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
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
