import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { Send, Image, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const { selectedUser, sendMessage } = useChatStore();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    setIsLoading(true);
    try {
      const messageData = {
        text: message.trim(),
        imageUrl: selectedFile ? selectedFile : null,
      };

      await sendMessage(messageData);
      setMessage('');
      setSelectedFile(null);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmojiSelect = (emoji) => {
    console.log('Emoji selected:', emoji);
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newText = message.slice(0, start) + emoji + message.slice(end);
      setMessage(newText);
      
      // Maintain cursor position after emoji insertion
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    console.log('Toggle emoji picker, selectedUser:', selectedUser);
    if (selectedUser) {
      setShowEmojiPicker(!showEmojiPicker);
      console.log('Emoji picker state:', !showEmojiPicker);
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const isDisabled = !selectedUser || isLoading || (!message.trim() && !selectedFile);

  // Simple emoji list for testing
  const commonEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 relative">
      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mb-3 relative">
          <img
            src={selectedFile}
            alt="Selected file"
            className="max-w-xs max-h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <button
            onClick={removeSelectedFile}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* File Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={!selectedUser}
          className={`p-2.5 rounded-lg transition-colors ${
            selectedUser
              ? 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          title="Attach image"
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={selectedUser ? "Type a message..." : "Select a user to start chatting"}
            disabled={!selectedUser}
            className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
              selectedUser
                ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            onClick={toggleEmojiPicker}
            disabled={!selectedUser}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded transition-colors ${
              selectedUser
                ? 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Add emoji"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`p-3 rounded-lg transition-colors ${
            isDisabled
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Simple Emoji Picker */}
      {showEmojiPicker && selectedUser && (
        <div 
          ref={emojiPickerRef}
          className="absolute bottom-20 left-4 z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg p-4"
          style={{ width: '300px', maxHeight: '200px', overflowY: 'auto' }}
        >
          <div className="grid grid-cols-8 gap-2">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="w-8 h-8 text-xl hover:bg-gray-100 rounded flex items-center justify-center transition-colors"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Debug info */}
      {showEmojiPicker && (
        <div className="absolute top-0 left-0 bg-red-500 text-white p-1 text-xs z-[10000]">
          Emoji picker is visible - {showEmojiPicker ? 'SHOWING' : 'HIDDEN'}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
