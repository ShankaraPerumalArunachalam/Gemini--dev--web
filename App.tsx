import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight,
  Monitor, 
  Smartphone, 
  Settings, 
  Code, 
  Target, 
  Cloud, 
  Database, 
  Server,
  Zap,
  CheckCircle2,
  Cpu,
  Globe,
  MessageSquare,
  Bot
} from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';

// --- Helper Components ---

const RevealText = ({ children, delay = 0, className = "" }: { children?: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
            >
                {children}
            </motion.div>
        </div>
    )
}

const ServiceCard = ({ title, description, Icon, number }: { title: string, description: string, Icon: any, number: string }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 rounded-xl relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-6 opacity-10 font-serif text-6xl text-accent/20 group-hover:opacity-20 transition-opacity">
            {number}
        </div>
        <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
             <Icon size={24} strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-2xl text-primary font-medium mb-3">{title}</h3>
        <p className="text-secondary text-sm leading-relaxed mb-6">{description}</p>
        <a href="#" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
            Learn More <ArrowRight size={14} />
        </a>
    </motion.div>
);

const CollaborateSection = ({ title, description, image, align = 'left' }: { title: string, description: string, image: string, align?: 'left' | 'right' }) => (
    <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mb-32 last:mb-0"
    >
        <div className={`flex flex-col md:flex-row items-center gap-8 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            {/* Image Container */}
            <div className="w-full md:w-3/5 relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Floating Content Card */}
            <div className={`w-full md:w-2/5 md:absolute ${align === 'left' ? 'right-0 md:mr-12 lg:mr-24' : 'left-0 md:ml-12 lg:ml-24'} -mt-12 md:mt-0 z-10`}>
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100">
                     <span className="inline-block py-1 px-3 rounded-full bg-brand-light text-accent text-xs font-semibold tracking-wider uppercase mb-4">
                        Key Focus
                     </span>
                     <h3 className="font-serif text-3xl md:text-4xl text-primary mb-4 leading-tight">
                        {title}
                     </h3>
                     <p className="text-secondary leading-relaxed mb-6">
                        {description}
                     </p>
                     <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors group">
                        View Solutions 
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                     </button>
                </div>
            </div>
        </div>
    </motion.div>
);

const TechBadge = ({ name, Icon }: { name: string, Icon: any }) => (
    <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
        <Icon size={32} className="text-secondary" strokeWidth={1} />
        <span className="font-medium text-sm text-primary">{name}</span>
    </div>
);

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
    <div className="border-b border-gray-200 last:border-0">
        <button 
            className="w-full py-6 flex justify-between items-center text-left hover:text-accent transition-colors"
            onClick={onClick}
        >
            <span className={`font-serif text-xl md:text-2xl transition-colors ${isOpen ? 'text-accent italic' : 'text-primary'}`}>{question}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-accent border-accent text-white rotate-45' : 'border-gray-300 text-gray-400'}`}>
                <ArrowRight size={16} className={`${isOpen ? '-rotate-45' : ''}`} />
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="pb-8 pt-2 text-secondary leading-relaxed max-w-2xl">
                        {answer}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-accent selection:text-white overflow-x-hidden font-sans">
      <CustomCursor />
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Futuristic/AI */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2500&auto=format&fit=crop" 
                alt="AI Abstract" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left mt-20">
            <RevealText>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    Idea Manifest
                </div>
            </RevealText>
            
            <RevealText delay={0.1}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8 max-w-4xl">
                    Let's <span className="italic font-light">Transform</span> Your Business With <span className="italic font-light">Idea Manifest</span>
                </h1>
            </RevealText>

            <RevealText delay={0.2}>
                <p className="text-gray-200 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
                    Idea Manifest crafts bespoke AI solutions that empower clients to optimize processes and drive revenue growth through intelligent automation.
                </p>
            </RevealText>
            
            <RevealText delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group">
                        Book a Consultation
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <button className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
                        View Our Work
                    </button>
                </div>
            </RevealText>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-32 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-4">
                      <span className="block w-12 h-1 bg-accent mb-6"></span>
                      <h4 className="text-secondary uppercase tracking-widest text-xs font-bold">Who We Are</h4>
                  </div>
                  <div className="lg:col-span-8">
                      <h2 className="text-3xl md:text-5xl leading-tight font-sans font-light text-primary mb-12">
                          Idea Manifest is a <span className="font-serif italic text-accent">leading</span> Generative AI consulting company, dedicated to crafting <span className="font-serif italic text-accent">bespoke</span> solutions that empower clients to <span className="font-serif italic text-accent">optimize</span> business processes.
                      </h2>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
                          <div>
                              <div className="font-serif text-4xl text-primary mb-2">95%</div>
                              <div className="text-xs text-secondary uppercase tracking-wide">Client Retention</div>
                          </div>
                          <div>
                              <div className="font-serif text-4xl text-primary mb-2">50+</div>
                              <div className="text-xs text-secondary uppercase tracking-wide">AI Projects</div>
                          </div>
                          <div>
                              <div className="font-serif text-4xl text-primary mb-2">24/7</div>
                              <div className="text-xs text-secondary uppercase tracking-wide">Support</div>
                          </div>
                          <div>
                              <div className="font-serif text-4xl text-primary mb-2">100%</div>
                              <div className="text-xs text-secondary uppercase tracking-wide">Satisfaction</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 px-6 md:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-16">
                  <div>
                      <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Our <span className="italic text-accent">Expertise</span></h2>
                      <p className="text-secondary max-w-xl">We fuse advanced AI technologies with deep domain expertise.</p>
                  </div>
                  <a href="#" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
                      View All Services <ArrowRight size={16}/>
                  </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ServiceCard 
                      number="01"
                      title="Web Development"
                      description="Web applications tailored to meet the unique needs of your business and industry using cutting-edge frameworks."
                      Icon={Monitor}
                  />
                  <ServiceCard 
                      number="02"
                      title="Mobile Applications"
                      description="Native and cross-platform mobile solutions designed to provide seamless user experiences across all devices."
                      Icon={Smartphone}
                  />
                  <ServiceCard 
                      number="03"
                      title="AI Chatbots"
                      description="Intelligent conversational interfaces that automate customer support and enhance user engagement 24/7."
                      Icon={Bot}
                  />
                  <ServiceCard 
                      number="04"
                      title="Predictive Analytics"
                      description="Leverage historical data to forecast trends and make data-driven decisions for sustainable growth."
                      Icon={Target}
                  />
                  <ServiceCard 
                      number="05"
                      title="Custom GPT"
                      description="Tailored Large Language Models trained on your specific business data for highly relevant outputs."
                      Icon={Cpu}
                  />
                  <ServiceCard 
                      number="06"
                      title="Image Recognition"
                      description="Advanced computer vision systems for automated quality control, surveillance, and visual data analysis."
                      Icon={ScanEyeIcon}
                  />
              </div>
          </div>
      </section>

      {/* COLLABORATE / CASE STUDIES SECTION */}
      <section className="py-32 px-6 md:px-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-24">
                  <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Target Audience</span>
                  <h2 className="font-serif text-4xl md:text-6xl text-primary mb-6">Collaborate <span className="italic">With Us</span></h2>
                  <p className="text-secondary text-lg">
                      We offer innovative solutions tailored for businesses of all sizes, from ambitious startups to established enterprises.
                  </p>
              </div>

              <div className="space-y-24">
                  <CollaborateSection 
                      title="Startups"
                      description="We understand the unique challenges and opportunities that startups face. Our team of AI experts is committed to supporting startups with scalable, cost-effective MVP development and rapid iteration cycles."
                      image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2340&auto=format&fit=crop"
                      align="left"
                  />
                  <CollaborateSection 
                      title="Enterprises"
                      description="We understand the complex challenges facing enterprises today. Our team specializes in integrating AI into legacy systems, ensuring security compliance, and driving digital transformation at scale."
                      image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2340&auto=format&fit=crop"
                      align="right"
                  />
                  <CollaborateSection 
                      title="Small & Midsize Business"
                      description="We believe that AI has the power to transform SMBs and drive sustainable growth. We provide accessible, high-impact automation tools that level the playing field."
                      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2664&auto=format&fit=crop"
                      align="left"
                  />
              </div>
          </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technology" className="py-24 px-6 md:px-12 bg-background border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center">
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Technology Stack</h2>
                  <p className="text-secondary">Powered by the world's most robust frameworks.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  <TechBadge name="FastAPI" Icon={Zap} />
                  <TechBadge name="Azure" Icon={Cloud} />
                  <TechBadge name="AWS" Icon={Server} />
                  <TechBadge name="Redis" Icon={Database} />
                  <TechBadge name="OpenAI" Icon={Cpu} />
                  <TechBadge name="Flutter" Icon={Smartphone} />
                  <TechBadge name="Claude 3" Icon={MessageSquare} />
                  <TechBadge name="LLaVa" Icon={ScanEyeIcon} />
              </div>
          </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                  <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Common <span className="italic text-accent">Questions</span></h2>
              </div>

              <div className="space-y-2">
                  <AccordionItem 
                      question="Do you offer flexible pricing options?" 
                      answer="Yes, we understand that every project is unique. We offer flexible pricing options including fixed-price contracts for defined scopes and time-and-materials models for ongoing development."
                      isOpen={openFaq === 0}
                      onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  />
                  <AccordionItem 
                      question="Do you provide post-deployment support?" 
                      answer="Absolutely. We provide comprehensive post-deployment support and maintenance packages to ensure your AI solutions continue to perform optimally and evolve with your business needs."
                      isOpen={openFaq === 1}
                      onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  />
                   <AccordionItem 
                      question="How do you ensure data security?" 
                      answer="Data privacy and security are our top priorities. We adhere to strict data protection regulations (GDPR/CCPA) and implement robust security measures including end-to-end encryption."
                      isOpen={openFaq === 2}
                      onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  />
                   <AccordionItem 
                      question="Can you integrate with existing systems?" 
                      answer="Yes. Our team specializes in seamless integration of AI capabilities into legacy systems, modern web apps, and mobile platforms using robust, secure APIs."
                      isOpen={openFaq === 3}
                      onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  />
              </div>
          </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-20 px-6 md:px-12 bg-background">
          <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] overflow-hidden relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10 px-8 py-20 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="md:w-1/2">
                      <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Ready to <span className="italic text-accent">Transform</span> Your Business?</h2>
                      <p className="text-gray-300 text-lg mb-8">Schedule a free consultation and discover how Idea Manifest can streamline your operations.</p>
                      
                      <div className="flex flex-col gap-4 text-gray-300">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                  <span className="text-sm">✉️</span>
                              </div>
                              info@ideamanifest.com
                          </div>
                      </div>
                  </div>

                  <div className="md:w-1/2 w-full bg-white p-8 rounded-2xl shadow-2xl">
                       <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent" />
                              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent" />
                          </div>
                          <textarea rows={4} placeholder="Message" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"></textarea>
                          <button className="w-full py-4 bg-accent text-white rounded-lg font-bold hover:bg-brand-dark transition-colors">Send Message</button>
                       </form>
                  </div>
              </div>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-white py-16 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                  <h3 className="font-sans font-bold text-2xl mb-2">Idea Manifest</h3>
                  <p className="text-gray-400 text-sm">AI Development Company In Kochi</p>
              </div>
              <div className="flex gap-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
              <p className="text-gray-500 text-sm">© 2025 Idea Manifest. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

// Helper icon component since ScanEye was imported but used as ScanEyeIcon in text
const ScanEyeIcon = ({ size, className, strokeWidth }: {size?:number, className?:string, strokeWidth?: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 16a9 9 0 0 0-9-5.658L2 10l1-2.906a9 9 0 0 1 18 0L22 10l-1 2.342A9 9 0 0 0 12 16Z" />
    </svg>
)

export default App;