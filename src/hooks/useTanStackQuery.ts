import axios from 'axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

interface UseTanStackQueryProps {
  queryKey: string
  API: string
  retry: number
  gcTime: number
}

//  in case if we want to use React Query instead of Redux
const useTanStackQuery = ({ queryKey, API, retry, gcTime }: UseTanStackQueryProps) => {
  return useQuery({
    queryKey: [queryKey, API],
    queryFn: async () => {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          const { data } = await axios.get(API)
          resolve(data)
        }, 3000) // 3 seconds delay to fetch the data
      })

      return response
    },
    placeholderData: keepPreviousData,
    retry,
    gcTime,
  })
}

export default useTanStackQuery

// Documentation
/**
 * How to use this hook:
 *  import useTanStackQuery from '@/hooks/useTanStackQuery
 *
 *  const { data } = useTanStackQuery({
 *   queryKey: 'myData',
 *   API: 'http://localhost:8000/DUMMY_USERS',
 *   retry: 3,
 *   gcTime: 60000,
 *  });
 *
 *  console.log('React query data:', data);
 */

/**
 * queryKey:
 * A unique identifier for the data this query will fetch. This is used by react-query to manage caching,
 * fetching, and updating of this data. It's typically an array where the first element is a string (the actual key),
 * and the rest of the elements are variables that, when changed, should trigger a refetch of the data.
 */

/**
 * queryFn:
 * A function that fetches the data. This function should return a Promise that resolves with the data.
 */

/**
 * placeholderData:
 * The data that should be used as a placeholder while the actual data is being fetched.
 */

/**
 * API:
 * The endpoint from which the data should be fetched. This could be a URL string or a function that returns a URL string.
 * The data returned from this API will be used by the query.
 */

/**
 * retry:
 * The number of times a failed query should be retried before it's marked as failed.
 * This is useful when your API might be temporarily unavailable or experiencing intermittent issues.
 */

/**
 * gcTime:
 * The time in milliseconds after which stale data will be garbage collected.
 * Stale data is data that has been fetched but is no longer being used by any of your components.
 * By garbage collecting stale data, react-query ensures that your app doesn't use more memory than necessary.
 */

/**
 * setTimeout:
 * The setTimeout function is used to simulate a delay in fetching the data.
 */
