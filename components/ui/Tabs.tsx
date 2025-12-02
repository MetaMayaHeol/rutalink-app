'use client'

import { ReactNode, useState } from 'react'

type TabsProps = {
  defaultValue: string
  children: ReactNode
}

type TabsListProps = {
  children: ReactNode
}

type TabsTriggerProps = {
  value: string
  children: ReactNode
}

type TabsContentProps = {
  value: string
  children: ReactNode
}

const TabsContext = React.createContext<{
  activeTab: string
  setActiveTab: (value: string) => void
}>({
  activeTab: '',
  setActiveTab: () => {},
})

import React from 'react'

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
        isActive
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext)

  if (activeTab !== value) {
    return null
  }

  return <div>{children}</div>
}
