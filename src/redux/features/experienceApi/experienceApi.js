import { baseApi } from "../../api/BaseApi";

const ExperienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperience: builder.query({
      query: () => ({
        url: "/experience",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),

    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience/create-experience",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),
    getSingleExperience: builder.query({
      query: (_id) => ({
        url: `/experience/${_id}`,
        method: "GET",
      }),
      providesTags: ["experience"],
    }),

    updateExperience: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/experience/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),
    deleteExperience: builder.mutation({
      query: (_id) => ({
        url: `/experience/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),
  }),
});

export const {
  useCreateExperienceMutation,
  useGetExperienceQuery,
  useGetSingleExperienceQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = ExperienceApi;
