import { useState, useEffect } from 'react'

const useFetch = (initialUrl, initialOptions = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const [url] = useState(initialUrl)
  const [options] = useState(initialOptions)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const res = await fetch(url, options)

        if (!res.ok) throw new Error(res.statusText)

        const data = await res.json()
        setData(data)
      } catch (err) {
        setError(true)
      }

      setLoading(false)
    }

    // Fetch the data
    fetchData()

    // Clean up
    return () => {}
  }, [url, options])

  return { loading, error, data }
}

export default useFetch
