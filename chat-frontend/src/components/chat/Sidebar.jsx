import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Search, Users, CheckSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, searchUsers, searchResults, isSearching, clearSearchResults } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchUsers(searchQuery);
    } else {
      clearSearchResults();
    }
  }, [searchQuery, searchUsers, clearSearchResults]);

  const handleUserSelect = (user) => {
    if (!selectedUser || selectedUser._id !== user._id) {
      setSelectedUser(user);
    }
  };

  const filteredUsers = searchResults.length > 0 
    ? searchResults 
    : showOnlineOnly 
      ? users.filter(user => onlineUsers.includes(user._id))
      : users;

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center shadow-sm">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Conversations</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search all users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Online Filter */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <CheckSquare 
            className={`w-4 h-4 ${showOnlineOnly ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Show online only ({onlineUsers.length} online)
          </span>
        </label>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Recent Chats
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Showing users you've chatted with
          </p>
          
          <div className="space-y-2">
            {filteredUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUser?._id === user._id;
              
              return (
                <div
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={user.avatar || '/avatar.png'}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {user.username}
                      </h3>
                      <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No users found' : 'No users available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;