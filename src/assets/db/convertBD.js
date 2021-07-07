const newObj = {}

const dar = async () => {
  try {
    const url = `${process.env.VUE_APP_BASE_BD_URL}/products.json`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    const url2 = `${process.env.VUE_APP_BASE_BD_URL}/products_test.json`
    for (const item of data) {
      const response2 = await fetch(url2, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
      })
      if (!response2.ok) {throw new Error(response2.statusText)}
      const data2 = await response2.json()
      newObj[data2.name] = {
        ...item,
        firebaseKey: data2.name,
        dataCreated: new Date()
      }
    }
  }
  catch (e) {throw new Error()}
}

const fet = async () => {
  try {
    const arr = Object.keys(newObj)
    for (let obj of arr) {
      const url3 = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${obj}.json`
      const response3 = await fetch(url3, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newObj[obj])
      })
      if (!response3.ok) {throw new Error(response3.statusText)}
      const data3 = await response3.json()
    }
  }
  catch (e) {throw new Error()}
}