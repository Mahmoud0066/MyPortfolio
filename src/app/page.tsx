'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, ExternalLink, Github, Wrench, Users, Send as SendIcon, MessageCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm, ValidationError } from "@formspree/react";
import { Github as GithubIcon, Linkedin, Twitter } from "lucide-react";

const fullStackTitle = "Full-Stack Software Developer";
const firstNameToAnimate = "Mahmoud";
const lastNameToAnimate = "Abdelmenam";

interface Project {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    aiHint: string;
  };
  liveLink?: string;
  repoLink?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "Ragheef Omar - Online Restaurant Menu",
    description: "A sleek, modern, and responsive online menu for the Ragheef Omar restaurant. Built to provide a seamless user experience for customers browsing the menu on any device, with a focus on clear presentation and fast performance.",
    image: {
      src: "/images/projects/ragheef-omar.png",
      alt: "Screenshot of the Ragheef Omar online menu project.",
      aiHint: "restaurant menu"
    },
    liveLink: "https://ragheef-omar-online-menu.vercel.app/",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "UI/UX"],
  },
  {
    id: "2",
    title: "Light of Ayat - Quran Application",
    description: "An elegant and peaceful web application for reading and exploring the Holy Quran. Features a clean, distraction-free interface, making the sacred text accessible and easy to navigate for users everywhere.",
    image: {
      src: "/images/projects/light-of-ayat.png",
      alt: "Screenshot of the Light of Ayat Quran application.",
      aiHint: "quran app"
    },
    liveLink: "https://light-of-ayat.vercel.app/",
    tags: ["Next.js", "React", "API Integration", "UI/UX", "Spiritual"],
  },
  {
    id: "3",
    title: "Legacy Portfolio Website",
    description: "A comprehensive single-page portfolio built with pure HTML, CSS, and JavaScript. This project showcases foundational web development skills, featuring a responsive layout, smooth scrolling, and a detailed gallery of work.",
    image: {
      src: "https://picsum.photos/seed/picsum/600/400",
      alt: "Screenshot of a legacy portfolio website built with HTML and CSS.",
      aiHint: "portfolio website"
    },
    liveLink: "https://mahmoud0066.github.io/Mahmoud/",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
  },
  {
    id: "4",
    title: "Translator App",
    description: "A simple and effective translation tool built with vanilla JavaScript. This app allows users to quickly translate text between different languages, demonstrating core JavaScript skills and API integration.",
    image: {
      src: "https://picsum.photos/seed/picsum/600/401",
      alt: "Screenshot of a simple translator application.",
      aiHint: "translator app"
    },
    liveLink: "https://mahmoud0066.github.io/Translator-App/",
    repoLink: "https://github.com/Mahmoud0066/Translator-App",
    tags: ["JavaScript", "HTML", "CSS", "API"],
  },
];

const toolsAndTechnologies: string[] = [
  "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3",
  "React", "Next.js", "Node.js", "Express.js",
  "Python", "Flask", "C#", ".NET Core",
  "REST APIs", "GraphQL", "SQL Databases (PostgreSQL, MySQL)", "NoSQL Databases (MongoDB, Firebase)",
  "Git", "Docker", "Tailwind CSS", "Bootstrap",
  "Jest", "React Testing Library", "CI/CD", "Agile Methodologies"
];

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
    icon: GithubIcon,
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
    icon: SendIcon,
    cta: "Message Me",
  },
];

