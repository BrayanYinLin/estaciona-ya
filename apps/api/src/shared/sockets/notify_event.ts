import { EventEmitter } from 'node:events'

export type NotificationPayload = {
  id: string
  message: string
  garage: {
    id: string
  }
}

type NotificationEvent = {
  notify: NotificationPayload[]
}

type NotificationEmitter<T> = {
  on(eventName: keyof T, listener: (data: T[keyof T]) => void): void
  emit(eventName: keyof T, data: T[keyof T]): boolean
  off(eventName: keyof T, listener: (data: T[keyof T]) => void): void
} & EventEmitter

export const notificationEmitter: NotificationEmitter<NotificationEvent> =
  new EventEmitter()
