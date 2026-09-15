import {useState, useEffect} from "react"

const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(url)
            const result = await response.json()
            // console.log(result)
            setData(result)
            setLoading(false)
        }
        getData()
    }, [url])
    return {loading, data}
}

export default useFetch