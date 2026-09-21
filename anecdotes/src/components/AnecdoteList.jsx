import { useNotificationActions } from '../notificationStore'
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
  const { show } = useNotificationActions()
  const visibleAnecdotes = sortByVotes(filterAnecdotes(anecdotes, filter))

  const handleVote = async (anecdote) => {
    await vote(anecdote.id)
    show(`you voted '${anecdote.content}'`)
  }

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id} data-testid="anecdote-item">
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
