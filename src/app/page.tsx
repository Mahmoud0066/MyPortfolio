
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, MessageSquare, UserCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const fullStackTitle = "Full-Stack Software Developer";
const firstNameToAnimate = "Mahmoud";
const lastNameToAnimate = "Abdelmenam";

export default function Home() {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTitleTypingComplete, setIsTitleTypingComplete] = useState(false);
  const titleAnimationFrameRef = useRef<number | null>(null);
  const titleCharIndexRef = useRef<number>(0);
  const currentTitleRef = useRef<string>('');
  const titleLastTimestampRef = useRef<number>(0);

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
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12 md:py-16 animate-fade-in-up">
      <Card className="p-8 md:p-12 rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm w-full max-w-4xl transition-all duration-300 ease-in-out hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.3)] hover:-translate-y-1">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-12">
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl border-4 border-primary flex-shrink-0">
            <Image
              src="https://lh3.googleusercontent.com/pw/AP1GczOFwxGErCEE1mf9cKfuzms0UWcKRUlUJ-cu0z1vegSMk4L1gp7IFv25iOm0Ebxe5AywSmYG70W3BRK68xQ3PvhQnALJ6vUJr8VXEQJSGb77xMvqgk7-vyfMm5Ewzyr32AryuZiv72Q27FTaiJay_9lw=w485-h647-s-no-gm"
              alt="Mahmoud Abdelmenam - Professional Headshot"
              layout="fill"
              objectFit="cover"
              data-ai-hint="personal photo"
              priority={true} 
              sizes="(max-width: 767px) 160px, 224px"
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
        <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground animate-text-color-change")}>About Me</h2>
        <div className="space-y-4">
          <p className="text-md md:text-lg text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground hover:scale-[1.015] origin-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            With a passion for full-stack development, I enjoy working on all aspects of a project, from initial concept to final deployment. My goal is to build applications that are not only functional but also provide a delightful user experience.
          </p>
          <p className="text-md md:text-lg text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground hover:scale-[1.015] origin-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming my next big idea.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <Button asChild size="lg" className="transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3 text-lg">
          <Link href="/portfolio">
            <UserCircle className="mr-2.5 h-6 w-6" />
            View My Work
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] shadow-md border-primary text-primary hover:bg-primary/10 rounded-lg px-8 py-3 text-lg">
          <Link href="/contact">
            <Mail className="mr-2.5 h-6 w-6" />
            Get In Touch
          </Link>
        </Button>
         <Button asChild variant="outline" size="lg" className="transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] shadow-md border-secondary text-secondary-foreground hover:bg-secondary/20 rounded-lg px-8 py-3 text-lg">
          <Link href="/blog">
            <MessageSquare className="mr-2.5 h-6 w-6" />
            Read My Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}

