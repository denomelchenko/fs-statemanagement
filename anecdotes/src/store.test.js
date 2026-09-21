import { beforeEach, describe, expect, it } from 'vitest'
import { useAnecdoteStore } from './store'

describe('anecdote store', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'first anecdote', votes: 0 },
        { id: '2', content: 'second anecdote', votes: 0 },
      ],
    })
  })

  it('voting adds one vote to the anecdote with the given id', () => {
    useAnecdoteStore.getState().actions.vote('1')

    expect(useAnecdoteStore.getState().anecdotes).toEqual([
      { id: '1', content: 'first anecdote', votes: 1 },
      { id: '2', content: 'second anecdote', votes: 0 },
    ])
  })
})
