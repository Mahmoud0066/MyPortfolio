
import { Github, Linkedin, Twitter, CodeXml, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border/50 mt-auto shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="https://github.com/Mahmoud0066" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out hover:scale-110">
            <Github className="h-7 w-7" />
          </Link>
          <Link href="https://www.linkedin.com/in/mahmoudabdelmenam/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out hover:scale-110">
            <Linkedin className="h-7 w-7" />
          </Link>
          <Link href="https://x.com/mahmoud00666" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out hover:scale-110">
            <Twitter className="h-7 w-7" />
          </Link>
          <Link href="https://t.me/Mahmoud00666" target="_blank" rel="noopener noreferrer" aria-label="Telegram Profile" className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out hover:scale-110">
            <Send className="h-7 w-7" />
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
            <CodeXml className="h-5 w-5"/>
            <p className="text-sm">
                Designed & Developed by Mahmoud Abdelmenam
            </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/80 mt-3">
          Crafted with Next.js, Tailwind CSS, and a lot of <span className="text-red-500">❤</span>.
        </p>
      </div>
    </footer>
  );
}
