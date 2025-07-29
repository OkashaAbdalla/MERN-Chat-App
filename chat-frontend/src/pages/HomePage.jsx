import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/chat/Sidebar';
import ChatContainer from '../components/chat/ChatContainer';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;