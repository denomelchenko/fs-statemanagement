import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import anecdoteService from '../services/anecdotes'
import { useAnecdoteStore } from '../store'
import AnecdoteList from './AnecdoteList'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

const renderedContents = (container) =>
  Array.from(container.querySelectorAll('[data-testid="anecdote-item"]')).map(
    (item) => item.querySelector('div').textContent
  )

describe('<AnecdoteList />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the anecdotes in descending order of votes', async () => {
    anecdoteService.getAll.mockResolvedValue([
      { id: '1', content: 'one vote', votes: 1 },
      { id: '2', content: 'five votes', votes: 5 },
      { id: '3', content: 'three votes', votes: 3 },
    ])

    await act(async () => {
      await useAnecdoteStore.getState().actions.initialize()
    })

    const { container } = render(<AnecdoteList />)

    expect(renderedContents(container)).toEqual([
      'five votes',
      'three votes',
      'one vote',
    ])
  })

  it('renders only the anecdotes that match the filter, still sorted by votes', async () => {
    anecdoteService.getAll.mockResolvedValue([
      { id: '1', content: 'Real artists ship code', votes: 7 },
      { id: '2', content: 'Simplicity is the ultimate sophistication', votes: 5 },
      { id: '3', content: 'Untested code is broken code', votes: 3 },
    ])

    await act(async () => {
      await useAnecdoteStore.getState().actions.initialize()
    })

    useAnecdoteStore.setState({ filter: 'code' })

    const { container } = render(<AnecdoteList />)

    expect(renderedContents(container)).toEqual([
      'Real artists ship code',
      'Untested code is broken code',
    ])
  })
})
