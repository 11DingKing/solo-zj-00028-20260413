import { api } from "./apiConfig";
import { DeleteBlog, EditBlog, PostBlog } from "./types";

class BlogServicesAPI {
  static postBlog = async ({ data, authToken }: PostBlog) => {
    const response = await api.post("blogs/blogpost/", data, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  };

  static editBlog = async ({ blogId, data, authToken }: EditBlog) => {
    const response = await api.put(`blogs/blog/${blogId}/`, data, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  };

  static deleteBlog = async ({ blogId, authToken }: DeleteBlog) => {
    const response = await api.delete(`blogs/blog/${blogId}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  static getBlog = async (blogId: string, authToken: string | null) => {
    const response = await api.get(`blogs/blog/${blogId}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  static getUserBlogs = async (status: string, authToken: string | null) => {
    const response = await api.get(`blogs/userblogs/?status=${status}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  static getAllBlogs = async (
    category: string | null,
    tag: string | null,
    page: number,
  ) => {
    let url: string = `blogs/all/?page=${page}`;
    if (category && category !== "all") {
      url += `&category=${category}`;
    }
    if (tag) {
      url += `&tag=${tag}`;
    }

    const response = await api.get(url);
    return response.data;
  };

  static searchBlog = async (title: string, authToken: string | null) => {
    const response = await api.get(`blogs/search/?title=${title}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  static getAllTags = async () => {
    const response = await api.get("blogs/tags/");
    return response.data;
  };

  static createTag = async (name: string, authToken: string | null) => {
    const response = await api.post(
      "blogs/tags/create/",
      { name },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return response.data;
  };

  static deleteTag = async (tagId: string, authToken: string | null) => {
    const response = await api.delete(`blogs/tags/${tagId}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };
}

export { BlogServicesAPI };
