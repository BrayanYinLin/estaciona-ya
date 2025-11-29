type SessionData = {
  id: number
  validatedAccount: boolean
  state: boolean
  role: {
    name: string
    permissions: {
      name: string
    }[]
  }
}

class SessionStore {
  private store = new Map<string, SessionData>()

  set(socketId: string, data: SessionData) {
    this.store.set(socketId, data)
  }

  get(socketId: string) {
    return this.store.get(socketId) || null
  }

  delete(socketId: string) {
    this.store.delete(socketId)
  }
}

export const socketSessionStore = new SessionStore()
