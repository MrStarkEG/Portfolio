import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import ClickSpark from '@/components/ClickSpark'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

export const viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'MrStarkEG',
  description: 'Full-stack developer specializing in web scraping, data engineering, and modern web development',
  keywords: 'web scraping, data engineering, full-stack developer, python, react, fastapi',
  authors: [{ name: 'MrStarkEG' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={20} sparkCount={8} duration={400} />
        {children}
      </body>
    </html>
  )
}