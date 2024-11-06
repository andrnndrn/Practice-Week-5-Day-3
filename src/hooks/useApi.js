import axios from "axios"
import { useEffect, useState } from "react"

const useApi = (url) => {
    const [isLoading, setIsLoading] = useState(false)
    const [apiData, setApiData] = useState(null)
    const [serverError, setServerError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                setApiData(response.data)
            } catch (error) {
                setServerError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])

    return {isLoading, apiData, serverError}
}
export default useApi;