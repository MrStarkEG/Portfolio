import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MrStarkEG - Portfolio',
  description: 'Full-stack developer specializing in web scraping, data engineering, and modern web development',
  keywords: 'web scraping, data engineering, full-stack developer, python, react, fastapi',
  authors: [{ name: 'MrStarkEG' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}