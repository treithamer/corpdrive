export type UserRole = 'user' | 'admin' | 'superadmin'

export type Permission = 'admin' | 'editor' | 'viewer'

export interface File {
  id: number
  name: string
  type: 'file' | 'folder'
  size: string
  permissions: Permission
}

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}