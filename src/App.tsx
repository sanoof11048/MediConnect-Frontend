import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './routes/AppRouter'
import { RelativeProvider } from './context/RelativeContext'
import { AdminProvider } from './context/AdminContext'
import { HomeNurseProvider } from './context/HomeNurseContext'

function App() {
  return (
    <AuthProvider>
      <RelativeProvider>
        <AdminProvider>
          <HomeNurseProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <AppRouter />
          </HomeNurseProvider>
        </AdminProvider>
      </RelativeProvider>
    </AuthProvider>
  )
}

export default App
