
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Feather, MessageSquare, Rss, Sparkles } from "lucide-react"; 
import { cn } from "@/lib/utils";

export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center space-y-10 py-12 animate-fade-in-up">
      <div className="relative">
        <Rss className="h-28 w-28 text-primary opacity-70" />
        <Sparkles className="absolute -top-4 -right-4 h-10 w-10 text-accent animate-subtle-pulse" /> {/* Changed animate-pulse to animate-subtle-pulse for a softer effect */}
      </div>
      
      <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight text-foreground animate-text-color-change")}>
        My Digital Notepad
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Welcome to my corner of the internet! This is where I&apos;ll be sharing insights on software development, technology trends, and perhaps a few thoughts on life&apos;s interesting quirks. 
      </p>
      
      <Card className="w-full max-w-lg text-left shadow-xl animate-fade-in-up bg-card/80 backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Feather className="mr-3 h-6 w-6 text-primary animate-subtle-pulse" /> {/* Added pulse to feather icon */}
            Content Brewing...
          </CardTitle>
          <CardDescription className="text-md">
            I&apos;m currently crafting some awesome articles and tutorials. Exciting things are on the horizon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Think of this as a digital workshop – ideas are being hammered out, code is being polished, and stories are taking shape. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <Button asChild size="lg" className="transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] shadow-lg rounded-lg">
          <Link href="/portfolio">View My Portfolio</Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] border-primary text-primary hover:bg-primary/10 shadow-md rounded-lg">
          <Link href="/contact">Let&apos;s Connect</Link>
        </Button>
      </div>
    </div>
  );
}

