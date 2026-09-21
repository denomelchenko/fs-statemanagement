import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import anecdoteService from './services/anecdotes'
import {
  filterAnecdotes,
  sortByVotes,
  useAnecdoteActions,
  useAnecdoteStore,
} from './store'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

describe('anecdote store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'first anecdote', votes: 0 },
        { id: '2', content: 'second anecdote', votes: 0 },
      ],
      filter: '',
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('initializes the store with the anecdotes returned by the backend', async () => {
    const backendAnecdotes = [
      { id: '10', content: 'first from the backend', votes: 0 },
      { id: '11', content: 'second from the backend', votes: 4 },
    ]
    useAnecdoteStore.setState({ anecdotes: [] })
    anecdoteService.getAll.mockResolvedValue(backendAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(backendAnecdotes)
  })

  it('voting adds one vote to the anecdote with the given id', async () => {
    anecdoteService.update.mockResolvedValue({
      id: '1',
      content: 'first anecdote',
      votes: 1,
    })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote('1')
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual([
      { id: '1', content: 'first anecdote', votes: 1 },
      { id: '2', content: 'second anecdote', votes: 0 },
    ])
  })

  it('creating an anecdote adds the anecdote the backend created', async () => {
    anecdoteService.createNew.mockResolvedValue({
      id: '3',
      content: 'a brand new anecdote',
      votes: 0,
    })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.create('a brand new anecdote')
    })

    const anecdotes = useAnecdoteStore.getState().anecdotes
    expect(anecdotes).toHaveLength(3)
    expect(anecdotes[2]).toEqual({
      id: '3',
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

  it('voting repeatedly accumulates the votes of the chosen anecdote', async () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'popular anecdote', votes: 0 },
        { id: '2', content: 'unaffected anecdote', votes: 5 },
      ],
    })
    anecdoteService.update
      .mockResolvedValueOnce({ id: '1', content: 'popular anecdote', votes: 1 })
      .mockResolvedValueOnce({ id: '1', content: 'popular anecdote', votes: 2 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote('1')
    })
    await act(async () => {
      await result.current.vote('1')
    })

    const anecdotes = useAnecdoteStore.getState().anecdotes
    expect(anecdotes.find((anecdote) => anecdote.id === '1').votes).toBe(2)
    expect(anecdotes.find((anecdote) => anecdote.id === '2').votes).toBe(5)
  })
})
