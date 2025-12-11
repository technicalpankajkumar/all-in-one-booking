import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<any, void>({
      query: () => ({ url: "/booking", method: "GET" }),
      providesTags: ["Booking"],
    }),
    getBookingById: builder.query<any, string>({
      query: (id) => ({ url: `/booking/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    createBooking:builder.mutation({
      query:(payload)=> ({ url:"/booking/create", method:"POST", body:JSON.stringify(payload)}),
      invalidatesTags:["Booking"]
    }),
    updateBookingStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/booking/${id}/status`, method: "PUT", body: { status } }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useGetBookingsQuery, useGetBookingByIdQuery, useCreateBookingMutation, useUpdateBookingStatusMutation } = bookingApi;
