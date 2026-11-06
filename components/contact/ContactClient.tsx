"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Mail, Linkedin, Github } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { EASE } from "@/lib/motion";

const contactMethods = [
  {
    title: "Email",
    description: "Get in touch directly via email",
    value: "williamarmstrong8@gmail.com",
    cursorQuip: "2-3 days",
    icon: <Mail className="w-8 h-8" strokeWidth={2} />,
    action: "mailto:williamarmstrong8@gmail.com",
    actionLabel: "Send email",
  },
  {
    title: "X",
    description: "Connect with me on X",
    value: "armstrongships",
    cursorQuip: "just follow",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    action: "https://x.com/armstrongships",
    actionLabel: "Follow on X",
  },
  {
    title: "LinkedIn",
    description: "Connect with me professionally",
    value: "linkedin.com/in/william-armstrong8",
    cursorQuip: "few hours",
    icon: <Linkedin className="w-8 h-8" strokeWidth={2} />,
    action: "https://www.linkedin.com/in/william-armstrong8/",
    actionLabel: "View LinkedIn",
  },
  {
    title: "GitHub",
    description: "View my code and projects",
    value: "github.com/williamarmstrong8",
    cursorQuip: "cool projects :)",
    icon: <Github className="w-8 h-8" strokeWidth={2} />,
    action: "https://github.com/williamarmstrong8",
    actionLabel: "View GitHub",
  },
];

export default function ContactClient() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        <PageHeader title="Contact" />

        {/* Contact Methods */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
            delay: shouldReduceMotion ? 0 : 0.4,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                data-cursor-quip={method.cursorQuip}
                className="min-w-0 flex flex-col bg-card border border-border p-6 text-center"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: shouldReduceMotion ? 0 : 0.27,
                    delay: shouldReduceMotion ? 0 : 0.47 + index * 0.067,
                    ease: EASE,
                  },
                }}
                whileHover={shouldReduceMotion ? undefined : {
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 flex items-center justify-center text-primary">
                  {method.icon}
                </div>
                <h2 className="text-xl text-foreground mb-2">
                  {method.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>
                <p className="text-primary font-medium mb-4 text-sm [overflow-wrap:anywhere]">
                  {method.value}
                </p>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <a href={method.action} {...(method.action.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {method.actionLabel}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.33,
              ease: EASE,
              delay: shouldReduceMotion ? 0 : 0.8,
            }}
          >
            <div className="bg-card border border-border p-6 sm:p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start a Project?
              </h2>
              <p className="text-muted-foreground mb-8">
                I&apos;m always excited to work on new challenges and opportunities.
                Whether it&apos;s engineering, design, or entrepreneurship, let&apos;s create something impactful together.
              </p>
              <Button asChild size="lg">
                <Link href="mailto:williamarmstrong8@gmail.com">
                  Send email
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
