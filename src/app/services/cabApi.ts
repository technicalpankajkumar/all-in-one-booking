import { baseApi } from "./baseApi";

export const cabApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCabs: builder.query<any, void>({
      query: () => ({ url: "/cab", method: "GET" }),
      providesTags: ["Driver"],
    }),
    getCabById: builder.query<any, string>({
      query: (id) => ({ url: `/driver/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    createCab:builder.mutation({
      query:(payload)=> ({ url:"/cab/create", method:"POST", body:payload}),
      invalidatesTags:["Driver"]
    }),
    updateCab: builder.mutation({
      query: ({id,payload}) => ({ url: `/cab/update/${id}`, method: "PUT", body:payload }),
      invalidatesTags: ["Driver"],
    }),
    deleteCab: builder.mutation({
      query: ({id}) => ({ url: `/cab/delete/${id}`, method: "DELETE"}),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const {useGetCabsQuery, useGetCabByIdQuery, useCreateCabMutation, useUpdateCabMutation, useDeleteCabMutation} = cabApi;
