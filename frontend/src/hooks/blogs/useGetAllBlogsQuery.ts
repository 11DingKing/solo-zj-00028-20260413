import { useQuery } from "react-query";
import { BlogServicesAPI } from "../../services/blogServices";

export const useGetAllBlogsQuery = (
  category: string,
  tag: string | null,
  page: number,
) => {
  return useQuery(
    ["get-all-blogs", category, tag, page],
    () => BlogServicesAPI.getAllBlogs(category, tag, page),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    },
  );
};
