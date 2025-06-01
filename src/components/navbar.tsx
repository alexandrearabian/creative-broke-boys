"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { useTheme } from "next-themes";
import { useTranslations } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navbar");

  // After hydration, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const DesktopNav = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
      className="sticky top-0 left-0 z-50 w-full"
    >
      <NavigationMenu className="glass-morphism hidden max-w-full px-8 py-2 shadow-lg backdrop-blur-xl md:flex md:justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="font-display from-primary via-primary/80 to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Creative Broke Boys
                </div>
              </Link>
            </motion.div>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex h-16 justify-between gap-6">
          <NavigationMenuItem>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <LanguageToggle />
            </motion.div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ModeToggle />
            </motion.div>
          </NavigationMenuItem>
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:text-primary focus:text-primary relative rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:bg-primary/5",
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </motion.div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );

  const MobileNav = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 left-0 z-50 w-full md:hidden"
    >
      {/* Fixed header that doesn't animate */}
      <div className="glass-morphism flex h-16 items-center justify-between px-4 shadow-lg backdrop-blur-xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link href="/">
            <div className="font-display from-primary via-primary/80 to-secondary bg-gradient-to-r bg-clip-text text-xl font-bold tracking-tight text-transparent">
              Creative Broke Boys
            </div>
          </Link>
        </motion.div>
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={(e) => e.stopPropagation()}
          >
            <LanguageToggle />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModeToggle />
          </motion.div>
          <motion.button
            className="hover:bg-primary/10 rounded-lg p-2 transition-colors"
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Menu overlay and content */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="bg-background/40 fixed inset-0 z-40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleSidebar}
              style={{ top: "64px" }}
            />

            <motion.div
              className="glass-morphism elegant-shadow-lg fixed bottom-0 left-1/2 z-50 h-[75vh] w-[92%] max-w-md -translate-x-1/2 overflow-y-auto rounded-t-3xl p-8"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.nav
                className="mt-6 flex flex-col space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="font-display from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                    Navigation
                  </h3>
                </motion.div>

                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "elegant-shadow block rounded-2xl px-6 py-4 text-xl font-medium transition-all duration-300",
                        pathname === item.href
                          ? "text-primary bg-primary/15 shadow-lg"
                          : "text-foreground/80 hover:text-primary hover:bg-primary/10",
                      )}
                      onClick={toggleSidebar}
                    >
                      <span className="font-display">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile theme toggle inside menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="border-border/20 border-t pt-8"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4 text-sm font-medium">
                      Theme
                    </p>
                    <div className="flex justify-center space-x-3">
                      <LanguageToggle />
                      <ModeToggle />
                    </div>
                  </div>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // If you're pre-rendering, don't show the navbar until mounting is complete
  if (!mounted) {
    return null;
  }

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}
