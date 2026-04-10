'use client';

import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: 'Personal Contact Management',
      description: 'Perfect for individuals who want to keep their personal contacts organized and accessible.',
      features: [
        'Unlimited contacts',
        'Easy search and filter',
        'Quick add and edit',
        'Mobile responsive'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Business Solutions',
      description: 'Designed for small to medium businesses needing efficient contact management.',
      features: [
        'Team collaboration',
        'Contact categorization',
        'Import/Export features',
        'Advanced search'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Enterprise Integration',
      description: 'Tailored solutions for enterprises with specific integration requirements.',
      features: [
        'API access',
        'Custom workflows',
        'Third-party integration',
        'Dedicated support'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    }
  ];

  const features = [
    {
      title: 'Lightning Fast',
      description: 'Experience instant loading and real-time updates with our optimized platform.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with industry-standard security measures.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Auto Sync',
      description: 'Keep your contacts synchronized across all your devices automatically.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Comprehensive contact management solutions for everyone</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 text-gray-700 dark:text-gray-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Basic</h3>
              <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Free</div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">For personal use</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="text-gray-600 dark:text-gray-400">Up to 100 contacts</li>
                <li className="text-gray-600 dark:text-gray-400">Basic search features</li>
                <li className="text-gray-600 dark:text-gray-400">Email support</li>
              </ul>
              <Link href="/search" className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Professional</h3>
              <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">$9<span className="text-lg">/month</span></div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">For professionals</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="text-gray-600 dark:text-gray-400">Unlimited contacts</li>
                <li className="text-gray-600 dark:text-gray-400">Advanced search & filters</li>
                <li className="text-gray-600 dark:text-gray-400">Priority support</li>
                <li className="text-gray-600 dark:text-gray-400">Import/Export features</li>
              </ul>
              <Link href="/search" className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Custom</div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">For teams & businesses</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="text-gray-600 dark:text-gray-400">Everything in Pro</li>
                <li className="text-gray-600 dark:text-gray-400">API access</li>
                <li className="text-gray-600 dark:text-gray-400">Custom integrations</li>
                <li className="text-gray-600 dark:text-gray-400">Dedicated support</li>
              </ul>
              <Link href="/contact" className="block w-full bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who trust Contact Manager for their contact management needs.</p>
          <Link href="/search" className="inline-block bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Managing Contacts
          </Link>
        </div>
      </section>
    </div>
  );
}
