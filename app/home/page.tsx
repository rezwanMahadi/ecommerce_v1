"use client";

import { useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Products Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Arduino Mega 2560', price: '$45.99', category: 'Controllers', image: '/products/product-1.jpg', rating: 4.8, badge: 'Popular', badgeColor: 'bg-blue-500' },
              { name: 'Raspberry Pi 4 Model B', price: '$89.99', category: 'Controllers', image: '/products/product-2.jpg', rating: 4.9, badge: 'New', badgeColor: 'bg-green-500' },
              { name: 'NEMA 17 Stepper Motor', price: '$24.99', category: 'Motors', image: '/products/product-3.jpg', rating: 4.7, badge: 'Sale', badgeColor: 'bg-red-500' }
            ].map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </section>

        {/* Best Selling Products Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'LiDAR Sensor Module', price: '$199.99', category: 'Sensors', image: '/products/best-1.jpg', rating: 4.9, badge: 'Pro', badgeColor: 'bg-purple-500' },
              { name: 'ESP32 Development Board', price: '$29.99', category: 'Controllers', image: '/products/best-2.jpg', rating: 4.8, badge: 'Popular', badgeColor: 'bg-blue-500' },
              { name: 'DC Motor Driver', price: '$15.99', category: 'Motors', image: '/products/best-3.jpg', rating: 4.7, badge: 'Sale', badgeColor: 'bg-red-500' },
              { name: 'OLED Display', price: '$12.99', category: 'Displays', image: '/products/best-4.jpg', rating: 4.6, badge: 'New', badgeColor: 'bg-green-500' }
            ].map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </section>

        {/* Tutorials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={`/tutorials/tutorial-${item}.jpg`}
                    alt={`Tutorial ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">Tutorial Title {item}</h3>
                  <p className="text-gray-600 mt-2">
                    Detailed description of the tutorial and what users will learn from it.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Duration: 45 mins</span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Ideas Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/projects/project-${item}.jpg`}
                    alt={`Project Idea ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">Project Idea {item}</h3>
                  <p className="text-gray-600 mt-2">
                    Brief description of the project idea and its potential applications.
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      Beginner
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      2 weeks
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
} 