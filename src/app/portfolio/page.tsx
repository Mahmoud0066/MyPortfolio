
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: {
    src: string; // Use string for image path
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

export default function PortfolioPage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <header className="text-center space-y-4 animate-fade-in-up">
        <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight text-foreground")}>
          My Portfolio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Explore a selection of projects that demonstrate my passion for creating impactful software and my expertise in modern development practices.
        </p>
      </header>

      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-10 flex items-center justify-center")}>
          <Wrench className="mr-3 h-8 w-8 text-primary animate-subtle-pulse" />
          Skills & Technologies
        </h2>
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
      </section>

      <section>
        <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-12 animate-fade-in-up")} style={{ animationDelay: '0.5s' }}>
          Featured Projects
        </h2>
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
      </section>
    </div>
  );
}
