import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const activeHttpRequest: any = useRef([]);

    const sendRequest = useCallback(async (url: string, method: string='GET', body= null, headers={}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequest.current = activeHttpRequest.current.filter((reqCtrl:any) => reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach((abortCtrl: any) => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
}