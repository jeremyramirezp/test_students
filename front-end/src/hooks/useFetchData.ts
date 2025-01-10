import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Props<T> {
    data: Data<T>;
    setData: React.Dispatch<React.SetStateAction<Data<T>>>;
    loading: boolean;
    error: ErrorType;
    otherData: any;
}

export const useFetchData = <T>(url: string): Props<T> => {
    const [data, setData] = useState<Data<T>>(null);
    const [otherData, setOtherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true)

        const fetchData = async () => {
            try {
                const response = await fetch(url, controller);

                if (! response.ok) {
                    throw new Error("Error en la petición")
                }

                const jsonData = await response.json();
                const { data, ...rest } = jsonData;
                setData(data as T)
                setOtherData(rest);
                setError(null);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchData();

        return () => {
            controller.abort();
        }
    }, [url])

    return { data, setData, otherData, loading, error }
}