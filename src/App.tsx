import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Maintenance from "./pages/Maintenance";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import ExcelImporter from "./pages/ExcelImporter";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/vehicles" element={<Layout><Vehicles /></Layout>} />
          <Route path="/drivers" element={<Layout><Drivers /></Layout>} />
          <Route path="/maintenance" element={<Layout><Maintenance /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/excel" element={<Layout><ExcelImporter /></Layout>} />
          <Route path="/chatbot" element={<Layout><Chatbot /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/routes" element={<Layout><Dashboard /></Layout>} />
          <Route path="/alerts" element={<Layout><Dashboard /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
