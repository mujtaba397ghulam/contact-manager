'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500K+', label: 'Contacts Managed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.8', label: 'User Rating' },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We constantly evolve to meet the changing needs of modern professionals'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trust & Security',
      description: 'Your data security is our top priority with enterprise-grade protection'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Simplicity',
      description: 'Complex features made simple through intuitive design and user experience'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Excellence',
      description: 'We strive for perfection in every feature and interaction'
    }
  ];

  const timeline = [
    { year: '2024', event: 'Company Founded', description: 'Started with a vision to revolutionize contact management' },
    { year: '2024', event: 'First Milestone', description: 'Reached our first thousand users' },
    { year: '2024', event: 'Platform Enhancement', description: 'Launched advanced search and analytics features' },
    { year: '2025', event: 'Enterprise Ready', description: 'Expanded to serve enterprise customers' }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Contact Manager Pro
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Empowering professionals to build and maintain meaningful connections
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To provide professionals with the most efficient and intuitive contact management solution that enhances productivity and strengthens business relationships.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe that managing contacts should be effortless, allowing you to focus on what truly matters - building meaningful connections.
              </p>
            </Card>
            
            <Card>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To become the global standard for professional contact management, trusted by millions of users worldwide.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We envision a world where every professional has the tools they need to nurture their network effectively.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1.5"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.event}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">Leadership Team</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Our team consists of industry veterans with decades of combined experience in software development and business management.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', role: 'Chief Executive Officer', expertise: 'Business Strategy' },
              { name: 'Sarah Johnson', role: 'Chief Technology Officer', expertise: 'Software Architecture' },
              { name: 'Michael Chen', role: 'Chief Design Officer', expertise: 'User Experience' }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.expertise}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Contact Management?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of professionals who trust Contact Manager Pro</p>
          <Link 
            href="/search" 
            className="inline-block bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
