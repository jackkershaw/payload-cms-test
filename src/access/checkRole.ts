import type { User } from 'payload'

export const checkRole = (allRoles: User['roles'] = [], user: User): boolean => {
  if (user) {
    if (
      // check if user has role that matches any of the roles passed to the function
      // if so return true
      allRoles.some((role: string) => {
        return user?.roles?.some((individualRole: string) => {
          return individualRole === role
        })
      })
    ) {
      return true
    }
  }

  return false
}
