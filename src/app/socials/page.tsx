"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Twitter, Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
  cta: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Mahmoud0066",
    icon: Github,
    cta: "View Profile",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mahmoudabdelmenam/",
    icon: Linkedin,
    cta: "Connect",
  },
  {
    name: "Twitter / X",
    href: "https://x.com/mahmoud00666",
    icon: Twitter,
    cta: "Follow Me",
  },
  {
    name: "Telegram",
    href: "https://t.me/Mahmoud00666",
    icon: Send,
    cta: "Message Me",
  },
];

export default function SocialsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 animate-fade-in-up">
      <div className="text-center mb-12">
        <Users className="mx-auto h-20 w-20 text-primary mb-6 animate-subtle-pulse" />
        <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight text-foreground")}>
          Connect With Me
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mt-4 mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Find me on social media and other platforms. I&apos;m always happy to connect!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
        {socialLinks.map((social, index) => (
          <Card 
            key={social.name} 
            className="shadow-xl bg-card/80 backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 animate-fade-in-up animate-subtle-lift"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center space-x-4 p-6">
              <social.icon className="h-10 w-10 text-primary" />
              <CardTitle className="text-2xl font-semibold text-foreground">{social.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Button asChild className="w-full transition-transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-3 text-base">
                <Link href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.cta}
                  <social.icon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: `${0.2 + socialLinks.length * 0.1}s` }}>
            <Button asChild variant="outline" size="lg" className="transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] border-primary text-primary hover:bg-primary/10 shadow-md rounded-lg">
                <Link href="/contact">Or Send Me a Direct Message</Link>
            </Button>
        </div>
    </div>
  );
}
