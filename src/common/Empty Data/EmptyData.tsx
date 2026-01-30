import React from "react";
import { Inbox, FileX, Search, Database } from "lucide-react";

export const EmptyData: React.FC = () => {
  return (
    <div className="relative w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center bg-componentsBackground rounded-2xl  shadow-xl shadow-gray-100/20 overflow-hidden">
      <div>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/15" />

        {/* Animated Border */}
        {/* <div className="absolute inset-0 border-gray-100 animate-[spin_50s_linear_infinite] rounded-2xl opacity-50" /> */}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center gap-20 h-full py-16">
          {/* Animated Icons Circle */}
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 animate-pulse" />

            {/* Rotating Icons */}
            <div className="relative w-28 h-28 rounded-full">
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <div className="absolute top-0 transform -translate-y-16">
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute right-0 transform translate-x-16">
                  <Database className="w-8 h-8 text-purple-500" />
                </div>
                <div className="absolute bottom-0 transform translate-y-16">
                  <FileX className="w-8 h-8 text-pink-500" />
                </div>
                <div className="absolute left-0 transform -translate-x-16">
                  <Inbox className="w-8 h-8 text-indigo-500" />
                </div>
              </div>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-transparent p-8 rounded-full shadow-lg border border-gray-100 group hover:scale-110 transition-all duration-300">
                  <Database className="w-16 h-16 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4 max-w-md mx-auto px-6">
            <h3 className="text-2xl font-bold text-gray-800  bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              No Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              This space is waiting for your data. Once you add information, it
              will be displayed here in a beautiful and organized way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
