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
})
