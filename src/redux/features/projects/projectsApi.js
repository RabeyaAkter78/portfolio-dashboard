import { baseApi } from "../../api/BaseApi";

const ProjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects/create-project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    getAllProjects: builder.query({
      query: (paramsData) => {
        const params = new URLSearchParams();

        Object.entries(paramsData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, value);
          }
        });

        return {
          url: `/projects?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    getSingleProject: builder.query({
      query: (_id) => ({
        url: `/projects/${_id}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    updateProject: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/projects/${_id}`,
        method: "GET",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (_id) => ({
        url: `/projects/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} = ProjectApi;
