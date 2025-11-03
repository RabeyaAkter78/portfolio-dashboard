import { baseApi } from "../../api/BaseApi";

const SkillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: ({ title, page, limit }) => {
        const params = new URLSearchParams({
          page,
          limit,
        });
        if (title) params.append("title", title);
        return {
          url: `/skills?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["skills"],
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skills/create-skill",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["skills"],
    }),
  }),
});

export const { useGetAllSkillsQuery, useCreateSkillMutation } = SkillApi;
