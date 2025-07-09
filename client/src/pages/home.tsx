import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertWaitlistSignupSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Heart, 
  Brain, 
  Users, 
  HandHeart, 
  MessageCircle, 
  Check, 
  X, 
  TrendingUp,
  DollarSign,
  Handshake,
  Rocket,
  Menu,
  Sparkles
} from "lucide-react";

type WaitlistFormData = z.infer<typeof insertWaitlistSignupSchema>;
type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const waitlistForm = useForm<WaitlistFormData>({
    resolver: zodResolver(insertWaitlistSignupSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: (data: WaitlistFormData) => apiRequest("POST", "/api/waitlist", data),
    onSuccess: () => {
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll be in touch soon with updates on your early access.",
      });
      waitlistForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      contactForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const onWaitlistSubmit = (data: WaitlistFormData) => {
    waitlistMutation.mutate(data);
  };

  const onContactSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <Heart className="text-white text-sm" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">CaringIQ</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Features
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection('market')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Market
                </button>
                <button onClick={() => scrollToSection('contact-form')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </button>
                <button onClick={() => scrollToSection('waitlist-form')} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Join Waitlist
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-primary block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                Features
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-primary block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('market')} className="text-gray-600 hover:text-primary block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                Market
              </button>
              <button onClick={() => scrollToSection('contact-form')} className="text-gray-600 hover:text-primary block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                Contact
              </button>
              <button onClick={() => scrollToSection('waitlist-form')} className="bg-primary text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-25 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              You've Been Caring Without Help<br />
              <span className="text-primary">Long Enough</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              <strong>Caring for a parent shouldn't mean losing yourself.</strong><br />
              CaringIQ gives you the clarity, calm, and coordination you've been missing—with a powerful, easy-to-use AI assistant named Cari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => scrollToSection('waitlist-form')}
                className="bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Join the Waitlist
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('features')}
                className="border-2 border-primary text-primary px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Learn More
              </Button>
            </div>
            <div className="mt-16">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
                alt="Family members coordinating care with technology"
                className="rounded-2xl shadow-2xl w-full max-w-5xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support for Supporters Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              💙 Finally, Support for the Supporters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You're not just managing tasks. You're managing people. Emotions. Schedules. Medications. Bills. Conflicts. Crises.
            </p>
            <p className="text-2xl font-semibold text-gray-900 mt-8 max-w-3xl mx-auto">
              CaringIQ gives you the support system you wish existed.
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Built for adult children and family caregivers, CaringIQ connects your care circle, organizes your chaos, and helps you get everything done—without carrying the whole load alone.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Cari Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              👋 Meet Cari — Your Intelligent Care Companion
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Cari is your personal caregiving assistant. She's not just AI. She's <em>always there</em>—ready to help, remind, coordinate, and think for you when you're too tired to think straight.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">You can <strong>talk to Cari</strong> (or type) to ask anything</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">You can assign tasks or reminders to others in your care circle</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">She suggests ideas, catches what you missed, and keeps everyone aligned</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">She tracks meds, appointments, notes, files, and more—so you don't have to</span>
                </li>
              </ul>
            </div>
            <div className="order-first md:order-last">
              <img
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="AI assistant interface on smartphone"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>

          <div className="bg-primary/10 rounded-2xl p-8 border-l-4 border-primary">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "It's like having a second brain. Cari remembers everything, gently reminds everyone, and helps me stay sane."
            </blockquote>
            <cite className="text-primary font-semibold">— Harriet W., Daughter + Care Coordinator</cite>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              💡 What Makes CaringIQ So Powerful
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We go way beyond ChatGPT or any AI assistant you've seen before. 
              Cari is trained for one thing: <strong>caregiving intelligence.</strong>
            </p>
          </div>
          
          <Card className="shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-gray-900">ChatGPT</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold text-primary">CaringIQ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-900">Personalized to your family's care situation</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-6 w-6 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Shared dashboard for the whole care circle</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-6 w-6 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900">Automated reminders, nudges, and role-based tasks</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-6 w-6 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Document uploads + medical/legal/financial organizer</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-6 w-6 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900">Real-time photo, video, and text updates from caregivers</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-6 w-6 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Voice-enabled conversations + emotional support</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-6 w-6 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Care Circle Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              👪 Built for Every Care Circle
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Whether you're the lead caregiver, a sibling, a hired aide, or a friend helping out—CaringIQ supports the <strong>entire care circle.</strong>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Care Coordinator</h3>
                <p className="text-gray-600">Usually an adult child who invites others, assigns roles, and oversees the plan</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Caregivers</h3>
                <p className="text-gray-600">Paid or unpaid caregivers who give updates, upload photos, complete tasks, and stay aligned</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Friends & Family</h3>
                <p className="text-gray-600">Who want to help, but need nudges and clear assignments</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/10 rounded-2xl p-8 border-l-4 border-primary">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "I finally feel like I'm not alone. I use Cari daily, and my sister and mom's aide use it too. It's simple but really smart."
            </blockquote>
            <cite className="text-primary font-semibold">— Karen M., Family Caregiver in Ohio</cite>
          </div>
        </div>
      </section>

      {/* Market Statistics Section */}
      <section id="market" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              📈 A Massive, Growing Need
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Caregiving isn't niche—it's a tidal wave.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">53+</div>
              <div className="text-lg text-gray-600">Million U.S. adults provide unpaid care for loved ones</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">75%</div>
              <div className="text-lg text-gray-600">Say it's emotionally overwhelming</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">$600B</div>
              <div className="text-lg text-gray-600">In unpaid care delivered annually in the U.S.</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">45-65</div>
              <div className="text-lg text-gray-600">Most care coordinators are adult daughters in this age range</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-white text-center">
            <p className="text-xl mb-4">Globally, aging populations are exploding—this need is <em>everywhere</em></p>
            <p className="text-2xl font-bold">
              Yet there is <strong>no single platform</strong> that makes caregiving organized, intelligent, and emotionally supported. Until now.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              🌍 Who CaringIQ Is For
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Brain className="text-primary text-3xl mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Potential Users</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Adult children managing care for aging parents. Get support, stop drowning.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-primary text-3xl mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Investors</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A massive, underserved market with a daily-use product and a data moat.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Handshake className="text-primary text-3xl mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Partners & Channels</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Care.com, AARP, CCRC communities, health systems, home care agencies.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Rocket className="text-primary text-3xl mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Talent & Vendors</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Help us scale. We're building a meaningful, modern caregiving platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ✨ Why CaringIQ Is Different
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Purpose-built</h3>
                <p className="text-gray-600">We aren't a generic LLM wrapper. We're designed <em>only</em> for caregiving.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Emotionally intelligent</h3>
                <p className="text-gray-600">Cari understands tone, urgency, grief, burnout, and care complexity.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-user smart</h3>
                <p className="text-gray-600">Works beautifully across caregivers, siblings, aides, and friends.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Proactive and personalized</h3>
                <p className="text-gray-600">Cari doesn't just respond—she <em>recommends</em>, <em>reminds</em>, and <em>nudges</em>.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Simple to use</h3>
                <p className="text-gray-600">No learning curve. If you can use text or voice, you can use CaringIQ.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist-form" className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              📬 Join the Waitlist Today
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're launching soon—and spots are limited.
            </p>
          </div>
          
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <Form {...waitlistForm}>
                <form onSubmit={waitlistForm.handleSubmit(onWaitlistSubmit)} className="space-y-6">
                  <FormField
                    control={waitlistForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={waitlistForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full bg-primary text-white py-3 px-6 text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {waitlistMutation.isPending ? "Joining..." : "Join the Waitlist"}
                  </Button>
                  <p className="text-sm text-gray-600 text-center">
                    You'll get early access to Cari and help shape the future of caregiving.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              💌 Want to Reach Out?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We'd love to hear from you. Whether you're:
            </p>
            <ul className="text-lg text-gray-600 mt-4 space-y-2">
              <li>• A potential <strong>investor</strong>, <strong>partner</strong>, or <strong>collaborator</strong></li>
              <li>• A caregiver looking to help shape our platform</li>
              <li>• A team member excited to join the mission</li>
            </ul>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Reason for Reaching Out</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Tell us why you're reaching out..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-primary text-white py-3 px-6 text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                  <p className="text-sm text-gray-600 text-center">
                    We'll respond quickly and personally.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            👋 CaringIQ is Here to Help
          </h2>
          <p className="text-xl mb-4 text-blue-100">
            Caregiving shouldn't feel like a second full-time job with no support.
          </p>
          <p className="text-2xl font-bold mb-6">
            CaringIQ gives you your time, clarity, and peace of mind back.
          </p>
          <p className="text-xl mb-8 text-blue-100">
            You've been doing it alone long enough. 
            Let Cari help you carry the load.
          </p>
          <Button
            onClick={() => scrollToSection('waitlist-form')}
            className="bg-white text-primary px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Heart className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold">CaringIQ</span>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2024 CaringIQ. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
