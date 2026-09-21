import { createContext } from 'react'

export const NotificationContext = createContext({
  notification: null,
  notify: () => {},
})
