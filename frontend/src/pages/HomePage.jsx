import { Users } from 'lucide-react';
import React from 'react';
import Card from '../components/Card';

function HomePage() {
  return (
    <div className="h-screen w-full flex bg-black-600 text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-[25%] h-full border-r border-cyan-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-cyan-800">
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <h2 className="text-lg font-semibold">Contacts</h2>
          </div>
        </div>

        {/* Filter */}
        <div className="px-4 py-2 border-b border-cyan-800 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-cyan-600" />
            <span>Show online contacts only</span>
          </label>
        </div>

        {/* Scrollable Users List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 h-full bg-gray-400 flex items-center justify-center text-black text-2xl font-semibold">
        <p>Select a contact to start chatting</p>
      </div>
    </div>
  );
}

export default HomePage;
