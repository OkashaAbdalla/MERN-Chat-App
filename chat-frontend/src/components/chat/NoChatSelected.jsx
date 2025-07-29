import { MessageSquare, Search, Users } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-16 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome to HackChat</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start chatting by searching for users in the sidebar
          </p>
          
          {/* Instructions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Search for users</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Type a username to find people</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Start a conversation</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Click on a user to begin chatting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-200 dark:bg-blue-700 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;