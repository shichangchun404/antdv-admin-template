export function getSession<T>(key: string) {
  return sessionStorage.getItem(key) as T
}

export function setSession(key: string, value: string) {
  return sessionStorage.setItem(key, value)
}

export function removeSession(key: string) {
  return sessionStorage.removeItem(key)
}
