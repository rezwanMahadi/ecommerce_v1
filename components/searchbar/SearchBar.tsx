"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SuggestionItem {
  id: number;
  name: string;
  type: 'product' | 'tutorial' | 'project';
  category: string;
}

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Mock data for suggestions - replace with actual API calls
  const mockSuggestions = {
    products: [
      { id: 1, name: 'Arduino Mega 2560', type: 'product' as const, category: 'Controllers' },
      { id: 2, name: 'Raspberry Pi 4', type: 'product' as const, category: 'Controllers' },
      { id: 3, name: 'NEMA 17 Motor', type: 'product' as const, category: 'Motors' },
    ],
    tutorials: [
      { id: 1, name: 'Getting Started with Arduino', type: 'tutorial' as const, category: 'Beginner' },
      { id: 2, name: 'Raspberry Pi Setup Guide', type: 'tutorial' as const, category: 'Beginner' },
    ],
    projects: [
      { id: 1, name: 'Smart Home Automation', type: 'project' as const, category: 'IoT' },
      { id: 2, name: 'Robot Arm Project', type: 'project' as const, category: 'Robotics' },
    ],
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const filteredSuggestions = [
        ...mockSuggestions.products.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
        ...mockSuggestions.tutorials.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
        ...mockSuggestions.projects.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
      ]
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (item: SuggestionItem) => {
    setSearchQuery('')
    setShowSuggestions(false)
    // Navigate based on item type
    switch (item.type) {
      case 'product':
        router.push(`/products/${item.id}`)
        break
      case 'tutorial':
        router.push(`/tutorials/${item.id}`)
        break
      case 'project':
        router.push(`/projects/${item.id}`)
        break
    }
  }

  return (
    <div className={`relative w-full ${className}`} ref={searchRef}>
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search products, tutorials, projects..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {suggestions.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(item)}
            >
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  item.type === 'product' ? 'bg-blue-500' :
                  item.type === 'tutorial' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></span>
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 