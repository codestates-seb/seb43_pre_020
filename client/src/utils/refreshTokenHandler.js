const isBrowser = () => typeof window !== 'undefined'

export const saveRefreshTokenToLocalStorage = refreshToken => {
  if (isBrowser()) {
    try {
      localStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
      console.error('Error saving refreshToken to local storage:', error)
    }
  }
}

export const getRefreshTokenFromLocalStorage = () => {
  if (isBrowser()) {
    try {
      return localStorage.getItem('refreshToken') || ''
    } catch (error) {
      console.error('Error getting refreshToken from local storage:', error)
      return ''
    }
  }
  return ''
}

export const removeRefreshTokenFromLocalStorage = () => {
  if (isBrowser()) {
    try {
      localStorage.removeItem('refreshToken')
    } catch (error) {
      console.error('Error removing refreshToken from local storage:', error)
    }
  }
}
