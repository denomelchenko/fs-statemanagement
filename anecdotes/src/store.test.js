import { beforeEach, describe, expect, it } from 'vitest'
import { filterAnecdotes, sortByVotes, useAnecdoteStore } from './store'

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

  it('creating an anecdote adds it to the store with zero votes', () => {
    useAnecdoteStore.getState().actions.create('a brand new anecdote')

    const anecdotes = useAnecdoteStore.getState().anecdotes
    expect(anecdotes).toHaveLength(3)
    expect(anecdotes[2]).toEqual({
      id: expect.any(String),
      content: 'a brand new anecdote',
      votes: 0,
    })
  })

  it('sortByVotes orders anecdotes by descending votes without mutating its input', () => {
    const anecdotes = [
      { id: '1', content: 'one vote', votes: 1 },
      { id: '2', content: 'five votes', votes: 5 },
      { id: '3', content: 'three votes', votes: 3 },
    ]

    const sorted = sortByVotes(anecdotes)

    expect(sorted.map((anecdote) => anecdote.content)).toEqual([
      'five votes',
      'three votes',
      'one vote',
    ])
    expect(anecdotes.map((anecdote) => anecdote.content)).toEqual([
      'one vote',
      'five votes',
      'three votes',
    ])
  })

  it('filterAnecdotes keeps only the anecdotes containing the filter text', () => {
    const anecdotes = [
      { id: '1', content: 'Real artists ship code', votes: 7 },
      { id: '2', content: 'Simplicity is the ultimate sophistication', votes: 5 },
      { id: '3', content: 'Untested code is broken code', votes: 3 },
    ]

    const filtered = filterAnecdotes(anecdotes, 'code')

    expect(filtered.map((anecdote) => anecdote.content)).toEqual([
      'Real artists ship code',
      'Untested code is broken code',
    ])
  })
})
