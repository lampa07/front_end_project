import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    if (!url) {
      return undefined;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cancel the request when the URL changes or the component unmounts.
    return () => controller.abort();
  }, [url, requestNumber]);

  const refetch = () => {
    setRequestNumber((currentNumber) => currentNumber + 1);
  };

  return {
    data: url ? data : null,
    loading: url ? loading : false,
    error: url ? error : null,
    refetch,
  };
}