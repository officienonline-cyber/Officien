import React, { useState } from "react";
import { Mail, Check, Copy, MessageSquare, MapPin, Send, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Web Dev");
  const [budget, setBudget] = useState("Let's discuss");
  const [message, setMessage] = useState("");

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Officien.Online@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = "Your name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!message.trim()) tempErrors.message = "Please tell us a bit about your project.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate client-side API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      // Trigger confetti celebration!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6366F1", "#A78BFA", "#34D399", "#38BDF8"],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit form. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-width-container mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Direct Info & Availabilities (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div>
              <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight mb-4">
                Let&apos;s Build Something Together
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-text-secondary leading-relaxed">
                Tell us about your project. We&apos;ll get back to you within 1 business day.
              </p>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-success/5 border border-success/15 w-fit">
              <span className="w-2.5 h-2.5 bg-success rounded-full animate-ping" />
              <span className="text-[12px] font-semibold text-success font-sans">
                Available for new projects in July 2026
              </span>
            </div>

            {/* Direct Lines */}
            <div className="flex flex-col gap-6">
              <h4 className="font-space text-xs font-bold uppercase tracking-wider text-text-muted">
                Direct Lines
              </h4>

              {/* Email with copy action */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface/50 border border-white/[0.04] flex items-center justify-center text-text-secondary">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-sans text-text-muted">Email</span>
                  <div className="flex items-center gap-2">
                    <a href="mailto:Officien.Online@gmail.com" className="font-sans text-[15px] font-semibold text-text-primary hover:text-accent transition-colors">
                      Officien.Online@gmail.com
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                    </button>
                    {copied && <span className="text-[10px] text-success font-semibold">Copied!</span>}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface/50 border border-white/[0.04] flex items-center justify-center text-text-secondary">
                  <MessageSquare size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-sans text-text-muted">WhatsApp</span>
                  <a
                    href="https://wa.me/916359440360?text=Hi%20OfficienHub,%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] font-semibold text-text-primary hover:text-accent transition-colors"
                  >
                    +91 63594 40360
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface/50 border border-white/[0.04] flex items-center justify-center text-text-secondary">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-sans text-text-muted">Based In</span>
                  <span className="font-sans text-[15px] font-semibold text-text-primary">
                    om nagar chowk, rajkot- 360004
                  </span>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 w-full">
            <GlassCard className="p-8 border-white/[0.05] bg-surface/30" hover={false}>
              {isSuccess ? (
                /* Success State */
                <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success mb-2">
                    <Check size={32} />
                  </div>
                  <h3 className="font-space text-2xl font-bold text-text-primary">
                    Message Received!
                  </h3>
                  <p className="font-sans text-[15px] text-text-secondary max-w-[320px]">
                    ✓ Thank you for reaching out. We&apos;ll review your project requirements and reply within 24 hours.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => {
                    setIsSuccess(false);
                    setName("");
                    setEmail("");
                    setCompany("");
                    setMessage("");
                  }}>
                    Send another message
                  </Button>
                </div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-bg/50 border ${errors.name ? "border-red-500" : "border-white/[0.06] focus:border-accent"
                          } outline-none text-text-primary text-[14px] font-sans transition-colors`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-[11px] text-red-500 font-medium">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-bg/50 border ${errors.email ? "border-red-500" : "border-white/[0.06] focus:border-accent"
                          } outline-none text-text-primary text-[14px] font-sans transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-[11px] text-red-500 font-medium">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-company" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Company / Project Name
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-bg/50 border border-white/[0.06] focus:border-accent outline-none text-text-primary text-[14px] font-sans transition-colors"
                        placeholder="Acme Corp (Optional)"
                      />
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-service" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Service Interested In
                      </label>
                      <select
                        id="form-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-bg/50 border border-white/[0.06] focus:border-accent outline-none text-text-primary text-[14px] font-sans transition-colors cursor-pointer"
                      >
                        <option value="Web Dev">Web Dev</option>
                        <option value="UI/UX">UI/UX Design</option>
                        <option value="AI">AI Integration</option>
                        <option value="SEO">SEO & Growth</option>
                        <option value="Branding">Branding</option>
                        <option value="Automation">Automation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-budget" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Project Budget
                    </label>
                    <select
                      id="form-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-bg/50 border border-white/[0.06] focus:border-accent outline-none text-text-primary text-[14px] font-sans transition-colors cursor-pointer"
                    >
                      <option value="Under ₹1L">Under ₹1L</option>
                      <option value="₹1L–5L">₹1L–5L</option>
                      <option value="₹5L–20L">₹5L–20L</option>
                      <option value="₹20L+">₹20L+</option>
                      <option value="Let's discuss">Let&apos;s discuss</option>
                    </select>
                  </div>

                  {/* Textarea Description */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Tell us about your project <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-2.5 rounded-lg bg-bg/50 border ${errors.message ? "border-red-500" : "border-white/[0.06] focus:border-accent"
                        } outline-none text-text-primary text-[14px] font-sans transition-colors resize-none`}
                      placeholder="Brief description, goals, timeline…"
                    />
                    {errors.message && <span className="text-[11px] text-red-500 font-medium">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>

                </form>
              )}
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
