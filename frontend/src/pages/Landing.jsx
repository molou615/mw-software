import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'deliverynote',
    name: 'DeliveryNote Pro',
    icon: '🚛',
    tagline: 'For Haulage & Logistics',
    description: 'Drivers photograph and upload delivery notes from their phone. Everything is filed by job number automatically. Search any document instantly.',
    features: ['Upload from any phone', 'Auto-filed by job number', 'Search in 2 seconds', 'Customer portal', 'Version history', 'Bulk download'],
    color: 'blue',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '/login',
    status: 'live',
    stats: { users: '150+', countries: '3', uptime: '99.9%' },
  },
  {
    id: 'gymflow',
    name: 'GymFlow',
    icon: '🏋️',
    tagline: 'For Small Gyms & Studios',
    description: 'Members book classes from their phone. Instructors see attendance. You never overbook a class again.',
    features: ['Online class booking', 'Instructor dashboard', 'Attendance tracking', 'Member management', 'Real-time capacity', 'Automated reminders'],
    color: 'purple',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '/login',
    status: 'live',
    stats: { users: '80+', classes: '500+', satisfaction: '98%' },
  },
  {
    id: 'halaflow',
    name: 'HalaFlow',
    icon: '🎉',
    tagline: 'For Entertainment Teams',
    description: 'Clients book events online, you manage performers, packages, and checklists — all in one place. Never double-book again.',
    features: ['Online event booking', 'Performer management', 'Package & invoicing', 'Event checklists', 'Client portal', 'Photo gallery'],
    color: 'rose',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '/login',
    status: 'live',
    stats: { users: '45+', events: '200+', teams: '12' },
  },
  {
    id: 'taskpilot',
    name: 'TaskPilot',
    icon: '📋',
    tagline: 'For Cleaning Companies',
    description: 'Assign jobs to cleaners, track completion in real-time, manage schedules and client feedback from one dashboard.',
    features: ['Job assignment', 'Real-time tracking', 'Cleaner app', 'Client portal', 'Invoice generation', 'GPS check-in'],
    color: 'green',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '#',
    status: 'coming-soon',
    stats: { beta: '20+', waitlist: '150' },
  },
  {
    id: 'rentflow',
    name: 'RentFlow',
    icon: '🏠',
    tagline: 'For Property Managers',
    description: 'Track rent payments, manage tenant requests, schedule inspections, and never miss a renewal deadline.',
    features: ['Rent tracking', 'Tenant portal', 'Maintenance requests', 'Inspection scheduler', 'Lease management', 'Payment reminders'],
    color: 'orange',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '#',
    status: 'coming-soon',
    stats: { beta: '15+', waitlist: '200' },
  },
  {
    id: 'fleetsync',
    name: 'FleetSync',
    icon: '🚐',
    tagline: 'For Fleet Operators',
    description: 'Track MOT dates, servicing, breakdowns, and fuel costs for every vehicle in your fleet.',
    features: ['MOT reminders', 'Service log', 'Breakdown tracker', 'Fuel tracking', 'Vehicle history', 'Cost reports'],
    color: 'red',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '#',
    status: 'coming-soon',
    stats: { beta: '10+', waitlist: '80' },
  },
  {
    id: 'petbook',
    name: 'PetBook',
    icon: '🐕',
    tagline: 'For Dog Walkers',
    description: 'Clients book walks and sits, you manage schedules, send photo updates, and get paid — all in one app.',
    features: ['Online booking', 'GPS walk tracking', 'Photo updates', 'Invoicing', 'Client app', 'Schedule management'],
    color: 'yellow',
    price: '£199',
    priceMonthly: '£29/mo',
    demoUrl: '#',
    status: 'coming-soon',
    stats: { beta: '25+', waitlist: '120' },
  },
];

const testimonials = [
  { name: 'Sarah Mitchell', role: 'Owner, Mitchell Haulage', text: 'DeliveryNote Pro saved us 10 hours a week. Our drivers love how easy it is to upload documents.', rating: 5 },
  { name: 'James Chen', role: 'Manager, FitZone Gym', text: 'GymFlow reduced no-shows by 40%. Our members love booking from their phones.', rating: 5 },
  { name: 'Amina Benali', role: 'Founder, Party Maroc', text: 'HalaFlow transformed how we manage events. No more double-bookings or missed details.', rating: 5 },
  { name: 'David Thompson', role: 'Director, Thompson Transport', text: 'Simple, affordable, and it actually works. Best investment we made this year.', rating: 5 },
];

const faqs = [
  { q: 'How long does setup take?', a: 'Most businesses are up and running in under 5 minutes. No technical knowledge required.' },
  { q: 'Do I need my own server?', a: 'For the one-time license, yes. For the monthly plan, we host everything for you.' },
  { q: 'Can I try before I buy?', a: 'Yes! Every live product has a free demo you can explore with sample data.' },
  { q: 'What if I need help?', a: 'We offer email support for all plans. Priority support is included with monthly plans.' },
  { q: 'Are there any hidden fees?', a: 'No. The price you see is the price you pay. No transaction fees, no hidden costs.' },
  { q: 'Can I cancel monthly anytime?', a: 'Yes. No contracts, no cancellation fees. Cancel anytime from your dashboard.' },
];

