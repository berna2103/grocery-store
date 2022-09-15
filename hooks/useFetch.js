
export default function useFetch (entryId) {
    const { data, error } = useSWR(`/pages/api/getEntry/${entryId}`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
  }