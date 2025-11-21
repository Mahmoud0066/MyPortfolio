'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, Menu, Home as HomeIcon, UserCircle, Mail, Link as LinkIcon } from 'lucide-react';
import ThemeToggleSwitch from '@/components/ThemeToggleSwitch';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const nameToType = "Mahmoud Abdelmenam";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { href: "#home", label: "Home", icon: HomeIcon, sectionId: "home" },
    { href: "#portfolio", label: "Portfolio", icon: UserCircle, sectionId: "portfolio" },
    { href: "#socials", label: "Socials", icon: LinkIcon, sectionId: "socials" },
    { href: "#contact", label: "Contact", icon: Mail, sectionId: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.sectionId);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-card/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-3 group cursor-pointer"
            aria-label="Homepage"
          >
            <CodeXml className="h-9 w-9 text-primary transition-transform group-hover:scale-110 group-hover:rotate-[-5deg] group-active:scale-95" />
            <span className={cn(
              "text-base md:text-lg font-bold min-h-[28px] whitespace-nowrap overflow-hidden",
              "bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-text-gradient-flow group-hover:brightness-125 transition-all duration-300"
            )}>
              {nameToType}
            </span>
          </button>
          <div className="flex items-center space-x-3">
            <nav className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <Button
                    variant="ghost"
                    key={link.sectionId}
                    onClick={() => scrollToSection(link.sectionId)}
                    className={cn(
                      "text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-95 px-4 py-2 rounded-md font-medium",
                      isActive && "bg-primary/10 text-primary font-semibold shadow-inner"
                    )}
                  >
                    {link.label}
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
                     <button onClick={() => { scrollToSection('home'); setMobileMenuOpen(false); }} className="flex items-center space-x-3 group">
                        <CodeXml className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-foreground">
                          M. Abdelmenam
                        </span>
                    </button>
                  </div>
                  <nav className="flex flex-col space-y-2 p-4 flex-grow">
                    {navLinks.map((link) => {
                       const isActive = activeSection === link.sectionId;
                      return (
                      <SheetClose asChild key={link.sectionId}>
                        <button
                          onClick={() => { scrollToSection(link.sectionId); setMobileMenuOpen(false); }}
                          className={cn(
                            "flex items-center text-lg text-foreground hover:text-primary transition-all duration-200 ease-in-out hover:bg-primary/10 hover:translate-x-1 p-4 rounded-lg font-medium active:scale-[0.98]",
                            isActive && "bg-primary/15 text-primary font-semibold shadow-sm"
                            )}
                        >
                          <link.icon className={cn("mr-4 h-6 w-6", isActive ? "text-primary" : "text-primary/80")} /> {link.label}
                        </button>
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
