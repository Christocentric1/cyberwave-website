import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { CheckCircle, Calculator, Shield, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [endpoints, setEndpoints] = useState(100);
  
  const pricePerEndpoint = 1;
  const monthlyTotal = endpoints * pricePerEndpoint;
  const annualTotal = monthlyTotal * 12;
  const annualDiscount = annualTotal * 0.15; // 15% discount for annual
  const annualPrice = annualTotal - annualDiscount;

  const features = [
    "24/7 Endpoint Monitoring",
    "Real-Time Threat Detection",
    "Automated Response & Remediation",
    "Advanced Behavioural Analytics",
    "Custom Detection Policies",
    "Threat Hunting & Investigation",
    "MITRE ATT&CK Mapping",
    "Incident Response Support",
    "Regular Security Reports",
    "Dedicated Security Analyst",
  ];

  const additionalServices = [
    {
      title: "Network Security",
      price: "Custom",
      description: "Firewall management, IDS/IPS, and network monitoring",
    },
    {
      title: "Threat Intelligence",
      price: "From £500/mo",
      description: "Actionable threat intelligence and IOC correlation",
    },
    {
      title: "Security Consulting",
      price: "From £150/hr",
      description: "Expert consulting and security posture assessments",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 network-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/50 bg-accent/10">
              <Calculator className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">Simple, Transparent Pricing</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              EDR Pricing: <span className="text-primary">£1 per Endpoint</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Enterprise-grade endpoint detection and response with no hidden fees. 
              Pay only for what you use.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-primary/50 bg-card cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Calculate Your Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Number of Endpoints</label>
                  <Input 
                    type="number" 
                    value={endpoints}
                    onChange={(e) => setEndpoints(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-2xl h-16 text-center border-primary/50"
                    min="1"
                  />
                  <input 
                    type="range" 
                    min="1" 
                    max="1000" 
                    value={endpoints}
                    onChange={(e) => setEndpoints(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg border border-border/50 bg-background space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-4xl font-bold text-primary">
                      £{monthlyTotal.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {endpoints} endpoints × £1/month
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border border-accent/50 bg-accent/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Annual Cost</p>
                      <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                        Save 15%
                      </span>
                    </div>
                    <p className="text-4xl font-bold text-accent">
                      £{annualPrice.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Save £{annualDiscount.toLocaleString()} per year
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Link to="/contact" replace preventScrollReset={true}>
                    <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Included */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything <span className="text-primary">Included</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive EDR protection with no hidden costs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card group hover:border-primary/50 transition-all"
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional <span className="text-accent">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your security posture with complementary solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-border/50 bg-card hover:border-primary/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact"replace preventScrollReset={true}>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Discuss Custom Requirements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ / Notes */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing <span className="text-primary">Notes</span></h2>
            
            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What's an endpoint?</h3>
                  <p className="text-muted-foreground">
                    An endpoint is any device that connects to your network: desktops, laptops, servers, 
                    or mobile devices that require EDR protection.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Minimum commitment</h3>
                  <p className="text-muted-foreground">
                    Minimum 10 endpoints. No long-term contract required for monthly plans. 
                    Annual plans require 12-month commitment with 15% discount.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">What about setup fees?</h3>
                  <p className="text-muted-foreground">
                    No setup fees. We include deployment, configuration, and onboarding in your first month.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can I scale up or down?</h3>
                  <p className="text-muted-foreground">
                    Yes, absolutely. Add or remove endpoints anytime with pro-rated billing.
                  </p>
                </div>
              </CardContent>
            </Card>
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
              Ready to Secure Your Endpoints?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started with transparent, predictable pricing
            </p>
            <Link to="/contact" replace preventScrollReset={true}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                Contact Sales Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
