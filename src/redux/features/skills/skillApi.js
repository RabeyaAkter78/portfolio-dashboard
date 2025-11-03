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
      providesTags: ["Skills"],
    }),
  }),
});

export const { useGetAllSkillsQuery } = SkillApi;
