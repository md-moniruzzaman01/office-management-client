import {
  BadgeCheck,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const ProfileMain = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Decorative Header */}
      <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="px-6 pb-8 -mt-12 text-center lg:text-left">
        <div className="relative inline-block">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop"
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-800 shadow-2xl mx-auto lg:mx-0"
            alt="Profile"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">John Doe</h2>
            <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500/10" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Senior Software Engineer</p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
            <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">Follow</Button>
            <Button size="sm" variant="outline" className="rounded-full">Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
