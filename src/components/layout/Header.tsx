
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, Menu, Home as HomeIcon, UserCircle, Rss, Mail, Link as LinkIcon } from 'lucide-react'; // Added LinkIcon
import ThemeToggleSwitch from '@/components/ThemeToggleSwitch';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet'; 
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const nameToType = "Mahmoud Abdelmenam";

export default function Header() {
  const [displayName, setDisplayName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const charIndexRef = useRef<number>(0);
  const currentNameRef = useRef<string>('');
  const lastTimestampRef = useRef<number>(0);
  const pathname = usePathname();

  const TYPING_SPEED_MS_PER_CHAR = 100; 

  const typeCharacter = useCallback((timestamp: number) => {
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }
    const elapsed = timestamp - lastTimestampRef.current;

    if (elapsed >= TYPING_SPEED_MS_PER_CHAR) {
      lastTimestampRef.current = timestamp - (elapsed % TYPING_SPEED_MS_PER_CHAR);
      
      if (charIndexRef.current < nameToType.length) {
        currentNameRef.current += nameToType[charIndexRef.current];
        setDisplayName(currentNameRef.current);
        charIndexRef.current++;
        setIsTypingComplete(false);
      } else {
        setIsTypingComplete(true);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }
    }

    if (charIndexRef.current <= nameToType.length) {
      animationFrameRef.current = requestAnimationFrame(typeCharacter);
    }
  }, []);

  const clearTypingAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastTimestampRef.current = 0;
    charIndexRef.current = 0;
    currentNameRef.current = '';
  }, []);

  const startTypingAnimation = useCallback(() => {
    clearTypingAnimation();
    setIsTypingComplete(false);
    setDisplayName(''); 
    animationFrameRef.current = requestAnimationFrame(typeCharacter);
  }, [clearTypingAnimation, typeCharacter]);

  useEffect(() => {
    startTypingAnimation();
    return () => {
      clearTypingAnimation();
    };
  }, [startTypingAnimation, clearTypingAnimation]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isTypingComplete || displayName.length === nameToType.length) {
        startTypingAnimation();
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/portfolio", label: "Portfolio", icon: UserCircle },
    { href: "/blog", label: "Blog", icon: Rss },
    { href: "/socials", label: "Socials", icon: LinkIcon }, // Added Socials link
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-card/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={handleLogoClick}
            aria-label="Homepage, click to restart name animation"
          >
            <CodeXml className="h-9 w-9 text-primary transition-transform group-hover:scale-110 group-hover:rotate-[-5deg] group-active:scale-95" />
            <span className={cn(
              "text-base md:text-lg font-bold min-h-[28px] whitespace-nowrap overflow-hidden",
              "bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-text-gradient-flow group-hover:brightness-125 transition-all duration-300"
            )}>
              {displayName}
              {!isTypingComplete && <span className="animate-pulse-caret"></span>}
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <nav className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Button 
                    variant="ghost" 
                    asChild 
                    key={link.href} 
                    className={cn(
                      "text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-95 px-4 py-2 rounded-md font-medium",
                      isActive && "bg-primary/10 text-primary font-semibold shadow-inner"
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                );
              })}
            </nav>
            <ThemeToggleSwitch />
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-md active:scale-95">
                    <Menu className="h-7 w-7" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-card p-0 flex flex-col border-l border-border/50 shadow-xl">
                   <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle> 
                  <div className="p-6 border-b border-border/50 flex justify-start items-center">
                     <Link href="/" className="flex items-center space-x-3 group" onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleLogoClick(e);
                      }}>
                        <CodeXml className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-foreground">
                          M. Abdelmenam
                        </span>
                    </Link>
                  </div>
                  <nav className="flex flex-col space-y-2 p-4 flex-grow">
                    {navLinks.map((link) => {
                       const isActive = pathname === link.href;
                      return (
                      <SheetClose asChild key={link.href}>
                        <Link 
                          href={link.href} 
                          className={cn(
                            "flex items-center text-lg text-foreground hover:text-primary transition-all duration-200 ease-in-out hover:bg-primary/10 hover:translate-x-1 p-4 rounded-lg font-medium active:scale-[0.98]",
                            isActive && "bg-primary/15 text-primary font-semibold shadow-sm"
                            )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <link.icon className={cn("mr-4 h-6 w-6", isActive ? "text-primary" : "text-primary/80")} /> {link.label}
                        </Link>
                      </SheetClose>
                    );
                    })}
                  </nav>
                   <div className="p-6 mt-auto border-t border-border/50">
                      <p className="text-xs text-muted-foreground text-center">
                        &copy; {new Date().getFullYear()} Mahmoud Abdelmenam
                      </p>
                    </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
