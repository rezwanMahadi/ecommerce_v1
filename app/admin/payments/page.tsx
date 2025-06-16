"use client";

import { useState } from 'react';
import { Search, Filter, Download, CreditCard, PlusCircle, ChevronDown, MoreHorizontal, Calendar, DollarSign } from 'lucide-react';

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [timeRange, setTimeRange] = useState('30days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample transactions data - in a real app, fetch from API
  const transactions = [
    {
      id: 'TXN-8765',
      date: '2023-06-15',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 149.99,
      paymentMethod: 'Credit Card',
      status: 'completed'
    },
    {
      id: 'TXN-8764',
      date: '2023-06-14',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 89.99,
      paymentMethod: 'PayPal',
      status: 'completed'
    },
    {
      id: 'TXN-8763',
      date: '2023-06-13',
      customer: 'Robert Johnson',
      email: 'robert@example.com',
      amount: 199.99,
      paymentMethod: 'Credit Card',
      status: 'refunded'
    },
    {
      id: 'TXN-8762',
      date: '2023-06-12',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: 35.50,
      paymentMethod: 'Credit Card',
      status: 'completed'
    },
    {
      id: 'TXN-8761',
      date: '2023-06-11',
      customer: 'Mike Brown',
      email: 'mike@example.com',
      amount: 149.99,
      paymentMethod: 'PayPal',
      status: 'failed'
    },
  ];

  // Sample payment methods - in a real app, fetch from API
  const paymentMethods = [
    {
      id: 1,
      name: 'Credit Card Payments',
      provider: 'Stripe',
      status: 'active',
      fee: '2.9% + $0.30',
      lastUpdated: '2023-05-20'
    },
    {
      id: 2,
      name: 'PayPal',
      provider: 'PayPal',
      status: 'active',
      fee: '3.5% + $0.50',
      lastUpdated: '2023-05-18'
    },
    {
      id: 3,
      name: 'Bank Transfer',
      provider: 'Manual',
      status: 'inactive',
      fee: 'No fees',
      lastUpdated: '2023-04-10'
    },
  ];

  // Filter transactions based on status
  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProviderLogo = (provider) => {
    switch(provider.toLowerCase()) {
      case 'stripe':
        return (
          <div className="bg-purple-100 text-purple-600 rounded-md p-1 flex items-center justify-center w-8 h-8">
            <span className="font-semibold text-xs">S</span>
          </div>
        );
      case 'paypal':
        return (
          <div className="bg-blue-100 text-blue-600 rounded-md p-1 flex items-center justify-center w-8 h-8">
            <span className="font-semibold text-xs">P</span>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-600 rounded-md p-1 flex items-center justify-center w-8 h-8">
            <span className="font-semibold text-xs">M</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your transactions and payment methods.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'transactions' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('paymentMethods')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'paymentMethods' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Payment Methods
          </button>
        </div>
      </div>
      
      {activeTab === 'transactions' && (
        <>
          {/* Transactions Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search transactions..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="refunded">Refunded</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="relative">
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {timeRange === '7days' ? 'Last 7 days' : timeRange === '30days' ? 'Last 30 days' : 'Last 90 days'}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button 
                          onClick={() => { setTimeRange('7days'); setIsDropdownOpen(false); }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Last 7 days
                        </button>
                        <button 
                          onClick={() => { setTimeRange('30days'); setIsDropdownOpen(false); }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Last 30 days
                        </button>
                        <button 
                          onClick={() => { setTimeRange('90days'); setIsDropdownOpen(false); }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Last 90 days
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
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                        <div className="text-sm text-gray-500">{transaction.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
                    <span className="font-medium">{filteredTransactions.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">1</a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'paymentMethods' && (
        <>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {getProviderLogo(method.provider)}
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{method.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">Provider: {method.provider}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">Fee: {method.fee}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      method.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {method.status.charAt(0).toUpperCase() + method.status.slice(1)}
                    </span>
                    <div className="flex items-center">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Configure
                      </button>
                      <button className="ml-4 p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900">Payment Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Total Revenue</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">$1,250.75</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CreditCard className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Transactions</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">53</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Filter className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Average Order</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">$23.60</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
