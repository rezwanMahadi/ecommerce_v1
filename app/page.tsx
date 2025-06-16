"use client"

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./components/AnimatedSection";
import { useEffect, useState } from "react";
import ProductCard from '@/components/ProductCard';

export default function Home() {
  // Particle state for hydration-safe random values
  const [particles, setParticles] = useState<{ left: string; animationDelay: string; animationDuration: string; }[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }, () => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 4}s`,
      }))
    );
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
        {/* Enhanced Dynamic Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" style={{ willChange: 'transform' }}></div>
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-float-delayed" style={{ willChange: 'transform' }}></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          {/* New floating elements */}
          <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-lg animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        </div>
        
        {/* Enhanced Grid Pattern with Movement */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-move" style={{ willChange: 'transform' }}></div>
        </div>
        
        {/* Enhanced Particle Effect - hydration safe */}
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-particle"
              style={{
                left: p.left,
                willChange: 'transform, opacity',
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
              }}
            ></div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-robotics.jpg"
            alt="Hero Robotics"
            fill
            className="object-cover animate-subtle-zoom"
            priority
            placeholder="empty"
            style={{ willChange: 'transform' }}
          />
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <AnimatedSection className="max-w-4xl text-white">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent animate-text-shimmer hover:scale-105 transition-transform duration-300 inline-block">
                Advanced
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto] hover:scale-105 transition-transform duration-300 inline-block">
                Robotics
              </span>
              <br />
              <span className="text-4xl md:text-6xl text-gray-300 animate-fade-in-up hover:text-blue-300 transition-colors duration-300">Components</span>
            </h1>
            <p className="text-lg mb-8 text-gray-300 max-w-2xl leading-relaxed animate-fade-in-up">
              Premium quality components for your robotics projects. From basic parts to 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-bold animate-pulse hover:scale-105 transition-transform duration-300 inline-block"> advanced AI systems</span>.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up">
              <Link 
                href="/products" 
                className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/60 hover:scale-105 transition-all duration-500 border border-blue-400/50 overflow-hidden transform hover:-translate-y-1 hover:rotate-1 text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></span>
                <span className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></span>
                <span className="relative flex items-center gap-2 text-base">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Shop Now
                </span>
              </Link>
              
              <Link 
                href="/contact" 
                className="group bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-2xl font-bold border-2 border-white/30 hover:bg-white/20 hover:border-blue-400/60 hover:scale-105 transition-all duration-500 shadow-2xl transform hover:-translate-y-1 hover:rotate-1 text-base"
              >
                <span className="flex items-center gap-2 text-base">
                  <svg className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </span>
              </Link>
              
              <Link
                href="/signin"
                className="group relative bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-pink-500/60 hover:scale-105 transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:rotate-1 text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute -top-2 -left-2 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></span>
                <span className="relative flex items-center gap-2 text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                  </svg>
                  Sign In
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/80 animate-bounce-slow">
            <span className="text-sm mb-3 font-medium hover:text-blue-300 transition-colors duration-300">Scroll to explore</span>
            <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center hover:border-blue-400/60 transition-colors duration-300">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-indicator hover:bg-blue-400 transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories with Enhanced Design */}
      <section className="py-40 bg-gradient-to-b from-black via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1)_0%,transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.1)_0%,transparent_50%)] animate-pulse delay-1000"></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 border-2 border-purple-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rotate-45 animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <div className="mb-8">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 text-sm font-bold border border-blue-500/30 backdrop-blur-sm animate-glow">
                <span className="mr-2">⚡</span>
                Explore Our Range
              </span>
            </div>
            <h2 className="text-7xl font-black text-white mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Component Categories
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive collection of cutting-edge robotics components
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Motors & Actuators', image: '/categories/motors.jpg', description: 'High-performance motors for precise control', icon: '⚡', color: 'from-orange-500/20 to-red-500/20' },
              { name: 'Sensors & Vision', image: '/categories/sensors.jpg', description: 'Advanced sensing solutions', icon: '👁️', color: 'from-green-500/20 to-emerald-500/20' },
              { name: 'Controllers & Boards', image: '/categories/controllers.jpg', description: 'Powerful control systems', icon: '🧠', color: 'from-blue-500/20 to-cyan-500/20' },
              { name: 'Power & Batteries', image: '/categories/batteries.jpg', description: 'Reliable power sources', icon: '🔋', color: 'from-yellow-500/20 to-orange-500/20' },
              { name: 'Wheels & Chassis', image: '/categories/wheels.jpg', description: 'Robust wheels and chassis', icon: '🛞', color: 'from-gray-500/20 to-slate-500/20' },
              { name: 'Wireless & IoT', image: '/categories/wireless.jpg', description: 'Connectivity modules', icon: '📡', color: 'from-purple-500/20 to-indigo-500/20' },
              { name: 'Tools & Accessories', image: '/categories/tools.jpg', description: 'Essential tools and add-ons', icon: '🔧', color: 'from-teal-500/20 to-cyan-500/20' },
              { name: 'AI & Machine Learning', image: '/categories/ai.jpg', description: 'Smart AI modules', icon: '🤖', color: 'from-pink-500/20 to-rose-500/20' },
            ].map((category, index) => (
              <AnimatedSection key={category.name} delay={index * 0.01} className="group relative h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 cursor-pointer transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20`}></div>
                <div className="absolute inset-0 bg-gray-800">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-1000 filter group-hover:brightness-110"
                  />
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-25">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute inset-0 p-8 z-30 flex flex-col justify-between">
                  <div className="text-right">
                    <span className="text-5xl opacity-90 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block filter drop-shadow-lg">
                      {category.icon}
                    </span>
                  </div>
                  <div className="text-white transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                    <h3 className="text-2xl font-black mb-3 group-hover:text-blue-300 transition-colors">{category.name}</h3>
                    <p className="text-gray-200 mb-4 text-sm leading-relaxed opacity-90">{category.description}</p>
                    <Link 
                      href={`/category/${category.name.toLowerCase().replace(' & ', '-')}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-bold text-sm group-hover:translate-x-2 duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                    >
                      Explore Collection
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Modern Cards */}
      <section className="py-40 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.1)_0deg,transparent_60deg,rgba(147,51,234,0.1)_120deg,transparent_180deg)] animate-spin-very-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <div className="mb-8">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full text-green-300 text-sm font-bold border border-green-500/30 backdrop-blur-sm animate-glow">
                <span className="mr-2">🏆</span>
                Best Sellers
              </span>
            </div>
            <h2 className="text-7xl font-black text-white mb-8">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Featured Products
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our most popular and highly-rated robotics components
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { name: 'Arduino Mega 2560', price: '$45.99', category: 'Controllers', image: '/products/arduino.jpg', rating: 4.8, badge: 'Popular', badgeColor: 'bg-blue-500' },
              { name: 'Raspberry Pi 4 Model B', price: '$89.99', category: 'Controllers', image: '/products/raspberry.jpg', rating: 4.9, badge: 'New', badgeColor: 'bg-green-500' },
              { name: 'NEMA 17 Stepper Motor', price: '$24.99', category: 'Motors', image: '/products/motor.jpg', rating: 4.7, badge: 'Sale', badgeColor: 'bg-red-500' },
              { name: 'LiDAR Sensor Module', price: '$199.99', category: 'Sensors', image: '/products/lidar.jpg', rating: 4.9, badge: 'Pro', badgeColor: 'bg-purple-500' }
            ].map((product, index) => (
              <AnimatedSection key={product.name} delay={index * 0.01}>
                <ProductCard {...product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Banner Section */}
      <section className="py-40 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)] animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <AnimatedSection className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-purple-900/95 z-10"></div>
            <div className="absolute inset-0 bg-[url('/banner-robotics.jpg')] bg-cover bg-center"></div>
            
            {/* Enhanced Animated Elements */}
            <div className="absolute inset-0 z-20">
              <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
              <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float-delayed"></div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 border-2 border-white/20 rounded-full animate-spin-slow"></div>
              
              {/* Particle System */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-300/40 rounded-full animate-particle"
                  suppressHydrationWarning
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative z-30 h-full flex items-center">
              <div className="max-w-4xl text-white p-16">
                <div className="mb-8">
                  <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full text-blue-200 text-sm font-bold border border-white/30 animate-glow">
                    <span className="mr-2">🛠️</span>
                    Expert Assistance
                  </span>
                </div>
                <h2 className="text-7xl font-black mb-10 leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent animate-text-shimmer">
                    Technical Support
                  </span>
                  <br />
                  <span className="text-5xl text-blue-200 animate-fade-in-up">& Engineering Help</span>
                </h2>
                <p className="text-2xl mb-12 text-blue-100 leading-relaxed max-w-3xl">
                  Need help with your robotics project? Our technical experts and engineers are here to assist you with design, implementation, and troubleshooting.
                </p>
                <div className="flex flex-wrap gap-8">
                  <Link 
                    href="/support"
                    className="group bg-white text-blue-900 px-12 py-6 rounded-3xl font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-4 transform hover:scale-110 hover:-translate-y-1 shadow-2xl duration-500"
                  >
                    <svg className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Get Support
                  </Link>
                  <Link 
                    href="/consultation"
                    className="group bg-white/20 backdrop-blur-xl text-white px-12 py-6 rounded-3xl font-bold border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all inline-flex items-center gap-4 transform hover:scale-110 hover:-translate-y-1 duration-500"
                  >
                    <svg className="w-7 h-7 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-40 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Complex Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(147,51,234,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:100px_100px] animate-grid-move"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="max-w-5xl mx-auto text-center">
            <div className="mb-10">
              <span className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 font-bold border border-blue-500/30 backdrop-blur-lg shadow-2xl animate-glow text-lg">
                <span className="mr-3">📬</span>
                Stay Connected
              </span>
            </div>
            <h2 className="text-8xl font-black mb-10">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Never Miss
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                an Update
              </span>
            </h2>
            <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Subscribe to our newsletter for the latest products, technical articles, and exclusive robotics insights delivered directly to your inbox
            </p>
            
            {/* Enhanced Newsletter Form */}
            <div className="relative max-w-3xl mx-auto mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-3xl blur opacity-75 animate-pulse"></div>
              <form className="relative flex flex-col sm:flex-row gap-0 bg-white/10 backdrop-blur-xl rounded-3xl p-3 border border-white/20">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-8 py-6 rounded-2xl text-white bg-transparent font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-gray-400 border-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center gap-3 group duration-500"
                >
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Subscribe Now
                </button>
              </form>
            </div>
            
            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-black text-blue-400 mb-2">25,000+</div>
                <div className="text-gray-400 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-400 mb-2">98%</div>
                <div className="text-gray-400 text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-400 mb-2">Weekly</div>
                <div className="text-gray-400 text-sm">Updates</div>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm">
              <span className="text-green-400">✓</span> No spam, ever • <span className="text-green-400">✓</span> Unsubscribe anytime • <span className="text-green-400">✓</span> Premium content included
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom CSS for Enhanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes particle {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-very-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        .animate-float { animation: float 2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-float-delayed { animation: float-delayed 3s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-float-slow { animation: float-slow 4s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-gradient-x { animation: gradient-x 1s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-text-shimmer { animation: text-shimmer 1s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-grid-move { animation: grid-move 5s linear infinite; }
        .animate-particle { animation: particle 2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-bounce-slow { animation: bounce-slow 1s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-scroll-indicator { animation: scroll-indicator 1s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-spin-very-slow { animation: spin-very-slow 8s linear infinite; }
        .animate-glow { animation: glow 1s cubic-bezier(0.4,0,0.2,1) infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.4,0,0.2,1); }
        .animate-subtle-zoom { animation: subtle-zoom 5s cubic-bezier(0.4,0,0.2,1) infinite alternate; }
      `}</style>
    </main>
  );
}