"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, MessageCircle, CheckCircle } from "lucide-react"; 
import { cn } from "@/lib/utils";

export default function ContactPage() {
  // IMPORTANT: Replace "YOUR_FORM_ID" with your actual Formspree form ID
  const [state, handleSubmit] = useForm("xvgdpoop");

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <Card className="w-full max-w-2xl text-center p-8 md:p-12 shadow-xl bg-card/80 backdrop-blur-sm rounded-xl animate-fade-in-up">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4 animate-subtle-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Thank You!</h2>
            <p className="mt-3 text-lg text-muted-foreground">Your message has been sent successfully. I&apos;ll get back to you soon.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16">
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
                  <Send className="mr-2.5 h-5 w-5" /> Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
