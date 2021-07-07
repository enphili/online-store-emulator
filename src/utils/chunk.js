export const  chunk = (arr, size) => {
  return arr.reduce((acc, current, i) => {
    const el = acc[Math.floor(i / size)] = acc[Math.floor(i / size)] || []
    el.push(current)
    return acc
  }, [])
}
