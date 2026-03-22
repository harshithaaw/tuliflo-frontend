import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import CreateGift from './pages/create/CreateGift'
import Dashboard from './pages/dashboard/Dashboard'
import GiftLanding from './pages/experience/GiftLanding'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Gift Experience */}
        <Route path="/gift/:shareableLink" element={<GiftLanding />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute>
              <CreateGift />
            </ProtectedRoute>
          } 
        />
        
        {/* Default */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App