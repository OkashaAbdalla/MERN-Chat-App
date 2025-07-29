import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const useChatStore = create((set, get) => ({
  // State
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  searchResults: [],
  isSearching: false,

  // Actions
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get('/auth/users');
      const { selectedUser } = get();
      
      // Update users while preserving selectedUser if it still exists
      const updatedUsers = res.data.users;
      
      // If we have a selectedUser, find the updated version in the new users list
      let updatedSelectedUser = selectedUser;
      if (selectedUser) {
        const foundUser = updatedUsers.find(user => user._id === selectedUser._id);
        if (foundUser) {
          // Keep the same object reference if it's the same user
          updatedSelectedUser = foundUser;
        } else {
          // If the selected user is no longer in the list, clear the selection
          updatedSelectedUser = null;
        }
      }
      
      set({ 
        users: updatedUsers,
        selectedUser: updatedSelectedUser
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load users');
    } finally {
      set({ isUsersLoading: false });
    }
  },

  searchUsers: async (query) => {
    if (!query || query.trim().length < 2) {
      set({ searchResults: [] });
      return;
    }

    set({ isSearching: true });
    try {
      const res = await api.get(`/auth/search-users?query=${encodeURIComponent(query)}`);
      set({ searchResults: res.data.users });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to search users');
      set({ searchResults: [] });
    } finally {
      set({ isSearching: false });
    }
  },

  clearSearchResults: () => {
    set({ searchResults: [] });
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/messages/${userId}`);
      set({ messages: res.data.data.messages });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load messages');
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    
    if (!selectedUser) {
      toast.error('No user selected');
      return;
    }
    
    try {
      const res = await api.post('/messages/send', {
        ...messageData,
        receiverId: selectedUser._id,
      });
      
      set({ messages: [...messages, res.data.data] });
      
      // Don't refresh users list after sending a message to avoid clearing selectedUser
      // get().getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  },

  setSelectedUser: (selectedUser) => {
    // Set the selected user first
    set({ 
      selectedUser,
      isMessagesLoading: false 
    });
    
    // Clear messages when switching to a different user
    if (selectedUser) {
      set({ messages: [] });
    }
  },

  // Socket.io methods (will be implemented later)
  subscribeToMessages: () => {
    // Will implement with Socket.io
  },

  unsubscribeFromMessages: () => {
    // Will implement with Socket.io
  },
}));