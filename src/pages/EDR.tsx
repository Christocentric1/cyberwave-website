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
  AlertTriangle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import edrImage from "@/assets/edr-illustration.jpg";

const EDR = () => {
  const features = [
    {
      icon: Eye,
      title: "Real-Time Endpoint Visibility",
      description:
        "Continuous visibility across laptops, servers and remote devices — processes, files, network connections and user activity in one place.",
    },
    {
      icon: Activity,
      title: "Advanced Behavioural Analytics",
      description:
        "Machine learning and behavioural rules to spot ransomware, living-off-the-land attacks and suspicious patterns before they escalate.",
    },
    {
      icon: Zap,
      title: "Automated Response Actions",
      description:
        "One-click or automatic isolation, process killing and remediation playbooks to contain threats in seconds, not hours.",
    },
    {
      icon: Clock,
      title: "24/7 Threat Monitoring",
      description:
        "Around-the-clock monitoring, triage and escalation by our security team — aligned to your business hours and risk appetite.",
    },
    {
      icon: Lock,
      title: "Custom Detection Policies",
      description:
        "Environment-specific tuning, allow/deny rules and use-cases mapped to your workloads, users and compliance requirements.",
    },
    {
      icon: AlertTriangle,
      title: "Threat Hunting & Investigation",
      description:
        "Proactive hunts, timeline reconstruction and forensic detail to uncover stealthy attacks and stop repeat incidents.",
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
    "Reduce attacker dwell time from months to minutes.",
    "Stop ransomware before encryption and data loss.",
    "Support ISO 27001, GDPR and NIS2 readiness.",
    "Reduce alert fatigue with expert tuning and triage.",
    "Align detections to MITRE ATT&CK for clear reporting.",
  ];

  const lifecycle = [
    {
      title: "Prevent & Harden",
      description:
        "Baseline your endpoints, harden configurations and deploy policies that reduce your attack surface from day one.",
    },
    {
      title: "Detect & Respond",
      description:
        "Identify suspicious behaviour in real-time and contain compromised endpoints through automated and guided response.",
    },
    {
      title: "Learn & Improve",
      description:
        "Turn every incident into a lesson with root-cause analysis, playbook updates and reports your leadership can understand.",
    },
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
                <span className="text-sm font-medium text-primary">
                  Managed Endpoint Detection & Response · £1/endpoint
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold">
                Stop Endpoint Threats <span className="text-primary">Fast</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Cyberwave&apos;s managed EDR service gives you real-time endpoint
                visibility, behavioural detection and rapid response — fully
                integrated with your network, cloud and SIEM stack.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pricing">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity cyber-glow"
                  >
                    View EDR Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Request a Demo
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

      {/* EDR Lifecycle / How it Works */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-accent">Cyberwave EDR</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine leading EDR technology with UK-based security experts
              to give you continuous protection and clear outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {lifecycle.map((item, index) => (
              <Card
                key={index}
                className="border-border/50 bg-card hover:border-primary/60 transition-all"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary mb-2">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive <span className="text-accent">EDR Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to detect, investigate and respond to endpoint
              attacks — without building a full internal SOC.
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
                    <div className="relative w-fit mb-2">
                      <Icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors relative z-10" />
                      <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-accent/20 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technology <span className="text-primary">Partners</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with leading EDR platforms and can integrate with your
              existing licences or recommend the right fit for your environment.
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Business Outcomes of{" "}
                <span className="text-accent">Managed EDR</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Clear value for security, compliance and leadership.
              </p>
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
              Ready to Deploy Enterprise-Grade EDR?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with transparent pricing from just £1 per endpoint, and
              scale into full network, cloud and SIEM coverage as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/pricing">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                  View EDR & Security Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 text-lg px-8"
                >
                  Contact the Security Team
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
