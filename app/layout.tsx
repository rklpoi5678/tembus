"use client"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { koKR } from '@clerk/localizations'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and Provider
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { useState } from 'react';
import { Header } from '@/components/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ClerkProvider appearance={{
      elements: {
       formButtonPrimary:{
        backgroundColor: "hsl(222.2 47.4% 11.2%)",
        "&:hover": {
          backgroundColor: "hsl(222.2 47.4% 20%)",
        }, 
        padding: '0.75rem 1.25rem', // py-3 px-5 (approx)
        borderRadius: '0.375rem', // rounded-md
        fontSize: '0.875rem', // text-sm
        fontWeight: '500', // font-medium
       },
       button: {
            '&[data-variant="outline"]': { // Hypothetical data attribute if Clerk exposes it
            backgroundColor: 'transparent',
            color: 'hsl(222.2 47.4% 11.2%)', // Text color as primary
            border: '1px solid hsl(222.2 47.4% 11.2%)', // Primary border
          }
        },
      },
      variables:{
        colorPrimary: 'hsl(222.2 47.4% 11.2%)',
        colorText: 'hsl(222.2 84% 4.9%)',
      }
    }} localization={koKR}>
      <html lang="ko">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <Header />
        </header>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}