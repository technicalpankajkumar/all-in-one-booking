import { baseApi } from "./baseApi";

export const cabApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCabs: builder.query<any, void>({
      query: () => ({ url: "/cab/get", method: "GET" }),
      providesTags: ["Cab"],
    }),
    getCabById: builder.query<any, string>({
      query: (id) => ({ url: `/driver/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    createCab:builder.mutation({
      query:(payload)=> ({ url:"/cab/create", method:"POST", body:payload}),
      invalidatesTags:["Cab"]
    }),
    updateCab: builder.mutation({
      query: ({id,payload}) => ({ url: `/cab/update/${id}`, method: "PUT", body:payload }),
      invalidatesTags: ["Cab"],
    }),
    deleteCab: builder.mutation({
      query: ({id}) => ({ url: `/cab/delete/${id}`, method: "DELETE"}),
      invalidatesTags: ["Cab"],
    }),
    getCabFeatures: builder.query({
      query: ({ search, limit, page, type }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (type) params.append("type", type);

        return {
          url: `/cab/feature/get?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {useGetCabsQuery, useGetCabByIdQuery, useCreateCabMutation, useUpdateCabMutation, useDeleteCabMutation, useGetCabFeaturesQuery} = cabApi;
