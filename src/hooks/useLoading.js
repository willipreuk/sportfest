import { useEffect, useState } from 'react';

export default () => {
  // TODO: realLoading initialState false
  const [loading, setRealLoading] = useState(true);
  const [tmpLoading, setLoading] = useState(false);

  useEffect(() => { // eslint-disable-line consistent-return
    if (tmpLoading) setRealLoading(true);

    if (!tmpLoading && loading) {
      const timeout = setTimeout(() => {
        setRealLoading(false);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [tmpLoading, loading]);

  return { loading, setLoading };
};
