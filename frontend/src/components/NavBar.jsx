import { MessageCircleCodeIcon, Settings } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthHook from "../hooks/useAuthhooks"; 

function NavBar({ authUser }) {
  const { signOut } = useAuthHook(); 
  const navigate = useNavigate(); 

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin"); 
  };

  return (
    <div className="mb-2 border-b border-gray-800 shadow-sm p-6 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left container */}
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <MessageCircleCodeIcon className="text-blue-600" />
          <h2>HackChat</h2>
        </div>

        {/* Right container */}
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 rounded bg-blue-700 flex items-center space-x-1">
            <Settings className="size-5" />
            <span>Settings</span>
          </button>

          {authUser && (
            <div className="space-x-2">
              <button className="px-4 py-2 rounded bg-blue-700">Profile</button>
              <button
                className="px-4 py-2 rounded bg-blue-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
