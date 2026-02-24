<<<<<<< HEAD
import React from "react"

function App() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-linear-to-l from-primary via-pink-400 to-secondary p-20 rounded-2xl border border-dashed border-white">
          <p className="capitalize font-bold font-mono text-white text-8xl">comming soon....</p>
        </div>
      </div>
    </>
  )
}

export default App
=======
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardLayout from './components/layout/DashboardLayout'
import OverviewPage from './pages/dashboard/OverviewPage'
import RoadmapPage from './pages/dashboard/RoadmapPage'
import InterviewPage from './pages/dashboard/InterviewPage'
import ResumePage from './pages/dashboard/ResumePage'
import AptitudePage from './pages/dashboard/AptitudePage'
import ProgressPage from './pages/dashboard/ProgressPage'
import SettingsPage from './pages/dashboard/SettingsPage'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="interview" element={<InterviewPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="aptitude" element={<AptitudePage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}
>>>>>>> 5e786faba94bd365ebd3edda9ec005391f4d77b4
