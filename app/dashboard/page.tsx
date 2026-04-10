'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardStats, Activity } from '@/types';
import { CATEGORY_COLORS, ACTIVITY_ICONS } from '@/utils/constants';
import { getRelativeTime } from '@/utils/helpers';
import { useContacts } from '@/hooks/useContacts';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Loading from '@/components/ui/Loading';

export default function DashboardPage() {
  const { contacts, getStats } = useContacts();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  
  const contactStats = getStats();
  
  useEffect(() => {
    // Simulate loading and generate mock activities
    setTimeout(() => {
      // Generate recent activities from contacts
      const recentActivities: Activity[] = contacts
        .slice(-5)
        .map((contact, index) => ({
          id: `activity_${index}`,
          type: 'added' as const,
          contactName: contact.name,
          timestamp: new Date(contact.createdAt)
        }))
        .reverse();
      
      setActivities(recentActivities);
      setLoading(false);
    }, 500);
  }, [contacts]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading dashboard..." />
      </div>
    );
  }
  
  // Calculate additional stats
  const recentContacts = contacts.filter(c => {
    const createdDate = new Date(c.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate > weekAgo;
  }).length;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your contacts.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Contacts"
            value={contactStats.total}
            icon={<Icon name="add" />}
            color="blue"
            link="/contacts"
            linkText="View all contacts"
          />
          
          <StatsCard
            title="Favorites"
            value={contactStats.favorites}
            icon={<Icon name="star" />}
            color="yellow"
            percentage={contactStats.total > 0 
              ? Math.round((contactStats.favorites / contactStats.total) * 100)
              : 0
            }
          />
          
          <StatsCard
            title="Added This Week"
            value={recentContacts}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="green"
            trend="+15%"
          />
          
          <QuickActionsCard />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories Breakdown */}
          <CategoriesBreakdown 
            contactsByCategory={contactStats.byCategory} 
            totalContacts={contactStats.total} 
          />
          
          {/* Recent Activity */}
          <RecentActivity activities={activities} />
        </div>
        
        {/* Quick Stats Banner */}
        <QuickStatsBanner contacts={contacts} />
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ 
  title, 
  value, 
  icon, 
  color, 
  link, 
  linkText, 
  percentage, 
  trend 
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  link?: string;
  linkText?: string;
  percentage?: number;
  trend?: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
  };
  
  return (
    <Card hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        {link && linkText ? (
          <Link href={link} className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            {linkText} →
          </Link>
        ) : percentage !== undefined ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {percentage}% of total
          </p>
        ) : trend ? (
          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
            {trend} from last week
          </p>
        ) : null}
      </div>
    </Card>
  );
}

// Quick Actions Card
function QuickActionsCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Link 
          href="/search" 
          className="block w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center hover:bg-white/30 transition-colors"
        >
          Add Contact
        </Link>
        <Link 
          href="/import" 
          className="block w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center hover:bg-white/30 transition-colors"
        >
          Import Contacts
        </Link>
      </div>
    </Card>
  );
}

// Categories Breakdown Component
function CategoriesBreakdown({ 
  contactsByCategory, 
  totalContacts 
}: { 
  contactsByCategory: Record<string, number>;
  totalContacts: number;
}) {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Contacts by Category
      </h2>
      <div className="space-y-4">
        {Object.entries(contactsByCategory).map(([category, count]) => {
          const percentage = totalContacts > 0 
            ? Math.round((count / totalContacts) * 100) 
            : 0;
          
          return (
            <div key={category} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 capitalize font-medium">
                  {category}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {count} contacts
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]} h-3 rounded-full transition-all duration-500 relative`}
                  style={{ width: `${percentage}%` }}
                >
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-white font-semibold">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        {Object.keys(contactsByCategory).length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No contacts yet
          </p>
        )}
      </div>
    </Card>
  );
}

// Recent Activity Component
function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const activityConfig = ACTIVITY_ICONS[activity.type];
          
          return (
            <div 
              key={activity.id} 
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0">
                <svg 
                  className={`w-5 h-5 ${activityConfig.color}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={activityConfig.path} 
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.contactName}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    was {activity.type === 'added' ? 'added to' : 'updated in'} contacts
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        
        {activities.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No recent activity
          </p>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          href="/activity" 
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          View all activity →
        </Link>
      </div>
    </Card>
  );
}

// Quick Stats Banner
function QuickStatsBanner({ contacts }: { contacts: any[] }) {
  // Calculate average contacts per day
  const oldestContact = contacts.sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )[0];
  
  const daysSinceFirst = oldestContact 
    ? Math.ceil((Date.now() - new Date(oldestContact.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
  const avgPerDay = daysSinceFirst > 0 
    ? (contacts.length / daysSinceFirst).toFixed(1)
    : '0';
  
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-blue-100 mt-1">Profile Completion</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{avgPerDay}</p>
          <p className="text-blue-100 mt-1">Contacts Added Daily</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{daysSinceFirst}</p>
          <p className="text-blue-100 mt-1">Days Active</p>
        </div>
      </div>
    </div>
  );
}