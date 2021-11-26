import {useQuery as aUseQuery} from "@apollo/client"

export default function useQuery(query, options) {
  return aUseQuery(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    ...options
  });
}