"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  ShoppingBag,
  Package,
  Heart,
  User,
  Settings,
  LogOut,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Star,
  Plus,
  Minus,
  Trash2,
  Eye,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const CustomerDashboard = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          date: '2024-06-14',
          status: 'delivered',
          total: 299.99,
          items: [
            { id: '1', name: 'Wireless Headphones', quantity: 1, price: 199.99, image: '/api/placeholder/100/100' },
            { id: '2', name: 'Phone Case', quantity: 2, price: 50.00, image: '/api/placeholder/100/100' }
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          date: '2024-06-12',
          status: 'processing',
          total: 149.99,
          items: [
            { id: '3', name: 'Bluetooth Speaker', quantity: 1, price: 149.99, image: '/api/placeholder/100/100' }
          ]
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          date: '2024-06-10',
          status: 'shipped',
          total: 89.99,
          items: [
            { id: '4', name: 'USB Cable', quantity: 3, price: 29.99, image: '/api/placeholder/100/100' }
          ]
        }
      ]);

      setCartItems([
        { id: '1', name: 'Laptop Stand', price: 79.99, quantity: 1, image: '/api/placeholder/100/100' },
        { id: '2', name: 'Wireless Mouse', price: 49.99, quantity: 2, image: '/api/placeholder/100/100' },
        { id: '3', name: 'Keyboard', price: 129.99, quantity: 1, image: '/api/placeholder/100/100' }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  interface StatusIconProps {
    status: 'delivered' | 'shipped' | 'processing' | 'cancelled' | string;
  }

  const getStatusIcon = (status: StatusIconProps['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  interface StatusColorMapping {
    status: 'delivered' | 'shipped' | 'processing' | 'cancelled' | string;
  }

  const getStatusColor = (status: StatusColorMapping['status']): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  interface CartUpdateItem {
    id: string;
    quantity: number;
  }

  const updateCartQuantity = (id: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item: CartItem) => item.id !== id));
    } else {
      setCartItems(cartItems.map((item: CartItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  interface RemoveFromCartId {
    id: string;
  }

  const removeFromCart = (id: RemoveFromCartId['id']): void => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: ShoppingBag },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'cart', label: 'Shopping Cart', icon: ShoppingCart },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Customer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                      {item.id === 'cart' && cartItems.length > 0 && (
                        <span className="ml-auto bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Package className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Cart Items</p>
                        <p className="text-2xl font-bold text-gray-900">{cartItems.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="font-medium text-gray-900">{order.orderNumber}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(order.status)}
                            <div>
                              <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                              <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Total: ${order.total.toFixed(2)}</span>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Reorder
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                              Track Order
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cart' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
                </div>
                <div className="p-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                      <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
                      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-lg font-semibold text-indigo-600">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full border hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full border hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-semibold text-gray-900">
                            Total: ${getTotalCartValue().toFixed(2)}
                          </span>
                          <div className="space-x-3">
                            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Continue Shopping
                            </button>
                            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                              Proceed to Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save items you love for later</p>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Browse Products
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                </div>
                <div className="p-6">
                  <div className="max-w-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-indigo-600">
                            {session?.user?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{session?.user?.name}</h4>
                          <p className="text-gray-500">{session?.user?.email}</p>
                          <button className="mt-2 text-indigo-600 hover:text-indigo-800">
                            Change Profile Picture
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={session?.user?.name || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue={session?.user?.email || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Enter your address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                </div>
                <div className="p-6">
                  <div className="max-w-2xl space-y-8">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive order updates via email</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive order updates via SMS</p>
                          </div>
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Privacy</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Marketing Emails</p>
                            <p className="text-sm text-gray-500">Receive promotional offers</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Data Analytics</p>
                            <p className="text-sm text-gray-500">Help improve our service</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                          Change Password
                        </button>
                        <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                          Download Data
                        </button>
                        <button className="w-full text-left px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;