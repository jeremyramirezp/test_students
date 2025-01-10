import './globals.css';
import { Home } from './_root/pages';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './_auth/forms/SignUpForm';
import SignInForm from './_auth/forms/SignInForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <>
      <main className='p-8'>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/iniciar-sesion' element={<SignInForm />} />
            <Route path='/registrate' element={<SignUpForm />} />
          </Route>

          {/* Private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>
      </main>
      <Toaster />
    </>
  )
}

export default App
