"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const contactMethods = [
  {
    title: "Email",
    description: "Get in touch directly via email",
    value: "williamarmstrong8@gmail.com",
    cursorQuip: "2-3 days",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    action: "mailto:williamarmstrong8@gmail.com",
  },
  {
    title: "X",
    description: "Connect with me on X",
    value: "armstrongwill8",
    cursorQuip: "just follow",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    action: "https://x.com/armstrongwill8",
  },
  {
    title: "LinkedIn",
    description: "Connect with me professionally",
    value: "linkedin.com/in/william-armstrong8",
    cursorQuip: "few hours",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    action: "https://www.linkedin.com/in/william-armstrong8/",
  },
  {
    title: "GitHub",
    description: "View my code and projects",
    value: "github.com/williamarmstrong8",
    cursorQuip: "cool projects :)",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    action: "https://github.com/williamarmstrong8",
  },
];

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 md:px-20 pt-8 pb-16">
        {/* Page Title - same animation as About/Brands */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.07,
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.47,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.13,
            }}
          >
            Contact
          </motion.h1>
        </motion.section>

        {/* Contact Methods */}
        <motion.section
          className="max-w-8xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.4,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                data-cursor-quip={method.cursorQuip}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.27,
                    delay: 0.47 + index * 0.067,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 text-primary">{method.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>
                <p className="text-primary font-medium mb-4 text-sm">
                  {method.value}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={method.action} target="_blank" rel="noopener noreferrer">
                    Connect
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.33,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8,
            }}
          >
            <div className="bg-card border border-border rounded-3xl p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start a Project?
              </h2>
              <p className="text-muted-foreground mb-8">
                I&apos;m always excited to work on new challenges and opportunities.
                Whether it&apos;s engineering, design, or entrepreneurship, let&apos;s create something impactful together.
              </p>
              <Button asChild size="lg">
                <Link href="mailto:williamarmstrong8@gmail.com">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
