import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { X, Phone, Video, MoreVertical } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Always render the header, even if no user is selected
  if (!selectedUser) {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-white dark:bg-gray-800 min-h-[72px]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">👤</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600 dark:text-gray-300">Select a user to chat</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose from the sidebar</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-50" disabled>
            <Phone className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-50" disabled>
            <Video className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-50" disabled>
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    );
  }

  const isOnline = selectedUser._id && onlineUsers.includes(selectedUser._id);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-white dark:bg-gray-800 min-h-[72px] shadow-sm">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser.avatar || '/avatar.png'}
            alt={selectedUser.username || 'User'}
            className="w-10 h-10 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-sm"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm" />
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base">
            {selectedUser.username || 'User'}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isOnline ? 'Online' : 'Offline'}
            </p>
            {isOnline && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                • Active now
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <button
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          title="Voice Call"
        >
          <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </button>
        <button
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          title="Video Call"
        >
          <Video className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </button>
        <button
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          title="More Options"
        >
          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" />
        </button>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden group"
          title="Close Chat"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;