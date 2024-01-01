export const runtime = 'nodejs';
import type { Metadata } from 'next'
import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createTheme } from '@mui/material';

export const metadata: Metadata = {
  title: 'Report for Dr Tabur',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const defaultTheme = createTheme();

  return (
    <>
    <CssBaseline />
    <ThemeProvider theme={defaultTheme}>
    <html lang="en" className='scroll-smooth snap-align-none snap-none'>

      <body className='font-sans bg-slate-100 text-black'>
        <article>
            {children}
        </article>
      </body>

    </html>
    </ThemeProvider>
    </>
  )
}
