import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Network, Brain, CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-security.jpg";

const Index = () => {
  const solutions = [
    {
      icon: Shield,
      title: "Endpoint Detection & Response (EDR)",
      description:
        "Gain real-time visibility across all devices, detect suspicious activity, and automate rapid response.",
      link: "/edr",
    },
    {
      icon: Network,
      title: "Network Security",
      description:
        "Protect your infrastructure with intelligent firewalls, intrusion detection, and 24/7 network monitoring.",
    },
    {
      icon: Brain,
      title: "Threat Intelligence & Consulting",
      description:
        "Stay ahead of emerging threats with actionable intelligence and strategic advisory support.",
    },
  ];

  const benefits = [
    "Proactive Detection: Identify and stop attacks before they spread",
    "EDR Expertise: Advanced endpoint visibility using industry-leading tools",
    "Network Security Excellence: Comprehensive monitoring and prevention",
    "UK-Based Specialists: Professional certified analysts you can trust",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 network-grid opacity-40" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
            <div className="inline-block">
              <div className="relative floating">
                <h1 className="text-6xl md:text-8xl font-black mb-6 gradient-text tracking-tight">
                  Cyberwave Security
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-[100px] opacity-30 pulse-glow" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              Proactive EDR & Network Defence<br />
              <span className="text-primary">for Modern Enterprises</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Intelligent endpoint and network security solutions designed to detect, contain, 
              and neutralise cyber threats in <span className="text-accent font-semibold">real time</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 text-lg px-10 py-7 font-bold cyber-glow shadow-2xl">
                  Get Free Security Assessment
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/edr">
                <Button size="lg" variant="outline" className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg px-10 py-7 font-semibold backdrop-blur-sm glass">
                  View Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-28 bg-gradient-to-b from-black to-card/30 relative">
        <div className="absolute inset-0 network-grid opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">
            Why Choose <span className="gradient-text">Cyberwave Security</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl glass group hover:bg-primary/5 transition-all duration-300 animated-border">
                <CheckCircle className="h-7 w-7 text-accent flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                <p className="text-xl text-foreground font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Our Core <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
              Comprehensive cybersecurity solutions tailored to protect your organisation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card 
                  key={index} 
                  className="border-border/30 bg-card/50 hover:border-primary/60 transition-all duration-500 group hover:shadow-2xl hover:shadow-primary/30 backdrop-blur-sm glass hover:scale-105"
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="relative w-fit">
                      <Icon className="h-16 w-16 text-primary group-hover:text-accent transition-all duration-300" />
                      <div className="absolute inset-0 bg-primary/30 blur-2xl group-hover:bg-accent/40 transition-all duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">{solution.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{solution.description}</p>
                    {solution.link && (
                      <Link to={solution.link}>
                        <Button variant="link" className="text-primary hover:text-accent p-0 h-auto font-semibold text-lg group/link">
                          Learn More <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-accent/15" />
        <div className="absolute inset-0 network-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 glass p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Protect your organisation with<br />
              <span className="gradient-text">proactive EDR and network defence</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Get started with a comprehensive security assessment today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 text-xl px-10 py-7 font-bold cyber-glow">
                  Contact Us
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-xl px-10 py-7 font-semibold glass">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
