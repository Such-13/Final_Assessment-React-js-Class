import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSession, clearSession, setAuthLoading } from '@/features/auth/authSlice'
import { login, logout, handleRedirectCallback, getCurrentUser, getRolesFromSession } from '@/services/authService'
 
export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, roles, loading, error } = useAppSelector(state => state.auth)
 
  const initiateLogin = useCallback(async () => {
    dispatch(setAuthLoading(true))
    await login()
  }, [dispatch])
 
  const handleCallback = useCallback(async () => {
    dispatch(setAuthLoading(true))
    try {
      const oidcUser = await handleRedirectCallback()
      const roles = getRolesFromSession()
      dispatch(setSession({
        user: oidcUser.profile,
        accessToken: oidcUser.access_token,
        roles,
      }))
      return oidcUser
    } catch (err) {
      console.error('Auth callback failed:', err)
      throw err
    }
  }, [dispatch])
 
  const restoreSession = useCallback(() => {
    const session = getCurrentUser()
    if (session) {
      const roles = getRolesFromSession()
      dispatch(setSession({
        user: session.profile,
        accessToken: session.access_token,
        roles,
      }))
      return true
    }
    return false
  }, [dispatch])
 
  const handleLogout = useCallback(async () => {
    dispatch(clearSession())
    await logout()
  }, [dispatch])
 
  return {
    isAuthenticated,
    user,
    roles,
    loading,
    error,
    initiateLogin,
    handleCallback,
    restoreSession,
    handleLogout,
  }
}