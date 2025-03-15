
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Facilities from "./pages/Facilities";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MediaCenter from "./pages/MediaCenter";
import Navbar from "./components/Navbar";

// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProfilesManagement from "./pages/admin/ProfilesManagement";
import FacilitiesManagement from "./pages/admin/FacilitiesManagement";
import ActivitiesManagement from "./pages/admin/ActivitiesManagement";
import MediaManagement from "./pages/admin/MediaManagement";
import MessagesManagement from "./pages/admin/MessagesManagement";

import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <DataProvider>
              {/* Public Routes */}
              <Routes>
                {/* Public Pages with Navbar */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <div className="pt-16">
                        <Routes>
                          <Route index element={<Index />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/facilities" element={<Facilities />} />
                          <Route path="/activities" element={<Activities />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/media-center" element={<MediaCenter />} />
                        </Routes>
                      </div>
                    </>
                  }
                />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                
                {/* Protected Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/profiles"
                  element={
                    <ProtectedRoute>
                      <ProfilesManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/facilities"
                  element={
                    <ProtectedRoute>
                      <FacilitiesManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/activities"
                  element={
                    <ProtectedRoute>
                      <ActivitiesManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/media"
                  element={
                    <ProtectedRoute>
                      <MediaManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute>
                      <MessagesManagement />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DataProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
