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
    "EDR: 24/7 endpoint monitoring and response",
    "EDR: Real-time threat detection and containment",
    "Network: Firewall, IDS/IPS and traffic monitoring",
    "Network: Secure VPN and remote access hardening",
    "Cloud: CSPM for AWS, Azure and GCP",
    "Cloud: Identity and access (IAM) security checks",
    "SIEM: Centralised log collection and correlation",
    "SIEM: Use-cases mapped to MITRE ATT&CK",
    "Threat hunting & incident investigation support",
    "Monthly security posture and compliance reports",
  ];

  const additionalServices = [
    {
      title: "EDR Protection",
      price: "From £1/endpoint",
      description:
        "Managed endpoint detection & response with 24/7 monitoring and automated containment.",
    },
    {
      title: "Network Security",
      price: "From £199/mo",
      description:
        "Firewall management, IDS/IPS, network monitoring and vulnerability scanning for your sites.",
    },
    {
      title: "Cloud Security",
      price: "From £99/mo/account",
      description:
        "Cloud configuration hardening, CSPM, identity security and workload visibility across AWS, Azure and GCP.",
    },
    {
      title: "SIEM & Log Monitoring",
      price: "From £299/mo",
      description:
        "Centralised log management, correlation rules, alert triage and managed SIEM for SMEs.",
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
              <span className="text-sm font-medium text-accent">
                Simple, Transparent Security Pricing
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold">
              EDR, Network, Cloud & SIEM{" "}
              <span className="text-primary">Built for SMEs</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Start from <span className="font-semibold">£1 per endpoint</span>{" "}
              for EDR, and scale into managed network, cloud and SIEM services —
              with clear, predictable pricing and no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* EDR Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-primary/50 bg-card cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  EDR Endpoint Pricing Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Number of Endpoints
                  </label>
                  <Input
                    type="number"
                    value={endpoints}
                    onChange={(e) =>
                      setEndpoints(Math.max(1, parseInt(e.target.value) || 1))
                    }
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
                      {endpoints} endpoints × £1/month (EDR)
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border border-accent/50 bg-accent/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Annual Cost
                      </p>
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
                  <Link to="/contact">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                      Talk to us about full-stack security
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
                Included in{" "}
                <span className="text-primary">Managed Security Plans</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                End-to-end coverage across endpoints, network, cloud and SIEM.
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
              Flexible <span className="text-accent">Security Modules</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with EDR and bolt on Network, Cloud or SIEM services as you
              grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="border-border/50 bg-card hover:border-primary/50 transition-all"
              >
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-2xl font-bold text-primary">
                    {service.price}
                  </p>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Discuss a bundled quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ / Notes */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Pricing <span className="text-primary">Notes</span>
            </h2>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What&apos;s an endpoint?</h3>
                  <p className="text-muted-foreground">
                    An endpoint is any device that connects to your network:
                    desktops, laptops, servers or mobile devices that require
                    EDR protection.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    How are Network, Cloud and SIEM priced?
                  </h3>
                  <p className="text-muted-foreground">
                    Network security is typically priced per site or device,
                    cloud security per cloud account and SIEM per log volume and
                    use-cases. We keep pricing simple and will provide a clear,
                    written quote before any onboarding.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Minimum commitment</h3>
                  <p className="text-muted-foreground">
                    Minimum 10 endpoints for managed EDR. No long-term contract
                    is required for monthly plans. Annual plans require a
                    12-month commitment and include a 15% discount.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What about setup fees?</h3>
                  <p className="text-muted-foreground">
                    No hidden setup fees. We include deployment, configuration
                    and onboarding in your first month for EDR, and will confirm
                    any one-off work for network, cloud or SIEM projects in
                    advance.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    Can I start small and scale?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes. Many clients start with EDR only and add Network,
                    Cloud and SIEM over time. You can add or remove endpoints
                    anytime with pro-rated billing.
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
              Ready to Secure Your Environment?
            </h2>
            <p className="text-lg text-muted-foreground">
              Combine EDR, network, cloud and SIEM into one managed security
              partner.
            </p>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                Contact Cyberwave Security
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
