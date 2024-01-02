'use client'
import './assets/stylesheets/jsvectormap.min.scss'
import './assets/stylesheets/flatpickr.min.scss'
import './assets/stylesheets/code.min.scss'
import './assets/stylesheets/bootstrap.min.scss'
import './assets/stylesheets/icons.min.scss'
import './assets/stylesheets/app.min.scss'
import './assets/stylesheets/custom.scss'
import { AuthProvider } from '../app/context/AuthContext'
import { useEffect } from 'react';

export default function RootLayout({ children }) {
    useEffect(() => {
    require('../app/assets/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <html lang="en">
      <body data-layout="horizontal" data-topbar="dark">
        <AuthProvider>
          {children}
        </AuthProvider>
        
      </body>
    </html>
  )
}
