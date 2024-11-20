import { useEffect, useState } from "react";

export const useFetch = <Response>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Response | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((json) => {
        if (cancelled) return;

        setData(json);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
      setError(undefined);
      setData(undefined);
    };
  }, [url]);

  return { loading, data, error };
};
