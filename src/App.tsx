import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
      <AuthProvider>
        <Toaster reverseOrder={false}/>
        <AppRouter/>
      </AuthProvider>
  )
}

export default App
