import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/darkMode/theme-provider"
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/sonner"
import Bottom from "@/components/mobile/Bottom";
import Header from "@/components/desktop/Header";

const mont = localFont({
  src: "../../public/fonts/Montserrat-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-mont"
})

const bfo = localFont({
  src: "../../public/fonts/BagelFatOne-Regular.ttf",
  display: 'swap',
  variable: '--font-bfo'
})

const cs = localFont({
  src: "../../public/fonts/ClickerScript-Regular.ttf",
  display: 'swap',
  variable: '--font-cs'
})

const raleway = localFont({
  src: "../../public/fonts/Raleway-VariableFont_wght.ttf",
  display: 'swap',
  variable: "--font-raleway"
});

const aorta = localFont({
  src: "../../public/fonts/TiltWarp-Variable.ttf",
  display: 'swap',
  variable: "--font-aorta"
});

const APP_NAME = "Sledge"
const APP_TEMPLATE_TITLE = "%s - Sledge"
const APP_DEFAULT_TITLE = "Sledge - A testament to the life-giving force of compassion."
const APP_DEFAULT_DESCRIPTION = "The Sledge Project, much like the artery it was named after, stands as a symbol of strength, a testament to the life-giving force of compassion."

export const metadata: Metadata = {
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  manifest: "/manifest.json",
  creator: "Sledge",
  keywords: "",
  authors: [
    {
      name: "The Sledge",
      url: "https://SledgeToken.xyz"
    }
  ],
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TEMPLATE_TITLE
  },
  alternates: {
    canonical: "/%s",
  },
  description: APP_DEFAULT_DESCRIPTION,
  formatDetection: {
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      { url: "/logo/pwa/ios/128.png" },
      { url: "/logo/favicon.ico", media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: ['/logo/favicon.ico'],
    apple: [
      { url: '/logo/pwa/ios/32.png' },
      { url: '/logo/pwa/ios/180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TEMPLATE_TITLE,
    },
    description: APP_DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TEMPLATE_TITLE,
    },
    description: APP_DEFAULT_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
};

export const viewport: Viewport = {
  themeColor: "#E2E2E2",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-visual',
  colorScheme: 'light',
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`min-h-screen font-mont font-medium bg-light dark:bg-dark text-lightTextGray dark:text-darkTextGray`, raleway.variable, bfo.variable, cs.variable, mont.variable, aorta.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header/>
          {children}
          <Toaster />
          <Bottom />
        </ThemeProvider>
      </body>
    </html>
  );
}
