import { useState, useEffect, useCallback } from 'react';

interface AjaxState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAjax<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AjaxState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Имитация сетевой задержки (AJAX)
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));
      const result = await fetcher();
      setState({ data: result, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}
