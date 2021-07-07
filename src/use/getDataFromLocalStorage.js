export const useGetLSData = key => localStorage.getItem('currentUser')
&& JSON.parse(localStorage.getItem('currentUser'))[key]
  ? JSON.parse(localStorage.getItem('currentUser'))[key] : ''