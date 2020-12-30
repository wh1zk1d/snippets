import { useState, useEffect } from 'react'

const useFetch = (url, options = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

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
        setError(err.message || 'Error while fetching')
      }

      setLoading(false)
    }

    // Fetch the data
    fetchData()

    // Clean up
    return () => {}
  }, [])

  return { loading, error, data }
}

export default useFetch
