
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Public pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Facilities from "./pages/Facilities";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MediaCenter from "./pages/MediaCenter";

// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProfilesManagement from "./pages/admin/ProfilesManagement";
import FacilitiesManagement from "./pages/admin/FacilitiesManagement";
import ActivitiesManagement from "./pages/admin/ActivitiesManagement";
import MediaManagement from "./pages/admin/MediaManagement";
import MessagesManagement from "./pages/admin/MessagesManagement";
import RegistrationsManagement from "./pages/admin/RegistrationsManagement";

import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <DataProvider>
                <Routes>
                  {/* Public Pages with Layout (Navbar) */}
                  <Route element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/media-center" element={<MediaCenter />} />
                  </Route>

                  {/* Admin Login (Outside Protected Routes) */}
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
                  <Route
                    path="/admin/registrations"
                    element={
                      <ProtectedRoute>
                        <RegistrationsManagement />
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
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
