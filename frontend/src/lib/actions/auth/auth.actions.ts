export const getAuthCookie = ()=>{
    const jwt = localStorage.getItem('auth')
    return `Bearer ${jwt}`
}