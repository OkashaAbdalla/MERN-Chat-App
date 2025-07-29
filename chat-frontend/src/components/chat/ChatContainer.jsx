import { useChatStore } from '../../store/useChatStore';
import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../../store/useAuthStore';
import { formatMessageTime } from '../../lib/utils';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Always render the header */}
      <ChatHeader />

      {!selectedUser ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-lg font-medium mb-2">Welcome to ChatApp</p>
            <p className="text-sm">Select a user from the sidebar to start chatting</p>
          </div>
        </div>
      ) : (
        <>
          {isMessagesLoading ? (
            <MessageSkeleton />
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages && messages.length > 0 ? (
                messages.map((message) => {
                  // Properly compare ObjectIds by converting to strings
                  const isSent = message.senderId._id === authUser?._id || message.senderId === authUser?._id;
                  return (
                    <div
                      key={message._id}
                      className={`flex w-full ${isSent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex gap-3 max-w-xs lg:max-w-md ${isSent ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm overflow-hidden flex-shrink-0">
                          <img
                            src={
                              isSent
                                ? authUser?.avatar || '/avatar.png'
                                : selectedUser?.avatar || '/avatar.png'
                            }
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Message Content */}
                        <div
                          className={`flex flex-col ${isSent ? 'items-end' : 'items-start'}`}
                        >
                          {/* Time */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {formatMessageTime(message.createdAt)}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`rounded-2xl px-4 py-2 max-w-xs lg:max-w-md shadow-sm ${
                              isSent
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            {message.imageUrl && (
                              <img
                                src={message.imageUrl}
                                alt="Attachment"
                                className="max-w-full rounded-lg mb-2"
                              />
                            )}
                            {message.text && <p className="text-sm">{message.text}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg">💭</span>
                    </div>
                    <p className="text-lg font-medium mb-2">No messages yet</p>
                    <p className="text-sm">Start a conversation with {selectedUser.username}</p>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
          )}

          <MessageInput />
        </>
      )}
    </div>
  );
};

// Message skeleton loader
const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div
            className={`flex gap-3 max-w-xs lg:max-w-md ${
              i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex flex-col">
              <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div
                className={`w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse ${
                  i % 2 === 0 ? '' : 'ml-auto'
                }`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;