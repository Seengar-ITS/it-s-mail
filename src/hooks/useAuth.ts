import { useState } from 'react'
interface AuthUser { id: string; email: string; name: string; avatar: string }
export function useAuth() {
  const [user] = useState<AuthUser>({ id: 'public', email: '', name: 'Guest', avatar: '' })
  function signOut() {}
  function loginWithITS() {}
  return { user, loading: false, signOut, loginWithITS }
}