export default function Landing() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const colorMap = {
    blue: { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-400', gradient: 'from-blue-600 to-blue-700', ring: 'ring-blue-500', shadow: 'shadow-blue-200' },
    purple: { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:border-purple-400', gradient: 'from-purple-600 to-purple-700', ring: 'ring-purple-500', shadow: 'shadow-purple-200' },
    green: { bg: 'bg-green-600', light: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hover: 'hover:border-green-400', gradient: 'from-green-600 to-green-700', ring: 'ring-green-500', shadow: 'shadow-green-200' },
    orange: { bg: 'bg-orange-600', light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:border-orange-400', gradient: 'from-orange-600 to-orange-700', ring: 'ring-orange-500', shadow: 'shadow-orange-200' },
    red: { bg: 'bg-red-600', light: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', hover: 'hover:border-red-400', gradient: 'from-red-600 to-red-700', ring: 'ring-red-500', shadow: 'shadow-red-200' },
    yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:border-yellow-400', gradient: 'from-yellow-500 to-yellow-600', ring: 'ring-yellow-500', shadow: 'shadow-yellow-200' },
    rose: { bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', hover: 'hover:border-rose-400', gradient: 'from-rose-500 to-rose-600', ring: 'ring-rose-500', shadow: 'shadow-rose-200' },
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Sticky Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>MW Software</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#projects" className={`text-sm font-medium transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}>Projects</a>
            <a href="#features" className={`text-sm font-medium transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}>Why Us</a>
            <a href="#pricing" className={`text-sm font-medium transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}>Pricing</a>
            <a href="#testimonials" className={`text-sm font-medium transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}>Reviews</a>
            <a href="#contact" className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              3 products live · 7 total in development
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
              Software that<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">small businesses love.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              We build affordable, focused tools for haulage companies, gyms, event planners, and more. No bloat. No complexity. Just what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="group bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-500 transition shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2">
                Explore Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="#contact" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2">
                Talk to Us
              </a>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
            {[
              { value: '7', label: 'Products Built', icon: '🚀' },
              { value: '275+', label: 'Active Users', icon: '👥' },
              { value: '99.9%', label: 'Uptime', icon: '⚡' },
              { value: '<24h', label: 'Support Response', icon: '💬' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Built different.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We don't build generic software. We build focused tools that solve specific problems for specific businesses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Focused Solutions', desc: 'Each product does one thing really well. No feature bloat, no confusing menus.', color: 'blue' },
              { icon: '💰', title: 'Affordable Pricing', desc: '£199 one-time or £29/mo. No hidden fees. No transaction costs.', color: 'green' },
              { icon: '⚡', title: '5-Minute Setup', desc: 'No technical knowledge needed. We set everything up for you.', color: 'purple' },
              { icon: '📱', title: 'Mobile First', desc: 'Every product works beautifully on phones, tablets, and desktops.', color: 'rose' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and never shared. GDPR compliant.', color: 'orange' },
              { icon: '🛠️', title: 'Source Code Included', desc: 'Own your software forever. Modify it however you want.', color: 'red' },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-${f.color}-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-3">Our Products</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Choose your tool.</h2>
            <p className="text-gray-500 text-lg">Each product is built for a specific industry. Click to learn more.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const c = colorMap[project.color];
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`bg-white rounded-2xl shadow-sm border ${c.border} ${c.hover} transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 group`}
                >
                  <div className={`bg-gradient-to-r ${c.gradient} p-8 text-white rounded-t-2xl relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">{project.icon}</span>
                        {project.status === 'live' ? (
                          <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> LIVE
                          </span>
                        ) : (
                          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
                      <p className="text-white/80 text-sm">{project.tagline}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">{project.description}</p>
                    <ul className="space-y-2.5 text-sm text-gray-600 mb-6">
                      {project.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-full ${c.light} ${c.text} flex items-center justify-center text-xs`}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-extrabold text-gray-900">{project.price}</span>
                        <span className="text-gray-400 text-sm ml-1">or {project.priceMonthly}</span>
                      </div>
                      {project.status === 'live' ? (
                        <button className={`${c.bg} text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-lg ${c.shadow}`}>
                          Try Demo →
                        </button>
                      ) : (
                        <button className="bg-gray-100 text-gray-500 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={`bg-gradient-to-r ${colorMap[selectedProject.color].gradient} p-10 text-white rounded-t-3xl relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <span className="text-5xl">{selectedProject.icon}</span>
                  <div>
                    <h2 className="text-3xl font-extrabold">{selectedProject.name}</h2>
                    <p className="text-white/80 text-lg">{selectedProject.tagline}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedProject(null)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition text-xl">×</button>
              </div>
            </div>
            <div className="p-10">
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">{selectedProject.description}</p>

              <h4 className="font-bold text-lg mb-4">All Features</h4>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {selectedProject.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600">
                    <span className={`w-5 h-5 rounded-full ${colorMap[selectedProject.color].light} ${colorMap[selectedProject.color].text} flex items-center justify-center text-xs`}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(selectedProject.stats).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-xl font-extrabold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div>
                  <span className="text-3xl font-extrabold">{selectedProject.price}</span>
                  <span className="text-gray-400 ml-2">or {selectedProject.priceMonthly}</span>
                </div>
                {selectedProject.status === 'live' ? (
                  <a href={selectedProject.demoUrl} className={`${colorMap[selectedProject.color].bg} text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition shadow-xl flex items-center gap-2`}>
                    Try Live Demo
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                ) : (
                  <a href="#contact" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2">
                    Join Waitlist
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Loved by businesses.</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white relative">
              <div className="text-6xl opacity-20 absolute top-6 left-8">"</div>
              <div className="relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-xl md:text-2xl leading-relaxed mb-8">{testimonials[currentTestimonial].text}</p>
                <div>
                  <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2.5 h-2.5 rounded-full transition ${i === currentTestimonial ? 'bg-blue-500 w-8' : 'bg-white/30'}`}></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-3">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Simple pricing.</h2>
            <p className="text-gray-500 text-lg">Same pricing for every product. No surprises.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6">📦</div>
              <h3 className="font-bold text-xl mb-2">One Product</h3>
              <div className="text-4xl font-extrabold text-blue-600 my-4">£199</div>
              <p className="text-gray-500 text-sm mb-6">Pay once, own one product forever.</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> One product of your choice</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> All features included</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 1 year support</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Source code included</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Free updates for 1 year</li>
              </ul>
              <a href="#contact" className="block text-center bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition">Get Started</a>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-8 shadow-2xl relative scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-extrabold px-4 py-1.5 rounded-full">BEST VALUE</div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-6">🎁</div>
              <h3 className="font-bold text-xl mb-2">Bundle (2 products)</h3>
              <div className="text-4xl font-extrabold my-4">£299</div>
              <p className="text-blue-200 text-sm mb-6">Save £99 when you buy two.</p>
              <ul className="space-y-3 text-sm text-blue-100 mb-8">
                <li className="flex items-center gap-2"><span className="text-green-300">✓</span> Any 2 products</li>
                <li className="flex items-center gap-2"><span className="text-green-300">✓</span> All features included</li>
                <li className="flex items-center gap-2"><span className="text-green-300">✓</span> 1 year support</li>
                <li className="flex items-center gap-2"><span className="text-green-300">✓</span> Source code included</li>
                <li className="flex items-center gap-2"><span className="text-green-300">✓</span> Priority support</li>
              </ul>
              <a href="#contact" className="block text-center bg-white text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition">Get Started</a>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl mb-6">☁️</div>
              <h3 className="font-bold text-xl mb-2">Monthly (per product)</h3>
              <div className="text-4xl font-extrabold text-purple-600 my-4">£29<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-gray-500 text-sm mb-6">We host and maintain everything.</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Managed hosting</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Automatic backups</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Priority support</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> All updates included</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Cancel anytime</li>
              </ul>
              <a href="#contact" className="block text-center bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Got questions?</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stay updated</h2>
          <p className="text-blue-100 mb-8">Get notified when we launch new products and features.</p>
          {submitted ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-lg font-semibold">✓ Thanks for subscribing!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-5 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-white" required />
              <button type="submit" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mb-3">Get Started</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Let's talk.</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">Interested in a project? Have a custom requirement? Drop us a message and we'll get back to you within 24 hours.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">💬</div>
                  <div>
                    <div className="font-semibold">Live Demo</div>
                    <div className="text-gray-500 text-sm">Try any product free — no signup needed</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-xl">⚡</div>
                  <div>
                    <div className="font-semibold">Fast Setup</div>
                    <div className="text-gray-500 text-sm">Up and running in under 5 minutes</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl">🛡️</div>
                  <div>
                    <div className="font-semibold">Money-Back Guarantee</div>
                    <div className="text-gray-500 text-sm">Not happy? Full refund within 30 days</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Your name" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                  <input type="email" placeholder="Email address" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <input type="text" placeholder="Company name" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <select className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500 transition">
                  <option>Which project interests you?</option>
                  {projects.map(p => (
                    <option key={p.id}>{p.name} {p.status === 'coming-soon' ? '(Coming Soon)' : ''}</option>
                  ))}
                  <option>Multiple projects</option>
                  <option>Custom project</option>
                </select>
                <textarea placeholder="Tell us about your business..." rows="4" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"></textarea>
                <button type="button" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/25">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="text-2xl font-extrabold text-gray-900 mb-4">MW Software</div>
              <p className="text-gray-500 text-sm leading-relaxed">Building affordable software for small businesses since 2026.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {projects.filter(p => p.status === 'live').map(p => (
                  <li key={p.id}><a href="#projects" className="hover:text-gray-900 transition">{p.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-gray-900 transition">About</a></li>
                <li><a href="#pricing" className="hover:text-gray-900 transition">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-gray-900 transition">Reviews</a></li>
                <li><a href="#contact" className="hover:text-gray-900 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">© 2026 MW Software. All rights reserved.</div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition">Terms</a>
              <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
