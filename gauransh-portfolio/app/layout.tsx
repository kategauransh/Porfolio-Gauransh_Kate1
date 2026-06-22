import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Gauransh Kate | Java Backend Engineer",
  description: "Senior Java Backend Engineer specializing in Spring Boot, Spring Security, Hibernate, PostgreSQL, Docker, and scalable system design.",
  keywords: [
    "Gauransh Kate",
    "Java Backend Engineer",
    "Spring Boot Developer",
    "Spring Security Expert",
    "Backend Architect",
    "System Design Engineer",
    "PostgreSQL Database Design",
    "Docker REST APIs",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Gauransh Kate" }],
  creator: "Gauransh Kate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/kategauransh",
    title: "Gauransh Kate | Java Backend Engineer",
    description: "Building secure, resilient APIs, and enterprise-grade backend systems using Spring Boot, Hibernate, and PostgreSQL.",
    siteName: "Gauransh Kate Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Gauransh Kate Portfolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gauransh Kate | Java Backend Engineer",
    description: "Building secure, resilient APIs, and enterprise-grade backend systems using Spring Boot, Hibernate, and PostgreSQL.",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"],
    creator: "@kategauransh",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gauransh Kate",
    "jobTitle": "Java Backend Engineer",
    "description": "Specialist in building secure, high-throughput backend services, authentication systems, and database-driven platforms.",
    "url": "https://github.com/kategauransh",
    "sameAs": [
      "https://github.com/kategauransh",
      "https://www.linkedin.com/in/gauranshkate26"
    ],
    "knowsAbout": [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Hibernate",
      "JPA",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "Maven",
      "Git",
      "System Design",
      "Database Design"
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-white/10`}>
        {children}
      </body>
    </html>
  );
}
