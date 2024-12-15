import { AUTH } from '@/constants';
import useSWR from 'swr'

const fetcher = (path: string) => fetch(path, {headers: {
  Authorization: AUTH,
}}).then(r => r.json());

export default function useFetch (path: string) {
  const { data, isLoading, error } = useSWR(path, fetcher);

  return {
    data,
    isLoading,
    error,
  }
}
