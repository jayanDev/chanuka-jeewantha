"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Failed to send message.");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error: unknown) {
      setSubmitStatus("error");
      setErrorText(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      {/* Contact Split Section */}
 <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-4 block">Contact Us</span>
              <h2 className="text-[36px] md:text-[52px] font-bold font-plus-jakarta text-foreground leading-[1.2] mb-6">
                Get Career <span className="text-brand-light">Support</span>
              </h2>
              <p className="text-text-body text-[18px] mb-12 max-w-lg leading-relaxed">
                If you need help with your CV, LinkedIn profile, career direction, or job application strategy, send your details and I will guide you with a practical next step.
              </p>

              <a
                href="https://wa.me/94773902230?text=Hello%20Chanuka%2C%20I%20want%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1fb85a]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Order via WhatsApp
              </a>

              <div className="flex flex-col gap-8 w-full">
                {/* Contact Detail 1 */}
 <div className="bg-white p-6 rounded-[20px] border border-zinc-200 flex items-center gap-6 shadow-sm">
                  <div className="w-[60px] h-[60px] bg-brand-main/10 text-brand-main rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[18px] font-plus-jakarta mb-1 text-foreground">WhatsApp Orders</h3>
                    <p className="text-text-body">+94 77 390 2230</p>
                  </div>
                </div>

                {/* Contact Detail 2 */}
 <div className="bg-white p-6 rounded-[20px] border border-zinc-200 flex items-center gap-6 shadow-sm">
                  <div className="w-[60px] h-[60px] bg-brand-main/10 text-brand-main rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[18px] font-plus-jakarta mb-1 text-foreground">LinkedIn</h3>
                    <p className="text-text-body">linkedin.com/in/chanuka-jeewantha</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Form */}
 <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 rounded-[24px] shadow-lg border border-zinc-100">
              <h3 className="text-[28px] font-bold font-plus-jakarta mb-8 text-foreground">Send a Message</h3>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                {/* aria-live region announces status changes to screen readers */}
                <div aria-live="polite" aria-atomic="true">
                  {submitStatus === "success" && (
                    <div className="bg-brand-main/10 text-brand-dark p-4 rounded-[10px] border border-brand-main/20 flex items-center gap-3" role="status">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      <p className="font-medium">Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-[10px] border border-red-200 flex items-center gap-3" role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      <p className="font-medium">{errorText || "Something went wrong. Please try again later."}</p>
                    </div>
                  )}
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  id="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Your Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      required
                      autoComplete="name"
 className="w-full px-4 py-3 rounded-[10px] bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Your Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                      required
                      autoComplete="email"
 className="w-full px-4 py-3 rounded-[10px] bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Project Inquiry"
                    required
 className="w-full px-4 py-3 rounded-[10px] bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Your Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    required
 className="w-full px-4 py-3 rounded-[10px] bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-[16px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium text-[16px] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
