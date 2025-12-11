import { baseApi } from "./baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query<any, void>({
      query: () => ({ url: "/driver", method: "GET" }),
      providesTags: ["Driver"],
    }),
    getDriverById: builder.query<any, string>({
      query: (id) => ({ url: `/driver/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    createDriver:builder.mutation({
      query:(payload)=> ({ url:"/driver/create", method:"POST", body:payload}),
      invalidatesTags:["Driver"]
    }),
    updateDriver: builder.mutation({
      query: ({id,payload}) => ({ url: `/driver/update/${id}`, method: "PUT", body:payload }),
      invalidatesTags: ["Driver"],
    }),
    deleteDriver: builder.mutation({
      query: ({id}) => ({ url: `/driver/delete/${id}`, method: "DELETE"}),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const { useGetDriversQuery, useGetDriverByIdQuery, useCreateDriverMutation, useUpdateDriverMutation , useDeleteDriverMutation} = driverApi;
