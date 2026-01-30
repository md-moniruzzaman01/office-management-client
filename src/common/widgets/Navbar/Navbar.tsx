import { ModeToggle } from "../../../components/mode-toggle";
import EmailsIcon from "./partials/Emails Icon/EmailsIcon";
import MessagesIcon from "./partials/Messages Icon/MessagesIcon";
import NavSearch from "./partials/Nav Search/NavSearch";
import NotificationsIcon from "./partials/Notifications Icon/NotificationsIcon";
import SettingsIcon from "./partials/Settings Icon/SettingsIcon";
import UserIcon from "./partials/User Icon/UserIcon";

const Navbar = () => {
  const userData = {
    data: {
      details: {
        name: "Admin",
      },
    },
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="sticky top-0 z-40 w-full p-4">
      <div className="glass flex justify-between items-center py-3 px-6 rounded-2xl transition-all duration-300">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            {getGreeting()}, <span className="text-foreground">{userData?.data?.details?.name}</span>
          </h3>
          <p className="text-xs text-muted-foreground">Welcome back to your dashboard</p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <NavSearch />
          
          <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
            <MessagesIcon />
            <EmailsIcon />
            <NotificationsIcon />
          </div>

          <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
            <SettingsIcon />
            <ModeToggle />
            <UserIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
