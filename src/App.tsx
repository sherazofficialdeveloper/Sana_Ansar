/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Menu, X, Moon, Sun, ArrowRight, 
  ChevronDown, ChevronUp, ExternalLink,
  Target, Zap, Lightbulb, TrendingUp,
  Globe, Layout, Search, PenTool,
  Mail, Phone, MapPin, Instagram, Twitter, Linkedin,
  Compass, Palette, Code, Rocket, BarChart3, Star, Quote
} from 'lucide-react';

// --- Components ---

const SplitText = ({ children, className = "", delay = 0, as: Tag = "h2" }: { children: React.ReactNode, className?: string, delay?: number, as?: any }) => {
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const renderContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === 'string') {
      const words = content.split(' ');
      return words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, j) => (
              <motion.span key={j} variants={item} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ));
    }
    if (Array.isArray(content)) {
      return content.map((c, i) => <React.Fragment key={i}>{renderContent(c)}</React.Fragment>);
    }
    if (React.isValidElement(content)) {
      if (content.type === 'br') return <br key={Math.random()} />;
      return React.cloneElement(content as React.ReactElement, {
        children: renderContent((content.props as any).children)
      });
    }
    return content;
  };

  const MotionTag = (motion as any)[Tag] || motion.h2;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.015,
            delayChildren: delay,
          }
        }
      }}
      className={className}
    >
      {renderContent(children)}
    </MotionTag>
  );
};

const WHATSAPP_NUMBER = "+92 344 5284628";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-yellow pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 232, 120, 0.2)' : 'transparent'
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const Counter = ({ value, duration = 2, suffix = "" }: { value: string, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''));

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      onViewportEnter={() => {
        let start = 0;
        const end = target;
        if (start === end) {
          setCount(end);
          return;
        }
        
        const totalMiliseconds = duration * 1000;
        const incrementTime = Math.max(totalMiliseconds / end, 16); // Max 60fps
        
        const timer = setInterval(() => {
          start += Math.ceil(target / (totalMiliseconds / 16));
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
      }}
    >
      {count}{suffix}
    </motion.span>
  );
};

