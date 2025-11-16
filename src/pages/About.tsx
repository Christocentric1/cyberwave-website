import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Target, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest standards of honesty and transparency in all our security operations.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "We deliver accurate, reliable threat detection with minimal false positives through expert tuning.",
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We stay ahead of emerging threats by continuously adopting cutting-edge security technologies.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work alongside your team as trusted advisors, not just vendors.",
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
            <h1 className="text-4xl md:text-6xl font-bold">
              About <span className="text-primary">Cyberwave Security</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Cyberwave Security Ltd is a non-for-profit organisation dedicated to providing accessible, affordable, and effective cybersecurity support to organisations of all sizes, with a focus on helping those with limited resources strengthen their security and resilience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Empowering organisations with <span className="text-primary font-semibold">proactive defence</span>, 
                complete <span className="text-accent font-semibold">visibility</span>, and rapid 
                <span className="text-primary font-semibold"> threat response</span> capabilities to stay ahead 
                of cyber adversaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-accent">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="border-border/50 bg-card hover:border-primary/50 transition-all group"
                >
                  <CardContent className="p-6 space-y-4 text-center">
                    <div className="relative w-fit mx-auto">
                      <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors" />
                      <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-accent/20 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-primary">Expertise</span>
              </h2>
            </div>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Experienced Analysts</h3>
                  <p className="text-muted-foreground">
                    Our team consists of certified security professionals with deep expertise in endpoint detection, 
                    network security, and threat analysis. We hold certifications including OSCP, GIAC, CEH, and more.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Technology Focus</h3>
                  <p className="text-muted-foreground">
                    We specialize in deploying and managing industry-leading EDR platforms such as CrowdStrike, 
                    SentinelOne, and LimaCharlie, alongside next-generation firewalls and intrusion detection systems.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Framework Alignment</h3>
                  <p className="text-muted-foreground">
                    All our threat intelligence and reporting aligns with industry-standard frameworks including 
                    MITRE ATT&CK, Cyber Essentials, SOC2 and ISO/IEC 27001, ensuring compatibility with your compliance requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Global Support</h3>
                  <p className="text-muted-foreground">
                    As a global cyber security provider, we understand local compliance requirements and offer support during 
                     business hours with on-call emergency response available 24/7.
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
              Ready to Work Together?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss how we can protect your organisation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contact" replace preventScrollReset={true}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                  Contact Us
                </Button>
              </Link>
              <Link to="/pricing" replace preventScrollReset={true}>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
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

export default About;
