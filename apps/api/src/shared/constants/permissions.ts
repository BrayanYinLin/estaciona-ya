export const PERMISSIONS = {
  AUTH: {
    TENANT: {
      CREATE: 'AUTH_TENANT_CREATE'
    },
    LESSOR: {
      CREATE: 'AUTH_LESSOR_CREATE'
    },
    LOGIN: 'AUTH_LOGIN',
    REFRESH: 'AUTH_REFRESH',
    LOGOUT: 'AUTH_LOGOUT',
    VALIDATE: 'AUTH_VALIDATE'
  },
  USERS: {
    PROFILE: {
      READ: 'USERS_PROFILE_READ',
      UPDATE: 'USERS_PROFILE_UPDATE'
    },
    PASSWORD: {
      UPDATE: 'USERS_PASSWORD_UPDATE'
    },
    ACCOUNT: {
      DEACTIVATE: 'USERS_ACCOUNT_DEACTIVATE'
    },
    PHOTO: {
      READ: 'USERS_PHOTO_READ'
    }
  },
  GARAGES: {
    READ: 'GARAGES_READ',
    CREATE: 'GARAGES_CREATE',
    UPDATE: 'GARAGES_UPDATE',
    DELETE: 'GARAGES_DELETE',
    PHOTO: {
      UPLOAD: 'GARAGES_PHOTO_UPLOAD',
      DELETE: 'GARAGES_PHOTO_DELETE'
    },
    RENT_MODES: {
      READ: 'GARAGES_RENT_MODES_READ'
    }
  },
  LOCATIONS: {
    DISTRICTS: {
      READ: 'LOCATIONS_DISTRICTS_READ'
    },
    SEARCH: 'locations:search'
  },
  BOOKINGS: {
    CREATE: 'BOOKINGS_CREATE',
    READ: 'BOOKINGS_READ',
    UPDATE: 'BOOKINGS_UPDATE',
    CANCEL: 'BOOKINGS_CANCEL'
  },
  REVIEWS: {
    CREATE: 'REVIEWS_CREATE',
    READ: 'REVIEWS_READ',
    UPDATE: 'REVIEWS_UPDATE',
    DELETE: 'REVIEWS_DELETE'
  }
} as const

// Extrae los valores finales de un objeto de manera recursiva
type ValuesOf<T> = T extends string
  ? T
  : T extends object
    ? ValuesOf<T[keyof T]>
    : never

// Tu tipo final de permisos
export type PermissionName = ValuesOf<typeof PERMISSIONS>