// --- Animation Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const reveal = {
  initial: { y: "100%" },
  animate: { y: 0 },
  transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
};

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const textColor = scrolled || isDark ? 'text-white' : 'text-brand-dark';
  const logoColor = scrolled || isDark ? 'text-white' : 'text-brand-dark';
  const navBg = scrolled ? 'bg-brand-dark/95 dark:bg-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-display font-bold ${logoColor} tracking-tighter transition-colors duration-300`}>
          <span className="text-brand-yellow">Sana</span>Ansar
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              whileHover={{ scale: 1.1, y: -2 }}
              className={`text-xs font-bold ${textColor} hover:text-brand-yellow transition-colors uppercase tracking-[0.2em]`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button 
            onClick={toggleTheme}
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-transform border ${scrolled || isDark ? 'bg-white/10 text-white border-white/20' : 'bg-brand-dark/5 text-brand-dark border-brand-dark/20'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: "#f3c742", color: "#5a001e", boxShadow: "0 10px 15px -3px rgba(243, 199, 66, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 border rounded-full text-xs font-bold transition-all uppercase tracking-widest ${scrolled || isDark ? 'border-white text-white' : 'border-brand-dark text-brand-dark'}`}
          >
            Let's Talk
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2 rounded-full border transition-colors ${scrolled || isDark ? 'bg-white/10 text-white border-white/20' : 'bg-brand-dark/5 text-brand-dark border-brand-dark/20'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textColor}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-brand-dark dark:bg-black border-t border-white/10 p-6 md:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-display font-bold text-white/90 hover:text-brand-yellow transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <motion.a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-brand-yellow text-brand-dark rounded-full text-center font-bold shadow-lg uppercase tracking-widest text-sm"
              >
                Contact Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      {/* Background Image with Overlay and Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
          alt="Modern Professional Workspace" 
          className="w-full h-full object-cover opacity-90 dark:opacity-20 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/90 via-brand-bg/40 to-brand-bg/40 dark:from-brand-bg-dark/95 dark:via-brand-bg-dark/60 dark:to-brand-bg-dark/95" />
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </motion.div>

      {/* Floating Tags */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.5 },
          x: { duration: 0.8, delay: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-32 left-[12%] px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl text-brand-dark dark:text-white rounded-full text-xs font-bold hidden lg:flex items-center gap-2 shadow-2xl border border-white/20"
      >
        <span className="w-2 h-2 bg-brand-pink rounded-full animate-pulse"></span>
        Strategic
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.7 },
          x: { duration: 0.8, delay: 0.7 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        className="absolute top-56 left-[8%] px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl text-brand-dark dark:text-white rounded-full text-xs font-bold hidden lg:flex items-center gap-2 shadow-2xl border border-white/20"
      >
        <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
        Creative
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.9 },
          x: { duration: 0.8, delay: 0.9 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
        className="absolute top-32 right-[12%] px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl text-brand-dark dark:text-white rounded-full text-xs font-bold hidden lg:flex items-center gap-2 shadow-2xl border border-white/20"
      >
        <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></span>
        Results Driven
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 0.8, delay: 1.1 },
          x: { duration: 0.8, delay: 1.1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
        }}
        className="absolute top-64 right-[8%] px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl text-brand-dark dark:text-white rounded-full text-xs font-bold hidden lg:flex items-center gap-2 shadow-2xl border border-white/20"
      >
        <span className="w-2 h-2 bg-brand-pink rounded-full animate-pulse"></span>
        Growth Focused
      </motion.div>

      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-pink/10 dark:bg-brand-pink/20 border border-brand-pink/20 text-brand-pink text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            Available for new projects
          </motion.div>
          <SplitText 
            as="h1"
            className="text-[48px] sm:text-[64px] md:text-[140px] font-display font-black mb-4 leading-[0.9] bg-gradient-to-br from-brand-dark via-brand-accent to-brand-yellow dark:from-white dark:via-brand-yellow dark:to-brand-pink bg-clip-text text-transparent tracking-tighter"
          >
            Sana Ansar
          </SplitText>
          <SplitText 
            as="div"
            delay={0.5}
            className="text-xl sm:text-2xl md:text-[32px] font-display font-medium text-brand-dark dark:text-white/90 mb-8 tracking-tight"
          >
            Digital Growth Strategist
          </SplitText>
          <SplitText 
            as="h2"
            delay={0.8}
            className="text-lg sm:text-xl md:text-[24px] font-light text-brand-dark/70 dark:text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Helping Brands Grow with <span className="text-brand-accent font-medium italic serif-italic">Strategy</span>, <span className="text-brand-pink font-medium italic serif-italic">Creativity</span> & <span className="text-brand-yellow font-medium italic serif-italic">Performance Marketing</span>
          </SplitText>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 40px rgba(222, 26, 88, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 bg-brand-accent text-white font-bold rounded-full transition-all uppercase tracking-widest text-xs"
            >
              Start a Project
            </motion.a>
            <motion.a 
              href="#portfolio"
              whileHover={{ scale: 1.05, y: -4, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 border-2 border-brand-dark/10 dark:border-white/10 text-brand-dark dark:text-white font-bold rounded-full transition-all uppercase tracking-widest text-xs"
            >
              View Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-dark/40 dark:text-white/40 font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent"
        />
      </motion.div>

      {/* Marquee Bar */}
      <div className="w-full bg-brand-dark dark:bg-black py-8 overflow-hidden relative z-10 border-y border-white/5">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-24 items-center w-max"
        >
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <motion.span 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                className="text-white/90 text-2xl font-display font-bold flex items-center gap-4 uppercase tracking-tighter"
              >
                <Star size={20} className="text-brand-yellow fill-brand-yellow" />
                Client-Focused
              </motion.span>
              <motion.span 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="text-white/90 text-2xl font-display font-bold flex items-center gap-4 uppercase tracking-tighter"
              >
                <Star size={20} className="text-brand-pink fill-brand-pink" />
                Creative Thinker
              </motion.span>
              <motion.span 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="text-white/90 text-2xl font-display font-bold flex items-center gap-4 uppercase tracking-tighter"
              >
                <Star size={20} className="text-brand-accent fill-brand-accent" />
                Effective Communicator
              </motion.span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#fdf6f0] to-[#f2e9e1] dark:from-white/5 dark:to-white/10 rounded-[64px] p-8 md:p-20 border border-brand-dark/10 dark:border-white/10 overflow-hidden relative shadow-2xl transition-all duration-500">
          {/* Decorative background element */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-left relative z-10"
          >
            <span className="px-6 py-2 bg-brand-pink/5 dark:bg-brand-pink/10 text-brand-pink text-[10px] font-bold rounded-full mb-8 inline-block border border-brand-pink/20 uppercase tracking-[0.3em]">
              <TrendingUp size={14} className="inline mr-2" /> Strategic • Creative • Growth Focused
            </span>
            <SplitText className="text-4xl md:text-[64px] font-display font-bold text-brand-dark dark:text-white mb-8 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-brand-pink to-brand-accent bg-clip-text text-transparent">Sana Ansar</span><br />
              Digital Growth <span className="italic serif-italic">Strategist</span>
            </SplitText>
            <p className="text-lg md:text-[24px] text-brand-dark/70 dark:text-white/70 max-w-3xl mb-16 leading-relaxed border-l-4 border-brand-pink pl-8 font-light">
              Helping brands grow with strategy, creativity & performance marketing — from bold identity to data-driven campaigns.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: <Palette size={24} />, title: 'Brand Presence', desc: 'Strategic branding and design that creates lasting audience connections.', delay: 0.1 },
                { icon: <Rocket size={24} />, title: 'Smart Campaigns', desc: 'Performance marketing across Meta, TikTok & LinkedIn for maximum ROI.', delay: 0.2 },
                { icon: <Lightbulb size={24} />, title: 'Growth Strategy', desc: 'Combining SEO, analytics, and trends to deliver real business results.', delay: 0.3 }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: item.delay }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-10 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[40px] border border-brand-pink/10 dark:border-white/10 transition-all duration-500 shadow-sm hover:shadow-2xl group"
                >
                  <motion.div 
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-brand-pink text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-display font-bold bg-gradient-to-r from-brand-pink to-brand-accent bg-clip-text text-transparent mb-4">{item.title}</h3>
                  <p className="text-sm text-brand-dark/60 dark:text-white/50 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-10 bg-white dark:bg-white/5 p-10 rounded-[48px] mb-16 border border-brand-pink/10 dark:border-white/10 shadow-inner">
              <div className="border-l-4 border-brand-pink pl-6">
                <h4 className="text-3xl font-display font-bold text-brand-pink">Sana Ansar</h4>
                <p className="text-sm text-brand-dark/60 dark:text-white/50 font-bold uppercase tracking-widest">Digital Branding Specialist</p>
              </div>
              <div className="flex gap-3">
                <span className="px-5 py-2 bg-brand-bg dark:bg-white/10 rounded-full text-[10px] font-bold text-brand-pink border border-brand-pink/10 uppercase tracking-widest">4+ Years Exp</span>
                <span className="px-5 py-2 bg-brand-bg dark:bg-white/10 rounded-full text-[10px] font-bold text-brand-pink border border-brand-pink/10 uppercase tracking-widest">SEO + Ads Expert</span>
              </div>
              <p className="flex-1 text-brand-dark/70 dark:text-white/70 text-base leading-relaxed font-light italic serif-italic">
                "Hi, I’m Sana Ansar — I help startups and businesses scale through data-driven strategies and creative design. My focus is on delivering growth that lasts."
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 bg-brand-pink/5 dark:bg-white/5 p-8 rounded-full mb-16 border border-brand-pink/10 dark:border-white/10">
              {[
                { icon: <Instagram size={16} className="text-[#E4405F]" />, label: 'Meta Ads' },
                { icon: <Code size={16} className="text-[#21759b]" />, label: 'WordPress' },
                { icon: <Search size={16} className="text-[#0d9488]" />, label: 'SEO' },
                { icon: <Zap size={16} className="text-brand-yellow" />, label: 'TikTok' },
                { icon: <BarChart3 size={16} className="text-brand-pink" />, label: 'Analytics' }
              ].map((skill, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-8 py-3 bg-white dark:bg-white/10 rounded-full text-xs font-bold flex items-center gap-3 text-brand-dark dark:text-white shadow-sm border border-brand-dark/5 dark:border-white/5 transition-all"
                >
                  {skill.icon} {skill.label}
                </motion.div>
              ))}
            </div>

            <motion.a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05, 
                x: 10,
                boxShadow: "0 20px 40px rgba(222, 26, 88, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-brand-pink to-brand-accent text-white font-bold rounded-full shadow-2xl transition-all uppercase tracking-[0.2em] text-xs"
            >
              Work With Me <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StrategyAndStats = () => {
  return (
    <section className="py-16 px-6 bg-[#F8F7F4] dark:bg-brand-bg-dark text-center relative overflow-hidden transition-colors duration-500">
      {/* Background Image with Parallax */}
      <motion.div 
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
      >
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920" 
          alt="Data Background" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative Shapes and Patterns */}
      <div className="absolute w-[300px] h-[300px] bg-brand-pink/20 dark:bg-brand-pink/10 rounded-full top-[-10%] left-[-5%] blur-3xl" />
      <div className="absolute w-[250px] h-[250px] bg-brand-accent/10 dark:bg-brand-accent/5 rounded-full bottom-[-5%] right-[-5%] blur-3xl" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SplitText className="text-3xl sm:text-4xl md:text-[64px] font-display font-bold text-brand-dark dark:text-white mb-12 leading-tight tracking-tight">
          We Built the <span className="serif-italic bg-gradient-to-r from-brand-pink to-brand-accent bg-clip-text text-transparent">Strategy</span>,<br />
          You Scale the <span className="italic text-brand-yellow">Growth</span>
        </SplitText>

        <div className="w-full overflow-hidden py-10">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 w-max"
          >
            {[
              { text: 'SEO Strategy', color: 'bg-white dark:bg-white/5' },
              { text: 'Meta Ads', color: 'bg-brand-pink/10 dark:bg-brand-pink/20' },
              { text: 'Conversion Funnels', color: 'bg-white dark:bg-white/5' },
              { text: 'WordPress Development', color: 'bg-brand-accent/5 dark:bg-brand-accent/10' },
              { text: 'Brand Positioning', color: 'bg-white dark:bg-white/5' },
              { text: 'Technical SEO', color: 'bg-brand-yellow/10 dark:bg-brand-yellow/20' },
              { text: 'Content Marketing', color: 'bg-white dark:bg-white/5' },
              { text: 'Lead Generation', color: 'bg-white dark:bg-white/5' },
              { text: 'SEO Strategy', color: 'bg-white dark:bg-white/5' },
              { text: 'Meta Ads', color: 'bg-brand-pink/10 dark:bg-brand-pink/20' },
              { text: 'Conversion Funnels', color: 'bg-white dark:bg-white/5' },
              { text: 'WordPress Development', color: 'bg-brand-accent/5 dark:bg-brand-accent/10' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                animate={{ y: [0, -25, 0] }}
                transition={{ 
                  duration: 4 + (i % 4) * 0.8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
                whileHover={{ scale: 1.05, y: -30 }}
                className={`min-w-[180px] h-[70px] rounded-2xl flex items-center justify-center px-10 font-bold text-sm shadow-sm border border-brand-dark/5 dark:border-white/5 ${item.color} text-brand-dark dark:text-white transition-all cursor-default`}
              >
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mt-20 max-w-5xl mx-auto bg-brand-dark dark:bg-black/40 rounded-[64px] p-12 md:p-20 flex flex-wrap justify-around gap-12 relative shadow-2xl overflow-hidden border border-white/5"
        >
          {/* Background glow for stats */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/20 to-transparent pointer-events-none" />
          
          <div className="absolute -top-4 left-10 bg-brand-yellow px-8 py-2 rounded-full text-xs font-black -rotate-6 shadow-lg text-brand-dark uppercase tracking-widest">Proven Results</div>
          
          <motion.div whileHover={{ scale: 1.1, y: -5 }} className="flex-1 min-w-[150px] cursor-default relative z-10">
            <span className="text-5xl md:text-[64px] font-display font-bold text-white block mb-3 tracking-tighter">
              <Counter value="30" suffix="+" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Campaigns</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, y: -5 }} className="flex-1 min-w-[150px] cursor-default relative z-10">
            <span className="text-5xl md:text-[64px] font-display font-bold text-brand-yellow block mb-3 tracking-tighter">
              <Counter value="4" suffix="X" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Avg ROAS</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, y: -5 }} className="flex-1 min-w-[150px] cursor-default relative z-10">
            <span className="text-5xl md:text-[64px] font-display font-bold text-white block mb-3 tracking-tighter">
              <Counter value="20" suffix="+" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Sites Done</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, y: -5 }} className="flex-1 min-w-[150px] cursor-default relative z-10">
            <span className="text-5xl md:text-[64px] font-display font-bold text-brand-accent block mb-3 tracking-tighter">
              <Counter value="99" suffix="%" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Satisfaction</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      id: '01',
      title: 'DIGITAL BRANDING & WEBSITE MANAGEMENT',
      period: '2020 – Present',
      desc: '4+ years enhancing brand identity and website functionality, specializing in WordPress customization and UX for startups and growing businesses.',
      tags: ['WordPress', 'UI/UX', 'Branding', '4+ years'],
      icon: <Layout size={32} />,
      gradient: 'from-[#4158D0] to-[#C850C0]',
      hoverColor: '#4158D0', // ✅ Solid color for hover
      border: 'border-t-[6px] border-[#4158D0]'
    },
    {
      id: '02',
      title: 'SOCIAL MEDIA & AD CAMPAIGNS',
      period: '2021 – Present',
      desc: 'Led content, community, and ad campaigns across Facebook, Instagram, TikTok, and LinkedIn, driving engagement and conversions.',
      tags: ['Meta Ads', 'TikTok', 'LinkedIn', '30+ campaigns'],
      icon: <TrendingUp size={32} />,
      gradient: 'from-[#f093fb] to-[#f5576c]',
      hoverColor: '#f5576c', // ✅ Solid color
      border: 'border-t-[6px] border-[#f5576c]'
    },
    {
      id: '03',
      title: 'SEO & DATA-DRIVEN MARKETING',
      period: '2020 – Present',
      desc: 'Deep expertise in SEO and data‑driven strategies to maximize online visibility, performance, and sustainable growth.',
      tags: ['SEO', 'Analytics', 'Data Strategy', '4x ROAS'],
      icon: <BarChart3 size={32} />,
      gradient: 'from-[#4facfe] to-[#00f2fe]',
      hoverColor: '#4facfe', // ✅ Solid color
      border: 'border-t-[6px] border-[#4facfe]'
    }
  ];

  return (
    <section id="experience" className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-3xl sm:text-4xl md:text-[64px] font-display font-normal text-brand-dark dark:text-white mb-4">
            Working <span className="serif-italic bg-gradient-to-br from-[#3B001B] to-[#a5516b] dark:from-brand-pink dark:to-brand-yellow bg-clip-text text-transparent">Experience</span>
          </SplitText>
          <div className="inline-block px-8 py-2 bg-brand-dark/5 dark:bg-white/5 rounded-full text-lg text-brand-dark/80 dark:text-white/60 font-light border border-brand-dark/10 dark:border-white/10 backdrop-blur-sm">
            A Proven Track Record in Web, Marketing, and Growth Strategy
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -15 }}
              className={`bg-white dark:bg-white/5 rounded-[48px] p-8 md:p-10 border border-brand-dark/10 dark:border-white/10 flex flex-col relative overflow-hidden transition-all duration-500 group hover:shadow-2xl hover:shadow-brand-dark/5`}
              style={{ '--hover-color': exp.hoverColor }} // ✅ CSS variable for hover color
            >
              {/* Top rounded line */}
              <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${exp.gradient} rounded-t-[48px]`} />
              
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-white bg-gradient-to-br ${exp.gradient} shadow-lg transition-all duration-500`}
                >
                  {exp.icon}
                </motion.div>
                <span className="text-[44px] font-display font-bold opacity-20 text-brand-dark dark:text-white group-hover:opacity-40 transition-opacity duration-500">{exp.id}</span>
              </div>
              
              {/* Period badge */}
              <div className="inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-widest mb-4 bg-brand-dark/5 dark:bg-white/10 text-brand-dark/60 dark:text-white/40 group-hover:bg-brand-dark/10 transition-colors duration-500 uppercase">
                {exp.period}
              </div>
              
              {/* FIXED: Title with solid color on hover (not gradient) */}
              <h3 
                className="text-2xl font-display font-bold text-brand-dark dark:text-white mb-4 leading-tight transition-all duration-500 group-hover:text-[var(--hover-color)]"
              >
                {exp.title}
              </h3>
              
              {/* FIXED: Description darker on hover */}
              <p className="text-brand-dark/70 dark:text-white/60 font-light leading-relaxed mb-8 flex-1 group-hover:text-brand-dark dark:group-hover:text-white/90 transition-colors duration-500">
                {exp.desc}
              </p>
              
              {/* FIXED: Tags with solid background on hover */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-4 py-1 bg-white dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 rounded-full text-[11px] font-medium text-brand-dark/60 dark:text-white/40 transition-all duration-500 group-hover:bg-[var(--hover-color)] group-hover:text-white group-hover:border-transparent group-hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const skills = [
    { 
      title: 'DIGITAL MARKETING STRATEGY', 
      desc: 'Strategic planning and execution of high‑performing digital campaigns, specializing in Meta, Instagram, and Google Ads. Strong expertise in audience targeting, retargeting strategies, performance tracking, and continuous optimization to maximize ROI and drive measurable business growth.',
      icon: <BarChart3 size={28} />,
      gradient: 'from-[#4158D0] to-[#C850C0]',
      tags: ['Meta Ads', 'Instagram Ads', 'Google Ads', 'Audience Targeting', 'Retargeting', 'Performance Tracking', 'ROI Optimization']
    },
    { 
      title: 'SOCIAL MEDIA MANAGEMENT', 
      desc: 'Professional content creation, scheduling, and community engagement across multiple platforms. Focused on maintaining brand voice consistency, visual identity, and using analytics insights to improve engagement, reach, and audience growth.',
      icon: <Instagram size={28} />,
      gradient: 'from-[#f093fb] to-[#f5576c]',
      tags: ['Content Creation', 'Scheduling', 'Community Engagement', 'Brand Voice', 'Visual Identity', 'Analytics', 'Audience Growth']
    },
    { 
      title: 'WORDPRESS WEBSITE MANAGEMENT', 
      desc: 'Comprehensive WordPress customization including theme and plugin management, UI/UX improvements, and performance optimization. Experienced in building fast, responsive, and conversion-focused websites tailored to business goals.',
      icon: <Code size={28} />,
      gradient: 'from-[#4facfe] to-[#00f2fe]',
      tags: ['WordPress', 'Theme Customization', 'Plugin Management', 'UI/UX', 'Performance Optimization', 'Responsive Design', 'Conversion Focused']
    },
    { 
      title: 'SEARCH ENGINE OPTIMIZATION (SEO)', 
      desc: 'Strategic planning and execution of high‑performing digital campaigns, specializing in Meta, Instagram, and Google Ads. Strong expertise in audience targeting, retargeting strategies, performance tracking, and continuous optimization to maximize ROI and drive measurable business growth.',
      icon: <Search size={28} />,
      gradient: 'from-[#4158D0] to-[#C850C0]',
      tags: ['SEO Strategy', 'Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building', 'Analytics', 'Performance Tracking']
    },
    { 
      title: 'CONTENT & ANALYTICS', 
      desc: 'Expertise in ad copywriting, social media content planning, and visual strategy. Proficient in Google Analytics reporting and interpreting data to support informed, results-driven marketing decisions.',
      icon: <TrendingUp size={28} />,
      gradient: 'from-[#f093fb] to-[#f5576c]',
      tags: ['Copywriting', 'Content Planning', 'Visual Strategy', 'Google Analytics', 'Data Interpretation', 'Reporting', 'Data-Driven Decisions']
    },
    { 
      title: 'PROFESSIONAL STRENGTHS', 
      desc: 'A strategic thinker with strong attention to detail, excellent communication skills, and a growth mindset. Committed to continuous learning, collaboration, and delivering high-quality digital solutions.',
      icon: <Star size={28} />,
      gradient: 'from-[#4facfe] to-[#00f2fe]',
      tags: ['Strategic Thinking', 'Attention to Detail', 'Communication', 'Growth Mindset', 'Continuous Learning', 'Collaboration', 'Quality Delivery']
    },
  ];

  return (
    <section id="skills" className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-3xl sm:text-4xl md:text-[64px] font-display font-normal text-brand-dark dark:text-white mb-4">
            Skills & <span className="serif-italic bg-gradient-to-br from-[#3B001B] to-[#a5516b] dark:from-brand-pink dark:to-brand-yellow bg-clip-text text-transparent">Expertise</span>
          </SplitText>
          <div className="inline-block px-8 py-2 bg-brand-dark/5 dark:bg-white/5 rounded-full text-lg text-brand-dark/80 dark:text-white/60 font-light border border-brand-dark/10 dark:border-white/10 backdrop-blur-sm">
            <Quote size={16} className="inline mr-2 opacity-60" /> Delivering Strategy, Creativity, and Technical Excellence
          </div>
        </div>

        <div className="space-y-4">
          {skills.map((skill, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 rounded-[32px] border border-brand-dark/10 dark:border-white/10 overflow-hidden transition-all duration-500"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <motion.div 
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    className={`w-[54px] h-[54px] rounded-[20px] flex items-center justify-center text-white bg-gradient-to-br ${skill.gradient} transition-transform duration-500`}
                  >
                    {skill.icon}
                  </motion.div>
                  <span className="text-xl font-display font-bold text-brand-dark dark:text-white">{skill.title}</span>
                </div>
                <div className={`w-10 h-10 rounded-full border border-brand-dark/20 dark:border-white/20 flex items-center justify-center text-2xl font-light text-[#631d3b] dark:text-white transition-all duration-300 ${openIndex === idx ? 'rotate-45 bg-gradient-to-br from-[#4158D0] to-[#C850C0] text-white border-transparent' : ''}`}>
                  +
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="bg-[#FDFAF5] dark:bg-white/5"
                  >
                    <div className="p-6 md:p-8 pt-0 border-t-2 border-brand-dark/5 dark:border-white/5">
                      <p className="text-[#631d3b] dark:text-white/70 font-light leading-relaxed mb-8">
                        {skill.desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {skill.tags.map(tag => (
                          <span key={tag} className="px-5 py-2 bg-white dark:bg-white/10 border border-brand-dark/10 dark:border-white/10 rounded-full text-xs font-medium text-[#631d3b] dark:text-white/60 hover:bg-gradient-to-br hover:from-[#4158D0] hover:to-[#C850C0] hover:text-white hover:border-transparent transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Development', 'Social Management', 'Post Designs', 'Ads Campaigns', 'Logo Projects'];
  
  const projects = [
  { 
    id: 1, 
    category: 'Web Development',  // ✅ Added missing category
    title: 'Prints Empire',        // ✅ Added missing title
    img: '/image.png',
    liveLink: 'https://printsempire.com/', 
  },
  { 
    id: 2,
    category: 'Web Development',  // ✅ Added
    title: 'MG Printings',         // ✅ Added
    img: '/image1.png',
    liveLink: 'https://mgprintings.com/', 
  },
  { 
    id: 3,
    category: 'Web Development',  // ✅ Added
    title: 'Prints Empire 2',      // ✅ Added
    img: '/image2.png',
    liveLink: 'https://printsempire.com/', 
  },
  { 
    id: 4,
    category: 'Web Development',  // ✅ Added
    title: 'Fiber & Internet',     // ✅ Added
    img: '/image3.png',
    liveLink: 'https://getfiberandinternetnow.com/', 
  },
  { 
    id: 5,
    category: 'Web Development',  // ✅ Added
    title: 'Internet WiFi Service', // ✅ Added
    img: '/image4.png',
    liveLink: 'https://getinternetwifiservice.com/', 
  },
  { 
    id: 6,
    category: 'Web Development',  // ✅ Added
    title: 'Cable Internet Services', // ✅ Added
    img: '/image5.png',
    liveLink: 'https://newcableinternetservices.com/', 
  },
  { 
    id: 7,
    category: 'Social Management', // ✅ Added
    title: 'Bilal K. Instagram',    // ✅ Added
    img: '/image6.png',
    liveLink: 'https://www.instagram.com/bilal.k1989/', 
  },
  { 
    id: 8,
    category: 'Social Management', // ✅ Added
    title: 'Tech Pirates',          // ✅ Added
    img: '/image7.png',
    liveLink: 'https://www.instagram.com/techpirates14/', 
  },
  { 
    id: 9,
    category: 'Social Management', // ✅ Added
    title: 'Dwelio Listing',        // ✅ Added
    img: '/image8.png',
    liveLink: 'https://www.instagram.com/dweliolisting/',
  },
];

  // Filter function - category ke according filter karega
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  // Function to handle button click
  const handleLiveDemoClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Opening link:', link);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-3xl sm:text-4xl md:text-[64px] font-display font-normal text-brand-dark dark:text-white mb-4">
            Recent <span className="serif-italic bg-gradient-to-br from-[#3B001B] to-[#a5516b] dark:from-brand-pink dark:to-brand-yellow bg-clip-text text-transparent">Portfolio</span>
          </SplitText>
          <p className="text-brand-dark/70 dark:text-white/60 font-light max-w-2xl mx-auto text-lg mb-12">
            Every project I build is designed to be fast, responsive, SEO-friendly, and tailored to meet business goals.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => (
              <motion.button 
                key={cat}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${filter === cat ? 'bg-brand-dark dark:bg-brand-pink text-white border-brand-dark dark:border-brand-pink shadow-xl' : 'bg-white dark:bg-white/5 text-brand-dark dark:text-white border-brand-dark/10 dark:border-white/10 hover:border-brand-accent hover:text-brand-accent'}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
         <AnimatePresence mode='popLayout'>
  {filteredProjects.map(project => (
    <motion.div 
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative aspect-[4/3] rounded-[40px] overflow-hidden border border-brand-dark/10 dark:border-white/10 shadow-sm transition-all duration-500"
    >
      <img 
        src={project.img} 
        alt={project.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.5] group-hover:grayscale-0"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-10 text-center">
        <span className="text-brand-yellow text-xs font-bold mb-3 uppercase tracking-[0.2em]">{project.category}</span>
        <h3 className="text-white text-2xl font-display font-bold mb-6">{project.title}</h3>
        
        {/* Live Demo Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => handleLiveDemoClick(e, project.liveLink)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-dark font-bold hover:bg-white transition-all duration-300 shadow-lg cursor-pointer"
        >
          <span>Live Demo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  ))}
</AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-dark dark:bg-black text-white pt-8 pb-10 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-accent/5 to-transparent pointer-events-none" />
      
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-2 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="space-y-8"
        >
          <div className="text-3xl font-display font-bold tracking-tight">
            Sana<span className="text-brand-yellow serif-italic">Ansar</span>
          </div>
          <p className="text-white/70 text-lg font-light leading-relaxed max-w-sm">
            A passionate <span className="text-white font-medium">Digital Branding & Marketing Specialist</span> with over 4+ years of experience helping startups and entrepreneurs scale.
          </p>
          <div className="flex gap-4">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.a 
                key={i}
                href="#" 
                whileHover={{ y: -5, backgroundColor: '#f3c742', color: '#5a001e' }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all border border-white/10"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-display font-bold mb-8 text-brand-yellow uppercase tracking-widest">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-white/70 text-base font-light">
            {['Home', 'About', 'Experience', 'Skills', 'Portfolio', 'Contact'].map(link => (
              <li key={link}>
                <a href={link === 'Home' ? '#' : `#${link.toLowerCase()}`} className="hover:text-brand-yellow transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h3 className="text-xl font-display font-bold mb-8 text-brand-yellow uppercase tracking-widest">Contact Details</h3>
          <ul className="space-y-6 text-white/70 text-base font-light">
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <MapPin className="text-brand-yellow" size={20} />
              </div>
              <span className="leading-relaxed">Shop 33, Ground Floor, Jalal Arcade, Pakistan Town Phase 2, mian PWD Road, Islamabad, Pakistan.</span>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <Mail className="text-brand-yellow" size={20} />
              </div>
              <span className="font-medium text-white">info@tucomco.com</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-white/40 text-sm font-light">© 2026 Sana Ansar. All rights reserved. Designed with ❤️</p>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: '#f3c742' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 rounded-2xl bg-brand-accent flex items-center justify-center shadow-lg transition-colors"
        >
          <ChevronUp size={28} />
        </motion.button>
      </div>
    </footer>
  );
};

const WhyFit = () => {
  const [activeTab, setActiveTab] = useState(1);

  const content = [
    {
      id: 1,
      title: "Results That Speak For Themselves",
      desc: "I focus on measurable growth, more traffic, better leads, and higher conversions. Every strategy I build is backed by data not guesswork.",
      icon: <TrendingUp size={48} className="text-brand-accent" />
    },
    {
      id: 2,
      title: "Strategy Before Execution",
      desc: "I don't just run ads or post content. I create a custom strategy tailored to your business goals, audience, and ROI.",
      icon: <Compass size={48} className="text-brand-accent" />
    },
    {
      id: 3,
      title: "Data-Driven Decision Making",
      desc: "Every campaign is tracked, analyzed and optimized. I use analytics to continuously improve performance and ROI.",
      icon: <BarChart3 size={48} className="text-brand-accent" />
    },
    {
      id: 4,
      title: "Full-Funnel Expertise",
      desc: "From brand awareness to conversion and retention, I understand the complete customer journey.",
      icon: <Target size={48} className="text-brand-accent" />
    },
    {
      id: 5,
      title: "Transparent Communication",
      desc: "No confusing jargon. No hidden processes. You get clear reports and honest insights.",
      icon: <Mail size={48} className="text-brand-accent" />
    },
    {
      id: 6,
      title: "Creative Problem Solving",
      desc: "I find unique solutions to complex marketing challenges, ensuring your brand stands out in a crowded market.",
      icon: <Lightbulb size={48} className="text-brand-accent" />
    },
    {
      id: 7,
      title: "Continuous Optimization",
      desc: "Marketing is never 'done'. I constantly test and refine to ensure peak performance over time.",
      icon: <Zap size={48} className="text-brand-accent" />
    },
    {
      id: 8,
      title: "Client-Centric Approach",
      desc: "Your success is my success. I work closely with you to understand your vision and deliver results that matter.",
      icon: <Star size={48} className="text-brand-accent" />
    },
    {
      id: 9,
      title: "Technical Excellence",
      desc: "From SEO to web performance, I ensure the technical foundation of your digital presence is rock solid.",
      icon: <Code size={48} className="text-brand-accent" />
    },
    {
      id: 10,
      title: "Scalable Solutions",
      desc: "I build systems and strategies that grow with your business, from startup to enterprise.",
      icon: <Rocket size={48} className="text-brand-accent" />
    }
  ];

  return (
    <section className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark relative overflow-hidden transition-colors duration-500">
      {/* Background Image with Parallax */}
      <motion.div 
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-[0.3] dark:opacity-[0.3]"
      >
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920" 
          alt="Strategy Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-[64px] p-8 md:p-20 grid lg:grid-cols-2 gap-16 items-center border border-brand-dark/10 dark:border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500">
          {/* Decorative star shape in background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl" />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="relative z-10"
          >
            <SplitText className="text-4xl md:text-[56px] font-display font-bold text-brand-dark dark:text-white mb-12 leading-[1.1]">
              Why I'm the <span className="serif-italic bg-gradient-to-r from-brand-pink to-brand-accent bg-clip-text text-transparent">Right Fit</span> <br />
              for Your Growth
            </SplitText>
            
            <div className="flex flex-wrap gap-3 mb-12">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setActiveTab(num)}
                  className={`w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 flex items-center justify-center ${activeTab === num ? 'bg-brand-dark dark:bg-brand-pink border-brand-dark dark:border-brand-pink text-white scale-110 shadow-lg' : 'border-brand-dark/10 dark:border-white/10 text-brand-dark/40 dark:text-white/30 hover:border-brand-accent hover:text-brand-accent'}`}
                >
                  {num}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="min-h-[160px]"
              >
                <h3 className="text-3xl font-display font-bold text-brand-dark dark:text-white mb-4">
                  {content.find(c => c.id === activeTab)?.title}
                </h3>
                <p className="text-lg font-light text-brand-dark/70 dark:text-white/60 leading-relaxed">
                  {content.find(c => c.id === activeTab)?.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="relative flex items-center justify-center z-10"
          >
            <div className="bg-brand-bg dark:bg-white/5 rounded-[48px] p-12 aspect-square flex items-center justify-center overflow-hidden shadow-inner w-full max-w-md border border-brand-dark/5 dark:border-white/5 transition-all duration-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div 
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-32 h-32 bg-white dark:bg-white/10 rounded-[32px] mb-8 shadow-xl flex items-center justify-center text-brand-accent border border-brand-dark/5 dark:border-white/5 transition-all duration-500"
                  >
                    {content.find(c => c.id === activeTab)?.icon}
                  </motion.div>
                  <p className="text-2xl font-display font-bold text-brand-dark dark:text-white mb-2">
                    {content.find(c => c.id === activeTab)?.title.split(' ')[0]}
                  </p>
                  <div className="px-6 py-2 bg-brand-accent/10 rounded-full text-brand-accent text-xs font-bold uppercase tracking-[0.2em]">Growth Factor</div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Decorative element - floating star */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 text-brand-yellow opacity-20"
            >
              <Star size={80} fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const Process = () => {
  const steps = [
    { 
      id: '01', 
      title: 'Discovery & Strategy', 
      desc: 'We dive deep into your brand, goals, and audience. Strategic planning to ensure every step aligns with your vision.', 
      icon: <Compass size={32} />, 
      gradient: 'from-[#4158D0] to-[#C850C0]',
      hoverColor: '#4158D0', // ✅ Solid color for hover
      tags: ['research', 'goal setting', 'audit'] 
    },
    { 
      id: '02', 
      title: 'Creative & Design', 
      desc: 'Wireframes, mockups, and visual identity. We craft a unique look that speaks to your audience and stands out.', 
      icon: <Palette size={32} />, 
      gradient: 'from-[#f099fb] to-[#f5576c]',
      hoverColor: '#f099fb', // ✅ Solid color
      tags: ['branding', 'UI/UX', 'prototypes'] 
    },
    { 
      id: '03', 
      title: 'Build & Optimize', 
      desc: 'Development, content integration, and performance tuning. We build fast, responsive, and conversion-ready platforms.', 
      icon: <Code size={32} />, 
      gradient: 'from-[#4facfe] to-[#00f2fe]',
      hoverColor: '#4facfe', // ✅ Solid color
      tags: ['WordPress', 'SEO', 'speed'] 
    },
    { 
      id: '04', 
      title: 'Launch & High Fives', 
      desc: 'Everything goes live, you look amazing, and we celebrate. Need help down the road? We\'re always a message away.', 
      icon: <Rocket size={32} />, 
      gradient: 'from-[#43e97b] to-[#38f9d7]',
      hoverColor: '#43e97b', // ✅ Solid color
      tags: ['🚀 launch', '🎉 support', '💬 24/7'] 
    },
  ];

  return (
    <section id="process" className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SplitText className="text-3xl sm:text-4xl md:text-[64px] font-display font-normal text-brand-dark dark:text-white mb-4">
            Four <span className="serif-italic bg-gradient-to-br from-[#3B001B] to-[#a5516b] dark:from-brand-pink dark:to-brand-yellow bg-clip-text text-transparent">Step</span> Process
          </SplitText>
          <div className="inline-block px-8 py-2 bg-brand-dark/5 dark:bg-white/5 rounded-full text-lg text-brand-dark/80 dark:text-white/60 font-light border border-brand-dark/10 dark:border-white/10 backdrop-blur-sm">
            <Zap size={16} className="inline mr-2 text-brand-yellow" /> From Idea to Launch & Beyond
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white dark:bg-white/5 p-10 rounded-[48px] border border-brand-dark/10 dark:border-white/10 shadow-sm relative group transition-all duration-500 flex flex-col h-full hover:shadow-2xl hover:shadow-brand-dark/5"
            >
              <div className="flex justify-between items-start mb-10">
                <motion.div 
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${step.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  {step.icon}
                </motion.div>
                <span className="text-5xl font-display font-bold opacity-10 text-brand-dark dark:text-white group-hover:opacity-30 transition-opacity duration-500">{step.id}</span>
              </div>
              
              {/* FIXED: Title with solid color on hover (not gradient) */}
              <h3 
                className="text-2xl font-display font-bold text-brand-dark dark:text-white mb-4 leading-tight transition-all duration-500 group-hover:text-[var(--hover-color)]"
                style={{ '--hover-color': step.hoverColor }}
              >
                {step.title}
              </h3>
              
              {/* FIXED: Description darker on hover */}
              <p className="text-brand-dark/70 dark:text-white/60 font-light leading-relaxed mb-10 flex-grow group-hover:text-brand-dark dark:group-hover:text-white/90 transition-colors duration-500">
                {step.desc}
              </p>
              
              {/* FIXED: Tags with solid background on hover */}
              <div className="flex flex-wrap gap-2">
                {step.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-4 py-1 bg-brand-bg dark:bg-white/10 border border-brand-dark/5 dark:border-white/10 rounded-full text-[10px] font-bold text-brand-dark/40 dark:text-white/40 uppercase tracking-wider transition-all duration-500 group-hover:bg-[var(--hover-color)] group-hover:text-white group-hover:border-transparent group-hover:scale-105"
                    style={{ '--hover-color': step.hoverColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    const text = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-12 bg-brand-bg">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="arty-card max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-start"
      >
        {/* Left Column: Illustration, Heading, and Contact Info */}
        <div className="space-y-12">
          <div className="space-y-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-[320px] mx-auto lg:mx-0"
            >
              <img 
                src="https://framerusercontent.com/images/yquj0OAqxnnqWfUpCEXOVx6Wo.png" 
                alt="Illustration" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-dark leading-[1.1]">
                Let's Start a <br />
                <span className="serif-italic text-brand-accent">Conversation</span>
              </h2>
              <p className="text-lg md:text-xl font-medium text-brand-dark/70 max-w-md mx-auto lg:mx-0">
                Have a project in mind? We'd love to hear from you. Fill out the form and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Info Blocks from User Code */}
          <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-brand-dark/5">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-brand-yellow rounded-2xl flex items-center justify-center text-brand-dark shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Email Us</p>
                <p className="text-lg font-display font-bold text-brand-dark">info@tucomco.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-brand-yellow rounded-2xl flex items-center justify-center text-brand-dark shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Call Us</p>
                <p className="text-lg font-display font-bold text-brand-dark">+92 344 5284628</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form with User's Fields */}
        <div className="w-full pt-4 lg:pt-20">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
              <label className="arty-label">Name</label>
              <input 
                name="name" 
                type="text" 
                required 
                className="arty-input"
                placeholder="Your Full Name"
              />
            </div>

            <div className="space-y-2">
              <label className="arty-label">Email</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="arty-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="arty-label">Subject</label>
              <input 
                name="subject" 
                type="text" 
                required 
                className="arty-input"
                placeholder="How can we help?"
              />
            </div>

            <div className="space-y-2">
              <label className="arty-label">Message</label>
              <textarea 
                name="message" 
                rows={1} 
                required 
                className="arty-input resize-none overflow-hidden"
                placeholder="Tell us about your project..."
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>

            <div className="pt-6">
              <button type="submit" className="arty-button group w-full lg:w-auto flex items-center justify-center gap-4">
                Send Message
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    </div>
  );
};


const CallToAction = () => {
  return (
    <section className="py-16 px-6 bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="bg-brand-dark dark:bg-black rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920" 
              alt="CTA Background" 
              className="w-full h-full object-cover opacity-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/70 to-brand-dark/90 dark:from-black/90 dark:via-black/70 dark:to-black/90" />
          </div>

          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-yellow/10 pointer-events-none z-1" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <SplitText className="text-3xl sm:text-4xl md:text-[72px] font-display font-bold text-white mb-8 leading-tight tracking-tight">
              Ready to <span className="text-brand-yellow serif-italic">Scale</span> Your Brand?
            </SplitText>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-xl font-light mb-12 leading-relaxed"
            >
              Let's build something amazing together. Whether it's a new website, a marketing campaign, or a full brand overhaul, I'm here to help.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: '#f3c742', color: '#5a001e', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-brand-accent text-white font-bold rounded-full shadow-2xl transition-all text-lg"
              >
                Get Started Now
              </motion.a>
              <motion.a 
                href="#portfolio"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-transparent border border-white/20 text-white font-bold rounded-full transition-all text-lg"
              >
                View Portfolio
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${isDark ? 'dark' : ''}`}>
      <CustomCursor />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink via-brand-accent to-brand-yellow z-[100] origin-left"
        style={{ scaleX }}
      />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="bg-brand-bg dark:bg-brand-bg-dark transition-colors duration-500 w-full overflow-x-hidden">
        <Hero />
        <About />
        <StrategyAndStats />
        <Experience />
        <Skills />
        <Process />
        <Portfolio />
        <WhyFit />
        <ContactForm />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
