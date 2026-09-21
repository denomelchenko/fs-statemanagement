import { create } from 'zustand'

let timeoutId = null

export const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    show: (notification) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      set({ notification })
      timeoutId = setTimeout(() => {
        set({ notification: null })
        timeoutId = null
      }, 5000)
    },
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
