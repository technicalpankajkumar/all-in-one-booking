import { baseApi } from "./baseApi";

interface GetCabsParams {
  page?: number;
  limit?: number;
  search?: string;
  car_type?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const cabApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCabs: builder.query<any, GetCabsParams>({
      query: ({
        page = 1,
        limit = 10,
        search,
        car_type,
        sortBy,
        sortOrder,
      }) => {
        const params = new URLSearchParams();

        params.append("page", String(page));
        params.append("limit", String(limit));

        if (search) params.append("search", search);
        if (car_type) params.append("car_type", car_type);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        return {
          url: `/cab/get?${params.toString()}`,
          method: "GET",
        };
      },
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
      query: (id) => ({ url: `/cab/delete/${id}`, method: "DELETE"}),
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
