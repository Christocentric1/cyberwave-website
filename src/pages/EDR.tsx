import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Eye, 
  Zap, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Activity,
  Lock,
  AlertTriangle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import edrImage from "@/assets/edr-illustration.jpg";

const EDR = () => {
  const features = [
    {
      icon: Eye,
      title: "Real-Time Endpoint Visibility",
      description: "Monitor all endpoints continuously with comprehensive visibility into processes, files, network connections, and user activities.",
    },
    {
      icon: Activity,
      title: "Advanced Behavioural Analytics",
      description: "Detect threats using machine learning and behavioural analysis to identify anomalous activities before they cause damage.",
    },
    {
      icon: Zap,
      title: "Automated Response Actions",
      description: "Automatically isolate infected endpoints, kill malicious processes, and remediate threats without manual intervention.",
    },
    {
      icon: Clock,
      title: "24/7 Threat Monitoring",
      description: "Round-the-clock monitoring and incident triage by our expert security operations team.",
    },
    {
      icon: Lock,
      title: "Custom Detection Policies",
      description: "Tailored threat detection rules and alert tuning specific to your organisation's risk profile and environment.",
    },
    {
      icon: AlertTriangle,
      title: "Threat Hunting & Investigation",
      description: "Proactive threat hunting and detailed forensic investigation capabilities to uncover hidden threats.",
    },
  ];

  const platforms = [
    "CrowdStrike Falcon",
    "SentinelOne",
    "LimaCharlie",
    "Microsoft Defender for Endpoint",
    "Carbon Black",
    "Cortex XDR",
  ];

  const benefits = [
    "Reduce dwell time from months to minutes",
    "Stop ransomware before encryption occurs",
    "Meet compliance requirements (ISO 27001, GDPR, NIS2)",
    "Reduce false positives with expert alert tuning",
    "Get actionable threat intelligence aligned to MITRE ATT&CK",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 network-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Enterprise EDR Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                Endpoint Detection & <span className="text-primary">Response</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Real-time endpoint visibility, advanced behavioural analytics, and automated response actions 
                to stop threats fast. Deploy and manage leading EDR platforms with expert support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pricing">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity cyber-glow">
                    View Pricing - $1/endpoint
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
              <img 
                src={edrImage} 
                alt="EDR Solution Illustration" 
                className="relative rounded-lg shadow-2xl shadow-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive <span className="text-accent">EDR Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to detect, investigate, and respond to endpoint threats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="border-border/50 bg-card hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="relative w-fit">
                      <Icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
                      <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-accent/20 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Leading EDR</span> Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deploy, configure, and manage industry-leading EDR solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="p-6 border border-border/50 rounded-lg bg-card hover:border-primary/50 transition-all text-center group"
              >
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {platform}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our <span className="text-accent">EDR Services</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-all group"
                >
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <p className="text-lg text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="absolute inset-0 network-grid opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Deploy Enterprise EDR?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start protecting your endpoints today with transparent pricing at just $1 per endpoint
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/pricing" replace preventScrollReset={true}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                  View Pricing Note
                </Button>
              </Link>
              <Link to="/contact" replace preventScrollReset={true}>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
                  Contact Sales
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

export default EDR;
