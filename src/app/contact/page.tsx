
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, MessageCircle } from "lucide-react"; 
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, { message: "Name must not exceed 50 characters."}),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }).max(100, { message: "Subject must not exceed 100 characters."}),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(1000, {
    message: "Message must not exceed 1000 characters.",
  }),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const recipientEmail = "bdalmnmmhmwd006@gmail.com";
    console.log("Form submitted, intended for:", recipientEmail, "Data:", values);

    // TODO: Implement actual email sending logic here.
    // This requires a backend service or a third-party email provider (e.g., Formspree, SendGrid API via a Next.js API route).
    // The frontend cannot securely send emails directly.
    
    // Simulate API call / email sending process
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Prepared!",
      description: `Your message is ready. For actual delivery to ${recipientEmail}, backend email integration is required.`,
      variant: "default", 
    });
    form.reset();
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16">
      <Card className="w-full max-w-2xl shadow-xl animate-fade-in-up bg-card/80 backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
        <CardHeader className="text-center p-6 md:p-8">
          <MessageCircle className="mx-auto h-16 w-16 text-primary mb-4 animate-subtle-pulse" />
          <CardTitle className={cn("text-3xl md:text-4xl font-bold tracking-tight text-foreground animate-text-color-change")}>Let&apos;s Connect</CardTitle>
          <CardDescription className="text-muted-foreground text-lg md:text-xl mt-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Have a project, a question, or just want to say hello? I&apos;d love to hear from you!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                      <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Jane Doe" {...field} className="bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                      <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="e.g. you@example.com" {...field} className="bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <FormLabel className="text-foreground font-medium">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Project Inquiry" {...field} className="bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                    <FormLabel className="text-foreground font-medium">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project, question, or idea..."
                        className="resize-none bg-background/70 border-input focus:ring-primary focus:border-primary rounded-md min-h-[150px] text-base"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                size="lg"
                className="w-full transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 text-lg animate-fade-in-up" 
                style={{animationDelay: '0.6s'}}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

