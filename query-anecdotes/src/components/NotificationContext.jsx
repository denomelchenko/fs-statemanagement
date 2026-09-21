import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext({
  notification: null,
  notify: () => {},
})

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => useContext(NotificationContext)
