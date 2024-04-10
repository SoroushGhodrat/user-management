import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseTanStackQueryProps {
  queryKey: string;
  API: string;
  retry: number;
  gcTime: number;
}

const useTanStackQuery = ({ queryKey, API, retry, gcTime }: UseTanStackQueryProps) => {
  return useQuery({
    queryKey: [queryKey, API],
    queryFn: async () => {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          const { data } = await axios.get(API);
          resolve(data);
        }, 3000); // 3 seconds delay
      });

      return response;
    },
    placeholderData: keepPreviousData,
    retry,
    gcTime,
  });
};

export default useTanStackQuery;
