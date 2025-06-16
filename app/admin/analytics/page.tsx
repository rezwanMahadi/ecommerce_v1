"use client";

import { useState } from 'react';
import { Calendar, ChevronDown, Download, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Eye } from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Sample data - In a real app, fetch from API
  const performanceData = {
    totalRevenue: 24680,
    percentChange: 12.5,
    totalOrders: 356,
    ordersChange: 8.2,
    totalUsers: 1450,
    usersChange: 15.8,
    viewsToday: 980,
    viewsChange: 7.3
  };

  const salesByCategory = [
    { name: 'Electronics', value: 42 },
    { name: 'Clothing', value: 28 },
    { name: 'Home & Kitchen', value: 18 },
    { name: 'Books', value: 12 }
  ];

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', sold: 128, revenue: 12800, trend: 'up' },
    { id: 2, name: 'Smartphone Case', sold: 95, revenue: 1900, trend: 'up' },
    { id: 3, name: 'Laptop Stand', sold: 82, revenue: 4100, trend: 'down' },
    { id: 4, name: 'Bluetooth Speaker', sold: 75, revenue: 9375, trend: 'up' },
    { id: 5, name: 'USB-C Cable Pack', sold: 68, revenue: 1020, trend: 'down' }
  ];
  
  const recentTransactions = [
    { id: 'TX-1234', customer: 'John D.', date: '15 min ago', amount: 199.99, status: 'completed' },
    { id: 'TX-1233', customer: 'Sarah W.', date: '45 min ago', amount: 85.50, status: 'pending' },
    { id: 'TX-1232', customer: 'Michael B.', date: '2 hours ago', amount: 149.99, status: 'completed' },
    { id: 'TX-1231', customer: 'Jessica T.', date: '3 hours ago', amount: 299.99, status: 'completed' },
  ];

  // Render chart placeholder (in a real app, use a charting library like Chart.js, D3, or Recharts)
  const renderChartPlaceholder = (title, height = 'h-64') => (
    <div className={`${height} bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center p-6`}>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-xs text-gray-400 mt-1">Chart visualization would render here</div>
      </div>
    </div>
  );

  const getBadgeClass = (trend) => {
    return trend === 'up' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {timeRange === 'week' ? 'Last 7 days' : timeRange === 'month' ? 'Last 30 days' : 'Last 12 months'}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button 
                    onClick={() => { setTimeRange('week'); setIsDropdownOpen(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Last 7 days
                  </button>
                  <button 
                    onClick={() => { setTimeRange('month'); setIsDropdownOpen(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Last 30 days
                  </button>
                  <button 
                    onClick={() => { setTimeRange('year'); setIsDropdownOpen(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Last 12 months
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${performanceData.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className={`text-xs px-2 py-1 rounded-full flex items-center ${performanceData.percentChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {performanceData.percentChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  <span>{Math.abs(performanceData.percentChange)}%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">vs last {timeRange}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.totalOrders}</p>
              <div className="flex items-center mt-2">
                <div className={`text-xs px-2 py-1 rounded-full flex items-center ${performanceData.ordersChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {performanceData.ordersChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  <span>{Math.abs(performanceData.ordersChange)}%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">vs last {timeRange}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className={`text-xs px-2 py-1 rounded-full flex items-center ${performanceData.usersChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {performanceData.usersChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  <span>{Math.abs(performanceData.usersChange)}%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">vs last {timeRange}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Views Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.viewsToday.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className={`text-xs px-2 py-1 rounded-full flex items-center ${performanceData.viewsChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {performanceData.viewsChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  <span>{Math.abs(performanceData.viewsChange)}%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">vs yesterday</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium text-gray-900">Revenue Over Time</h3>
          </div>
          <div className="p-6">
            {renderChartPlaceholder('Revenue trend chart', 'h-80')}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium text-gray-900">Sales by Category</h3>
          </div>
          <div className="p-6">
            {renderChartPlaceholder('Pie/Donut chart', 'h-80')}
          </div>
          <div className="px-6 py-4 border-t">
            <ul className="divide-y divide-gray-100">
              {salesByCategory.map((category, index) => (
                <li key={index} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Top Products & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium text-gray-900">Top Selling Products</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {topProducts.map((product) => (
              <div key={product.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.sold} sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass(product.trend)}`}>
                      {product.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium text-gray-900">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500">{transaction.customer}</p>
                    <span className="mx-1 text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${transaction.amount}</p>
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t">
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View all transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
