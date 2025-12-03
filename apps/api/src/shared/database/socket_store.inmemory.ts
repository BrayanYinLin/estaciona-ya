import { Socket } from 'socket.io'

class SocketStore {
  private store = new Map<string, Set<Socket>>()

  set(userId: string, socket: Socket) {
    if (!this.store.has(userId)) {
      this.store.set(userId, new Set())
    }
    this.store.get(userId)!.add(socket)
  }

  get(userId: string): Socket[] {
    return Array.from(this.store.get(userId) || [])
  }

  deleteSocket(userId: string, socket: Socket) {
    const sockets = this.store.get(userId)
    if (!sockets) return
    sockets.delete(socket)
    if (sockets.size === 0) this.store.delete(userId)
  }

  deleteUser(userId: string) {
    this.store.delete(userId)
  }

  debug() {
    const result: Record<string, string[]> = {}

    for (const [userId, sockets] of this.store.entries()) {
      result[userId] = Array.from(sockets).map((s) => s.id)
    }

    return result
  }
}

export const socketStore = new SocketStore()
