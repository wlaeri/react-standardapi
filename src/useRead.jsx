import { useEffect, useState, useContext } from "react";
import context from "./context";
import invariant from "invariant";

const useRead = (baseModel, params, override) => {
  const client = useContext(context);
  invariant(
    client,
    "You must wrap your app in a Provider" +
      " component in order to use the useRead hook."
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      try {
        if (override) return;
        const response = await client.read(baseModel, params);
        setData(response.data);
        if (response.data && response.data.length)
          setCount(response.data.length);
        else setCount(1);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    run();
  }, []);

  const refetch = async () => {
    try {
      if (override) return;
      setLoading(true);
      setData(null);
      setError(null);
      setCount(0);
      const response = await client.read(baseModel, params);
      setData(response.data);
      if (response.data && response.data.length) setCount(response.data.length);
      else setCount(1);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    count,
    refetch
  };
};

export default useRead;
