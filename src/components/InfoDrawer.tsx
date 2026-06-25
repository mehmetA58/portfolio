import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ExternalLink, GitFork, Link } from 'lucide-react'

interface InfoDrawerProps {
  isOpen: boolean
  onClose: () => void
}

type MenuView = 'main' | 'experience' | 'skills' | 'about' | 'contact'

const EXPERIENCES = [
  {
    company: 'byFood',
    role: 'Software Tester (QA)',
    period: 'Nov 2024 – Present',
    location: 'Tokyo, Japan (Remote)',
    highlights: [
      'Functional, regression & exploratory testing for Japan-based food marketplace',
      'Host-side & B2B partner workflow coverage across web and mobile',
      'Agile: Daily Stand-ups, Three Amigos sessions, Weekly Syncs',
    ],
  },
  {
    company: 'JuniusTech',
    role: 'Software Test Engineer',
    period: 'Dec 2023 – Nov 2024',
    location: 'Remote',
    highlights: [
      '150+ structured test cases with full traceability matrix',
      'Jira-XRay automated smoke/regression checklist integration',
      'Appium-compatible mobile test dataset design',
    ],
  },
  {
    company: 'Clarusway',
    role: 'QA Automation Engineer',
    period: 'Feb 2023 – Dec 2023',
    location: 'Remote',
    highlights: [
      '~40% reduction in test execution time via Selenium + Cucumber BDD',
      '~20% API test performance improvement with REST Assured',
      'Jenkins/Maven CI/CD pipeline integration',
    ],
  },
  {
    company: 'TechPro Education EU',
    role: 'Functional Tester',
    period: 'Sep 2022 – Feb 2023',
    location: 'Remote',
    highlights: [
      '~40% software stability improvement via Hybrid POM framework',
      'Smoke, regression & functional E2E suites for CRM/LMS',
      'log4j logging + Jira defect workflow integration',
    ],
  },
  {
    company: 'Hypnotes',
    role: 'Software QA Engineer',
    period: 'Apr 2022 – Sep 2022',
    location: 'California, US (Remote)',
    highlights: [
      'Automated regression + smoke coverage with Selenium, JUnit, TestNG',
      'Gherkin BDD feature files for clinical session scenarios',
      'Modular POM-based scripts with full Jira defect lifecycle',
    ],
  },
]

const SKILLS = [
  { cat: 'Automation', items: ['Selenium WebDriver', 'Cucumber BDD', 'TestNG', 'Appium', 'Cypress'] },
  { cat: 'API Testing', items: ['REST Assured', 'Postman', 'API Validation', 'Swagger'] },
  { cat: 'CI/CD & Tools', items: ['Jenkins', 'Maven', 'GitHub', 'Jira', 'Jira-XRay'] },
  { cat: 'Languages', items: ['Java', 'Gherkin', 'SQL', 'JavaScript (basic)'] },
  { cat: 'Methodologies', items: ['Agile/Scrum', 'BDD', 'TDD', 'Page Object Model', 'Data-Driven'] },
]

