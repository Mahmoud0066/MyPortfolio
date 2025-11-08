
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import StarryBackground from '@/components/layout/StarryBackground';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import localFont from 'next/font/local';

const poppins = localFont({
  src: [
    {
      path: '../fonts/Poppins-Light.ttf',
      weight: '300',
    },
    {
      path: '../fonts/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../fonts/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: '../fonts/Poppins-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../fonts/Poppins-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-poppins', 
  display: 'swap',
});

const APP_NAME = "Mahmoud Abdelmenam";
const APP_DESCRIPTION = "Personal portfolio of Mahmoud Abdelmenam, a full-stack software developer specializing in modern web technologies.";
const APP_ICON_PATH = "/images/icons/icon.png";

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
    icon: APP_ICON_PATH,
    apple: APP_ICON_PATH,
    shortcut: APP_ICON_PATH,
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
      <head />
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
