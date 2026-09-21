import { useAnecdoteActions, useFilter } from '../store'

const Filter = () => {
  const filter = useFilter()
  const { setFilter } = useAnecdoteActions()

  return (
    <div>
      filter
      <input
        data-testid="filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  )
}

export default Filter
