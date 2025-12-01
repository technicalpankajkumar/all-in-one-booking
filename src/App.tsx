import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cabs from "./pages/Cabs";
import Hotels from "./pages/Hotels";
import TourPackages from "./pages/TourPackages";
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
import PackageTour from "./pages/TourPackage";
import BaseLayout from "./components/layout/BaseLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Index/>} />
            <Route path="/cabs" element={<Cabs />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/tour-packages" element={<PackageTour />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/booking" element={<BookingCab />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/notifications" element={<NotFoundPage />} />
            <Route path="/dashboard/settings" element={<NotFoundPage />} />
            <Route path="/dashboard/lab-tests" element={<LabTests />} />
            <Route path="/dashboard/lab-tests/:id" element={<LabTestDetail />} />
            <Route path="/dashboard/*" element={<NotFoundPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
