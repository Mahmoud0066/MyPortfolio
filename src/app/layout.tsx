
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import StarryBackground from '@/components/layout/StarryBackground';
import ReactQueryProvider from '@/components/ReactQueryProvider';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-poppins', 
  display: 'swap',
});

const APP_NAME = "PersonalDev | Mahmoud Abdelmenam";
const APP_DESCRIPTION = "Personal portfolio of Mahmoud Abdelmenam, a full-stack software developer specializing in modern web technologies.";
const APP_BASE_ICON_URL = "https://lh3.googleusercontent.com/pw/AP1GczOFwxGErCEE1mf9cKfuzms0UWcKRUlUJ-cu0z1vegSMk4L1gp7IFv25iOm0Ebxe5AywSmYG70W3BRK68xQ3PvhQnALJ6vUJr8VXEQJSGb77xMvqgk7-vyfMm5Ewzyr32AryuZiv72Q27FTaiJay_9lw";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json", 
  icons: {
    icon: [
      { url: `${APP_BASE_ICON_URL}=s16-c`, sizes: "16x16", type: "image/png" },
      { url: `${APP_BASE_ICON_URL}=s32-c`, sizes: "32x32", type: "image/png" },
      { url: `${APP_BASE_ICON_URL}=s48-c`, sizes: "48x48", type: "image/png" },
    ],
    apple: `${APP_BASE_ICON_URL}=s180-c`, 
    shortcut: `${APP_BASE_ICON_URL}=s192-c`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(var(--primary))" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(var(--primary))" }, 
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground font-sans transition-colors duration-700 ease-in-out`}>
        <ThemeProvider
          attribute="data-theme" 
          storageKey="theme"
          defaultTheme="light" 
          enableSystem={false} 
          disableTransitionOnChange={false}
        >
          <ReactQueryProvider>
            <StarryBackground />
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 relative z-10">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