export default function InfoDrawer({ isOpen, onClose }: InfoDrawerProps) {
  const [view, setView] = useState<MenuView>('main')
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' })

  const goTo = (v: MenuView) => setView(v)
  const goBack = () => setView('main')

  const mono = { fontFamily: 'IBM Plex Mono, monospace' }
  const display = { fontFamily: 'Anton, Impact, Arial Black, sans-serif' }
  const sans = { fontFamily: 'Space Grotesk, Inter, system-ui, sans-serif' }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 h-full z-50 w-full sm:max-w-xl md:max-w-2xl bg-[#1a1a1a] border-l border-white/5 flex flex-col overflow-hidden"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-10 py-5">
              {view !== 'main' ? (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-white/50 hover:text-[#CCFF00] transition-colors"
                  style={mono}
                >
                  <ArrowLeft size={14} />
                  <span className="text-xs tracking-widest uppercase">BACK</span>
                </button>
              ) : (
                <span style={{ ...display, color: '#CCFF00', fontSize: 18, letterSpacing: '0.1em' }}>
                  MENU
                </span>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-[#CCFF00] hover:text-[#CCFF00] text-white/50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 scrollbar-thin">
              <AnimatePresence mode="wait">
                {/* ── MAIN MENU ── */}
                {view === 'main' && (
                  <motion.nav
                    key="main"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ul className="space-y-1">
                      {(
                        [
                          { label: 'EXPERIENCE', view: 'experience' as MenuView | null, href: undefined as string | undefined },
                          { label: 'SKILLS', view: 'skills' as MenuView | null, href: undefined as string | undefined },
                          { label: 'ABOUT', view: 'about' as MenuView | null, href: undefined as string | undefined },
                          { label: 'RESUME', view: null as MenuView | null, href: 'mailto:mehmet.akbayir58@gmail.com' as string | undefined },
                          { label: "LET'S WORK", view: 'contact' as MenuView | null, href: undefined as string | undefined },
                        ]
                      ).map(({ label, view: v, href }) => (
                        <li key={label}>
                          {href ? (
                            <a
                              href={href}
                              style={{
                                ...display,
                                fontSize: 'clamp(28px, 6vw, 56px)',
                                letterSpacing: '0.04em',
                                color: 'rgba(255,255,255,0.08)',
                                WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                              }}
                              className="block leading-tight hover:text-[#CCFF00] hover:[-webkit-text-stroke:1px_#CCFF00] transition-all duration-200 group"
                            >
                              {label}
                              <ExternalLink size={14} className="inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#CCFF00]" />
                            </a>
                          ) : (
                            <button
                              onClick={() => v && goTo(v as MenuView)}
                              style={{
                                ...display,
                                fontSize: 'clamp(28px, 6vw, 56px)',
                                letterSpacing: '0.04em',
                                color: 'rgba(255,255,255,0.08)',
                                WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                              }}
                              className="block leading-tight w-full text-left hover:text-[#CCFF00] hover:[-webkit-text-stroke:1px_#CCFF00] transition-all duration-200"
                            >
                              {label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Social links */}
                    <div className="mt-12 flex items-center gap-6 border-t border-white/5 pt-8">
                      <a
                        href="https://github.com/mehmetA58"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/40 hover:text-[#CCFF00] transition-colors"
                        style={mono}
                      >
                        <GitFork size={16} />
                        <span className="text-xs tracking-wider uppercase">GitHub</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/mehmetakbayir"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/40 hover:text-[#CCFF00] transition-colors"
                        style={mono}
                      >
                        <Link size={16} />
                        <span className="text-xs tracking-wider uppercase">LinkedIn</span>
                      </a>
                    </div>
                  </motion.nav>
                )}

                {/* ── EXPERIENCE ── */}
                {view === 'experience' && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 style={{ ...display, color: '#CCFF00', fontSize: 'clamp(22px, 4vw, 36px)', letterSpacing: '0.05em' }} className="mb-8">
                      EXPERIENCE
                    </h2>
                    <div className="space-y-8">
                      {EXPERIENCES.map((exp) => (
                        <div key={exp.company} className="border-l-2 border-white/10 pl-5 hover:border-[#CCFF00] transition-colors group">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <p style={{ ...display, fontSize: 18, letterSpacing: '0.05em', color: '#fff' }}>{exp.company}</p>
                              <p style={{ ...sans, color: '#CCFF00', fontSize: 13 }}>{exp.role}</p>
                            </div>
                            <div className="text-right">
                              <p style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{exp.period}</p>
                              <p style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{exp.location}</p>
                            </div>
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {exp.highlights.map((h) => (
                              <li key={h} style={{ ...sans, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }} className="flex gap-2">
                                <span className="text-[#CCFF00] mt-0.5 shrink-0">→</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── SKILLS ── */}
                {view === 'skills' && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 style={{ ...display, color: '#CCFF00', fontSize: 'clamp(22px, 4vw, 36px)', letterSpacing: '0.05em' }} className="mb-8">
                      SKILLS
                    </h2>
                    <div className="space-y-7">
                      {SKILLS.map(({ cat, items }) => (
                        <div key={cat}>
                          <p style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }} className="uppercase mb-3">
                            {cat}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                              <span
                                key={item}
                                style={{ ...sans, fontSize: 13 }}
                                className="px-3 py-1.5 border border-white/10 text-white/70 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-default"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="mt-10 border-t border-white/5 pt-8">
                      <p style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }} className="uppercase mb-4">
                        Certifications
                      </p>
                      <ul className="space-y-2">
                        {[
                          'Test Otomasyonunun Temelleri',
                          'Cypress io | Web Otomasyon Testi',
                          'Advanced Selenium: Automation Frameworks',
                          '15 Days of Postman – for Testers',
                          'Software Test Summit 2022',
                        ].map((c) => (
                          <li key={c} style={{ ...sans, fontSize: 13, color: 'rgba(255,255,255,0.5)' }} className="flex gap-2">
                            <span className="text-[#CCFF00]">✦</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* ── ABOUT ── */}
                {view === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 style={{ ...display, color: '#CCFF00', fontSize: 'clamp(22px, 4vw, 36px)', letterSpacing: '0.05em' }} className="mb-8">
                      ABOUT
                    </h2>
                    <p style={{ ...sans, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }} className="mb-6">
                      A bug caught during testing is ten times cheaper than one caught in production. I catch them early.
                    </p>
                    <p style={{ ...sans, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }} className="mb-6">
                      QA Automation Engineer with 3+ years building scalable test frameworks across web, mobile, and API layers — for e-commerce, SaaS, messaging, and wellness platforms.
                    </p>
                    <p style={{ ...sans, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
                      Currently at byFood (Tokyo-based, remote) — validating Host and B2B workflows on a Japan-based food marketplace across global release cycles. Open to remote Software Tester positions based in Turkey.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                      {[
                        { label: 'Location', value: 'Istanbul, Turkey' },
                        { label: 'Status', value: 'Open to Work' },
                        { label: 'Experience', value: '3+ Years' },
                        { label: 'Focus', value: 'QA Automation' },
                      ].map(({ label, value }) => (
                        <div key={label} className="border border-white/5 p-4">
                          <p style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }} className="uppercase mb-1">{label}</p>
                          <p style={{ ...sans, fontSize: 14, color: '#fff' }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-white/5 pt-8">
                      <p style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }} className="uppercase mb-4">Education</p>
                      <div className="space-y-4">
                        <div>
                          <p style={{ ...sans, fontSize: 14, color: '#fff' }}>Harran Üniversitesi</p>
                          <p style={{ ...mono, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>B.Sc. Environmental Engineering</p>
                        </div>
                        <div>
                          <p style={{ ...sans, fontSize: 14, color: '#fff' }}>Anadolu Üniversitesi</p>
                          <p style={{ ...mono, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Geographic Information Science — 2020</p>
                        </div>
                        <div>
                          <p style={{ ...sans, fontSize: 14, color: '#fff' }}>Patika.dev</p>
                          <p style={{ ...mono, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>A101 Test Automation Practicum — 2022</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── CONTACT FORM ── */}
                {view === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 style={{ ...display, color: '#CCFF00', fontSize: 'clamp(22px, 4vw, 36px)', letterSpacing: '0.05em' }} className="mb-2">
                      LET'S WORK
                    </h2>
                    <p style={{ ...sans, fontSize: 13, color: 'rgba(255,255,255,0.4)' }} className="mb-8">
                      mehmet.akbayir58@gmail.com
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        window.location.href = `mailto:mehmet.akbayir58@gmail.com?subject=Collaboration%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`
                      }}
                      className="space-y-7"
                    >
                      {[
                        { id: 'name', label: 'YOUR NAME', placeholder: 'Jane Smith' },
                        { id: 'email', label: 'YOUR EMAIL', placeholder: 'jane@company.com' },
                      ].map(({ id, label, placeholder }) => (
                        <div key={id} className="group">
                          <label
                            htmlFor={id}
                            style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}
                            className="block uppercase mb-2"
                          >
                            {label}
                          </label>
                          <input
                            id={id}
                            type={id === 'email' ? 'email' : 'text'}
                            placeholder={placeholder}
                            value={formData[id as keyof typeof formData]}
                            onChange={(e) => setFormData((p) => ({ ...p, [id]: e.target.value }))}
                            required
                            style={{ ...sans, fontSize: 14, color: '#fff', background: 'transparent' }}
                            className="w-full border-b border-white/15 focus:border-[#CCFF00] outline-none py-2 placeholder:text-white/20 transition-colors"
                          />
                        </div>
                      ))}

                      <div>
                        <label
                          htmlFor="project"
                          style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}
                          className="block uppercase mb-2"
                        >
                          PROJECT TYPE
                        </label>
                        <select
                          id="project"
                          value={formData.project}
                          onChange={(e) => setFormData((p) => ({ ...p, project: e.target.value }))}
                          style={{ ...sans, fontSize: 14, color: formData.project ? '#fff' : 'rgba(255,255,255,0.2)', background: '#1a1a1a' }}
                          className="w-full border-b border-white/15 focus:border-[#CCFF00] outline-none py-2 transition-colors cursor-pointer"
                        >
                          <option value="" disabled style={{ background: '#1a1a1a' }}>Select a service...</option>
                          <option value="automation" style={{ background: '#1a1a1a' }}>Test Automation Framework</option>
                          <option value="manual" style={{ background: '#1a1a1a' }}>Manual QA Testing</option>
                          <option value="api" style={{ background: '#1a1a1a' }}>API Testing & Validation</option>
                          <option value="ci" style={{ background: '#1a1a1a' }}>CI/CD Integration</option>
                          <option value="consulting" style={{ background: '#1a1a1a' }}>QA Consulting</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}
                          className="block uppercase mb-2"
                        >
                          YOUR MESSAGE
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          required
                          style={{ ...sans, fontSize: 14, color: '#fff', background: 'transparent', resize: 'none' }}
                          className="w-full border-b border-white/15 focus:border-[#CCFF00] outline-none py-2 placeholder:text-white/20 transition-colors"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ ...display, background: '#CCFF00', color: '#000', fontSize: 16, letterSpacing: '0.08em' }}
                        className="w-full py-4 uppercase tracking-widest hover:brightness-110 transition-all"
                      >
                        SEND MESSAGE →
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
