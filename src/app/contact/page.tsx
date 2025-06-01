"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Send,
  Clock,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/contexts/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ContactPage() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    // Handle form submission logic here
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Drop us a line anytime",
      contact: "hello@creativebrokeboys.com",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri 9am-6pm EST",
      contact: "+1 (555) 123-4567",
      action: "Call Now",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant responses",
      contact: "Available 24/7",
      action: "Start Chat",
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Location",
      info: "Creative District, Brooklyn NY",
    },
    {
      icon: Clock,
      title: "Hours",
      info: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: Globe,
      title: "Timezone",
      info: "Eastern Standard Time",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: t("form.email"),
      value: t("info.email"),
      href: `mailto:${t("info.email")}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: t("info.phone"),
      href: `tel:${t("info.phone")}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: t("info.address"),
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8 text-center"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 mx-auto px-4 py-2 text-sm font-medium"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💬 Let&apos;s Talk
                </motion.span>
              </Badge>

              <motion.h1
                className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="from-foreground via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  {t("title")}
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            >
              {t("description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 grid gap-8 md:grid-cols-3"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass-morphism elegant-shadow-lg space-y-6 rounded-2xl p-8 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                >
                  <method.icon className="text-primary h-8 w-8" />
                </motion.div>

                <div className="space-y-2">
                  <motion.h3
                    className="font-display text-foreground text-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {method.title}
                  </motion.h3>
                  <p className="text-muted-foreground text-sm">
                    {method.description}
                  </p>
                  <p className="text-primary font-medium">{method.contact}</p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm" className="rounded-full">
                    {method.action}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h2
                  className="font-display text-3xl font-bold tracking-tight md:text-4xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                    {t("form.title")}
                  </span>
                </motion.h2>
                <p className="text-muted-foreground text-lg">
                  {t("form.description")}
                </p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Input
                      name="name"
                      placeholder={t("form.name")}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="elegant-shadow border-primary/20 focus:border-primary rounded-xl"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder={t("form.email")}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="elegant-shadow border-primary/20 focus:border-primary rounded-xl"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Input
                    name="company"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="elegant-shadow border-primary/20 focus:border-primary rounded-xl"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Textarea
                    name="message"
                    placeholder={t("form.message")}
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="elegant-shadow border-primary/20 focus:border-primary resize-none rounded-xl"
                    required
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="elegant-shadow w-full rounded-xl py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        ⏳
                      </motion.div>
                    ) : (
                      <Send className="mr-2 h-5 w-5" />
                    )}
                    {isSubmitting ? "Sending..." : t("form.send")}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h2
                  className="font-display text-3xl font-bold tracking-tight md:text-4xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                    {t("info.title")}
                  </span>
                </motion.h2>
                <p className="text-muted-foreground text-lg">
                  {t("info.description")}
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {officeInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="glass-morphism elegant-shadow flex items-center space-x-4 rounded-xl p-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl"
                    >
                      <info.icon className="text-primary h-6 w-6" />
                    </motion.div>
                    <div>
                      <h4 className="font-display text-foreground font-semibold">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground">{info.info}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-morphism elegant-shadow-lg flex h-64 items-center justify-center rounded-2xl p-8"
              >
                <div className="space-y-3 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                  >
                    <MapPin className="text-primary h-8 w-8" />
                  </motion.div>
                  <h4 className="font-display font-semibold">
                    Interactive Map
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Coming soon - Find us in Brooklyn&apos;s creative hub
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ/CTA Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-morphism elegant-shadow-lg relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
          >
            <motion.div
              className="bg-primary/10 absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.h2
              className="font-display mb-6 text-3xl font-bold md:text-4xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </motion.h2>

            <motion.div
              className="mb-8 space-y-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-2">
                <h4 className="font-display text-foreground font-semibold">
                  How quickly can you start my project?
                </h4>
                <p className="text-muted-foreground">
                  Most projects can begin within 1-2 weeks of initial
                  consultation.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-foreground font-semibold">
                  What&apos;s your typical project timeline?
                </h4>
                <p className="text-muted-foreground">
                  Timelines vary by scope, but most projects range from 4-12
                  weeks.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-foreground font-semibold">
                  Do you work with international clients?
                </h4>
                <p className="text-muted-foreground">
                  Absolutely! We work with clients worldwide across all time
                  zones.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg"
                >
                  Schedule a Call
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
