export const runtime = 'nodejs';
import type { Metadata } from 'next'
import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import defaultTheme from '@mui/material/styles/defaultTheme';

// const bcrypt = require('bcrypt');

// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Report for Dr Tabur',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <CssBaseline />
      <ThemeProvider theme={defaultTheme}>
      <body className='font-sans bg-slate-100 text-black'>
        <article>
            {children}
        </article>
      </body>
      </ThemeProvider>
    </html>
  )
}
