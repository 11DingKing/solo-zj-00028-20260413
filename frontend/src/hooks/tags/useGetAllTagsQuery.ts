import { useQuery } from "react-query";
import { BlogServicesAPI } from "../../services/blogServices";

export const useGetAllTagsQuery = () => {
  return useQuery(["get-all-tags"], () => BlogServicesAPI.getAllTags(), {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
};
