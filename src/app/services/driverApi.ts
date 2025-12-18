import { baseApi } from "./baseApi";
interface GetDriverParams {
  page?: number;
  limit?: number;
  search?: string;
  car_type?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query<any, GetDriverParams>({
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
          url: `/driver?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Driver"],
    }),
    getDriverById: builder.query<any, string>({
      query: (id) => ({ url: `/driver/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Driver", id },"Driver"],
    }),
    createDriver:builder.mutation({
      query:(payload)=> ({ url:"/driver/create", method:"POST", body:payload}),
      invalidatesTags:(result, error, id) => [{ type: "Driver", id },"Driver"]
    }),
    updateDriver: builder.mutation({
      query: ({id,payload}) => ({ url: `/driver/update/${id}`, method: "PUT", body:payload }),
      invalidatesTags: (result, error, id) => [{ type: "Driver", id },"Driver"],
    }),
    deleteDriver: builder.mutation({
      query: ({id}) => ({ url: `/driver/delete/${id}`, method: "DELETE"}),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const { useGetDriversQuery, useGetDriverByIdQuery, useCreateDriverMutation, useUpdateDriverMutation , useDeleteDriverMutation} = driverApi;
