import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cabs from "./pages/Cabs/Cabs";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import HotelDetails from "./pages/HotelDetails";
import BookingCab from "./pages/BookingCab";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import LabTests from "./pages/LabTests";
import LabTestDetail from "./pages/LabTestDetail";
import TourPackage from "./pages/TourPackage";
import BaseLayout from "./components/layout/BaseLayout";
import CabListing from "./pages/Cabs/CabListing";
import DriverListing from "./pages/drivers/DriverListing";
import DriverDetailsPage from "./pages/drivers/DriverDetailsPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import BookingConfirmation from "./pages/Cabs/booking/BookingConfirmation";
import PaymentPage from "./pages/Cabs/booking/Payment";
import BookingListing from "./pages/Bookings/BookingListing";
import { Provider } from "react-redux";
import { store } from "./app/store";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
       <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            {/* PUBLIC SITE ROUTES */}
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/cabs" element={<Cabs />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/tour-packages" element={<TourPackage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/hotel/:id" element={<HotelDetails />} />
               {/* Booking Routes */}
            <Route path="/booking/:id" element={<BookingCab />} />
            <Route path="/booking/:id/payment" element={<PaymentPage />} />
            <Route path="/booking/:id/confirmation" element={<BookingConfirmation />} />
                        
            </Route>

            {/* PROTECTED DASHBOARD ROUTES */}
            <Route
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/bookings" element={<BookingListing />} />
              <Route path="/dashboard/cabs" element={<CabListing />} />
              <Route path="/dashboard/drivers" element={<DriverListing />} />
              <Route path="/dashboard/driver/:id" element={<DriverDetailsPage />} />
              <Route path="/dashboard/settings" element={<NotFoundPage />} />
              <Route path="/dashboard/lab-tests" element={<LabTests />} />
              <Route path="/dashboard/lab-tests/:id" element={<LabTestDetail />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