export default function Home() {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTitleTypingComplete, setIsTitleTypingComplete] = useState(false);
  const titleAnimationFrameRef = useRef<number | null>(null);
  const titleCharIndexRef = useRef<number>(0);
  const currentTitleRef = useRef<string>('');
  const titleLastTimestampRef = useRef<number>(0);
  const personalImage = "https://lh3.googleusercontent.com/pw/AP1GczOFwxGErCEE1mf9cKfuzms0UWcKRUlUJ-cu0z1vegSMk4L1gp7IFv25iOm0Ebxe5AywSmYG70W3BRK68xQ3PvhQnALJ6vUJr8VXEQJSGb77xMvqgk7-vyfMm5Ewzyr32AryuZiv72Q27FTaiJay_9lw=s512-c";

  const [state, handleSubmit] = useForm("xvgdpoop");

  const TITLE_TYPING_SPEED_MS_PER_CHAR = 120;

  const typeTitleCharacter = useCallback((timestamp: number) => {
    if (!titleLastTimestampRef.current) {
      titleLastTimestampRef.current = timestamp;
    }
    const elapsed = timestamp - titleLastTimestampRef.current;

    if (elapsed >= TITLE_TYPING_SPEED_MS_PER_CHAR) {
      titleLastTimestampRef.current = timestamp - (elapsed % TITLE_TYPING_SPEED_MS_PER_CHAR);

      if (titleCharIndexRef.current < fullStackTitle.length) {
        currentTitleRef.current += fullStackTitle[titleCharIndexRef.current];
        setDisplayedTitle(currentTitleRef.current);
        titleCharIndexRef.current++;
        setIsTitleTypingComplete(false);
      } else {
        setIsTitleTypingComplete(true);
        if (titleAnimationFrameRef.current) {
          cancelAnimationFrame(titleAnimationFrameRef.current);
          titleAnimationFrameRef.current = null;
        }
        return;
      }
    }

    if (titleCharIndexRef.current <= fullStackTitle.length) {
      titleAnimationFrameRef.current = requestAnimationFrame(typeTitleCharacter);
    }
  }, []);

  const clearTitleTypingAnimation = useCallback(() => {
    if (titleAnimationFrameRef.current) {
      cancelAnimationFrame(titleAnimationFrameRef.current);
      titleAnimationFrameRef.current = null;
    }
    titleLastTimestampRef.current = 0;
    titleCharIndexRef.current = 0;
    currentTitleRef.current = '';
  }, []);

  const startTitleTypingAnimation = useCallback(() => {
    clearTitleTypingAnimation();
    setIsTitleTypingComplete(false);
    setDisplayedTitle('');
    titleAnimationFrameRef.current = requestAnimationFrame(typeTitleCharacter);
  }, [clearTitleTypingAnimation, typeTitleCharacter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTitleTypingAnimation();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTitleTypingAnimation();
    };
  }, [startTitleTypingAnimation, clearTitleTypingAnimation]);

  return (
    <div className="space-y-24 md:space-y-32">
      <section id="home" className="flex flex-col items-center justify-center text-center space-y-12 py-12 md:py-16 animate-fade-in-up">
        <Card className="p-8 md:p-12 rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm w-full max-w-4xl transition-all duration-300 ease-in-out hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.3)] hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-12">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl border-4 border-primary flex-shrink-0">
              <Image
                src={personalImage}
                alt="Mahmoud Abdelmenam - Professional Headshot"
                width={224}
                height={224}
                data-ai-hint="personal photo"
                priority={true}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center md:text-left space-y-3 flex-grow animate-fade-in-up flex flex-col items-center md:items-start" style={{ animationDelay: '0.2s' }}>
              <h1 className={cn(
                "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground"
              )}>
                <span className="block">Hi, I&apos;m{' '}
                {firstNameToAnimate.split("").map((letter, index) => (
                  <span
                    key={`first-${index}`}
                    className="letter-drop-in"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    {letter}
                  </span>
                ))}
                </span>
                <span className="block">
                  {lastNameToAnimate.split("").map((letter, index) => (
                    <span
                      key={`last-${index}`}
                      className="letter-drop-in"
                      style={{ animationDelay: `${0.3 + (firstNameToAnimate.length + index) * 0.05}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                  .
                </span>
              </h1>
              <p className={cn(
                  "text-xl md:text-2xl text-primary font-medium min-h-[32px] whitespace-nowrap overflow-hidden pt-2",
                )}>
                {displayedTitle}
                {!isTitleTypingComplete && <span className="animate-pulse-caret"></span>}
              </p>
              <p className="text-md md:text-lg text-muted-foreground leading-relaxed animate-fade-in-up max-w-lg" style={{ animationDelay: '0.4s' }}>
                I craft elegant and efficient solutions to complex problems, turning innovative ideas into reality through clean code and user-centric design.
              </p>
            </div>
          </div>
        </Card>

        <div className="max-w-3xl space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground")}>About Me</h2>
          <div className="space-y-4">
            <p className="text-md md:text-lg text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground hover:scale-[1.015] origin-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              With a passion for full-stack development, I enjoy working on all aspects of a project, from initial concept to final deployment. My goal is to build applications that are not only functional but also provide a delightful user experience.
            </p>
            <p className="text-md md:text-lg text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground hover:scale-[1.015] origin-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming my next big idea.
            </p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="space-y-16 md:space-y-20">
        <header className="text-center space-y-4 animate-fade-in-up">
          <h2 className={cn("text-4xl md:text-5xl font-bold tracking-tight text-foreground")}>
            My Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Explore a selection of projects that demonstrate my passion for creating impactful software and my expertise in modern development practices.
          </p>
        </header>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-10 flex items-center justify-center")}>
            <Wrench className="mr-3 h-8 w-8 text-primary animate-subtle-pulse" />
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto p-4 bg-card/50 rounded-lg shadow-md">
            {toolsAndTechnologies.map((tool, index) => (
              <Badge
                key={tool}
                variant="secondary"
                className="text-sm px-4 py-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:bg-primary/10 hover:text-primary hover:scale-105 animate-fade-in-up rounded-md animate-subtle-lift"
                style={{ animationDelay: `${0.3 + index * 0.03}s` }}
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-12 animate-fade-in-up")} style={{ animationDelay: '0.5s' }}>
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="flex flex-col overflow-hidden shadow-lg transition-all duration-300 ease-in-out rounded-xl bg-card animate-fade-in-up border-border/70 animate-subtle-lift"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="relative w-full h-60 sm:h-72 bg-muted overflow-hidden border-b border-border">
                    <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        width={600}
                        height={400}
                        data-ai-hint={project.image.aiHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                        className="object-cover w-full h-full"
                      />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-2xl font-semibold text-foreground mb-2">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="px-3 py-1 text-xs border-primary/50 text-primary bg-primary/5 rounded-full font-medium">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow">
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-start gap-3 p-6 border-t border-border/50">
                  {project.liveLink && (
                    <Button asChild className="w-full sm:w-auto transition-transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> View Live
                      </Link>
                    </Button>
                  )}
                  {project.repoLink && (
                    <Button variant="outline" asChild className="w-full sm:w-auto transition-transform hover:scale-105 border-primary text-primary hover:bg-primary/10 rounded-md">
                      <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> View Code
                      </Link>
                    </Button>
                  )}
                  {!project.liveLink && !project.repoLink && (
                     <p className="text-sm text-muted-foreground italic">Links coming soon...</p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="socials" className="flex flex-col items-center justify-center py-12 md:py-16 animate-fade-in-up">
        <div className="text-center mb-12">
          <Users className="mx-auto h-20 w-20 text-primary mb-6 animate-subtle-pulse" />
          <h2 className={cn("text-4xl md:text-5xl font-bold tracking-tight text-foreground")}>
            Connect With Me
          </h2>
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
      </section>

      <section id="contact" className="flex flex-col items-center justify-center py-12 md:py-16">
        {state.succeeded ? (
          <Card className="w-full max-w-2xl text-center p-8 md:p-12 shadow-xl bg-card/80 backdrop-blur-sm rounded-xl animate-fade-in-up">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4 animate-subtle-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Thank You!</h2>
              <p className="mt-3 text-lg text-muted-foreground">Your message has been sent successfully. I&apos;ll get back to you soon.</p>
          </Card>
        ) : (
          <Card className="w-full max-w-2xl shadow-xl animate-fade-in-up bg-card/80 backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
            <CardHeader className="text-center p-6 md:p-8">
              <MessageCircle className="mx-auto h-16 w-16 text-primary mb-4 animate-subtle-pulse" />
              <CardTitle className={cn("text-3xl md:text-4xl font-bold tracking-tight text-foreground")}>Let&apos;s Connect</CardTitle>
              <CardDescription className="text-muted-foreground text-lg md:text-xl mt-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                Have a project, a question, or just want to say hello? I&apos;d love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <Input id="name" type="text" name="name" placeholder="e.g. Jane Doe" required className="bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md h-12 text-base" />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-destructive text-sm mt-1" />
                  </div>
                  <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                    <Input id="email" type="email" name="email" placeholder="e.g. you@example.com" required className="bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md h-12 text-base" />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-destructive text-sm mt-1" />
                  </div>
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <Input id="subject" type="text" name="subject" placeholder="e.g. Project Inquiry" required className="bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md h-12 text-base" />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-destructive text-sm mt-1" />
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Your Message</label>
                  <Textarea id="message" name="message" placeholder="Tell me about your project, question, or idea..." required className="resize-none bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md min-h-[150px] text-base" rows={6} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-destructive text-sm mt-1" />
                </div>

                <ValidationError errors={state.errors} className="text-destructive text-sm font-medium" />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 text-lg animate-fade-in-up"
                  style={{animationDelay: '0.6s'}}
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2.5 h-5 w-5" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
