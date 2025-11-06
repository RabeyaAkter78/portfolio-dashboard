import { baseApi } from "../../api/BaseApi";

const BlogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: ({ title, page, limit }) => {
        const params = new URLSearchParams({
          page,
          limit,
        });
        if (title) params.append("title", title);
        return {
          url: `/blogs?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["blogs"],
    }),

    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs/create-blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),

    getSingleBlog: builder.query({
      query: ({ _id, data }) => ({
        url: `/blogs/${_id}`,
        method: "GET",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    updateBlog: builder.query({
      query: ({ _id, data }) => ({
        url: `/blogs/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (_id) => ({
        url: `/blogs/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogQuery,
} = BlogsApi;
