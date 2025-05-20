
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  liveLink?: string;
  repoLink?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "EcoTrack: Carbon Footprint Calculator",
    description: "A web application that helps users calculate and track their carbon footprint. It provides personalized suggestions for reducing environmental impact, leveraging data visualization to motivate sustainable habits.",
    imageUrl: "https://picsum.photos/seed/ecotrack/600/400",
    imageHint: "nature technology",
    liveLink: "#",
    repoLink: "#",
    tags: ["React", "Node.js", "API Integration", "Data Visualization", "UX"],
  },
  {
    id: "2",
    title: "RecipeFinder AI",
    description: "A smart recipe suggestion platform using machine learning to recommend recipes based on available ingredients and dietary preferences. Focused on seamless UX and a robust recommendation engine.",
    imageUrl: "https://picsum.photos/seed/recipeai/600/400",
    imageHint: "food kitchen",
    liveLink: "#",
    repoLink: "#",
    tags: ["Python", "Flask", "Machine Learning", "AI", "REST API"],
  },
  {
    id: "3",
    title: "LocalConnect: Community Event Platform",
    description: "A mobile-first platform connecting local communities by showcasing and promoting nearby events. Built for scalability and performance to encourage real-world interactions.",
    imageUrl: "https://picsum.photos/seed/localconnect/600/400",
    imageHint: "community people",
    tags: ["Next.js", "Firebase", "Geolocation", "Mobile-First", "PWA"],
  },
  {
    id: "4",
    title: "CodeCollaborate: Real-time Editor",
    description: "A web-based collaborative code editor for simultaneous multi-user coding. Implemented complex real-time synchronization and a developer-friendly interface.",
    imageUrl: "https://picsum.photos/seed/codecollab/600/400",
    imageHint: "code editor",
    liveLink: "#",
    tags: ["WebSockets", "React", "Monaco Editor", "Real-time Sync", "Node.js"],
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
        <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight text-foreground animate-text-color-change")}>
          My Portfolio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Explore a selection of projects that demonstrate my passion for creating impactful software and my expertise in modern development practices.
        </p>
      </header>

      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-10 flex items-center justify-center animate-text-color-change")}>
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
        <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-12 animate-fade-in-up animate-text-color-change")} style={{ animationDelay: '0.5s' }}>
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="flex flex-col overflow-hidden shadow-lg transition-all duration-300 ease-in-out rounded-xl bg-card animate-fade-in-up border-border/70 animate-subtle-lift"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="relative w-full h-60 sm:h-72 bg-muted overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={project.imageHint}
                  className="transition-transform duration-500 group-hover:scale-105"
                  priority={index < 2} 
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
