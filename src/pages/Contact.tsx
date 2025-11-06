import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 network-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to enhance your security posture? Let's discuss your requirements
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-card hover:border-primary/50 transition-all">
                <CardContent className="p-6 space-y-3">
                  <div className="relative w-fit">
                    <Mail className="h-8 w-8 text-primary" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl" />
                  </div>
                  <h3 className="font-semibold">Email Us</h3>
                  <a 
                    href="mailto:info@cyberwavesecurity.co.uk" 
                    className="text-muted-foreground hover:text-primary transition-colors block"
                  >
                    info@cyberwavesecurity.co.uk
                  </a>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-accent/50 transition-all">
                <CardContent className="p-6 space-y-3">
                  <div className="relative w-fit">
                    <Phone className="h-8 w-8 text-accent" />
                    <div className="absolute inset-0 bg-accent/20 blur-xl" />
                  </div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">+44 (0) 7307101571</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm GMT</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/50 transition-all">
                <CardContent className="p-6 space-y-3">
                  <div className="relative w-fit">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl" />
                  </div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">United Kingdom</p>
                  <p className="text-sm text-muted-foreground">Serving clients nationwide</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-primary/50 bg-card cyber-glow">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                      <p className="text-muted-foreground">
                        Fill out the form below and we'll get back to you within 24 hours
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-border/50"
                          placeholder=""
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-border/50"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-border/50"
                        placeholder=""
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="border-border/50 min-h-[150px]"
                        placeholder=""
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
