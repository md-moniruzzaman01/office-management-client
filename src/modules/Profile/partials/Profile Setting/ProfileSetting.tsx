import {
  Shield,
  Bell,
  Lock,
  UserCog,
  Trash2,
  Mail,
  Eye,
  BellRing,
  Calendar,
  AlertTriangle,
  Settings,
  KeyRound,
  Moon,
  MessageSquare,
} from "lucide-react";
import { TabsContent } from "../../../../components/ui/tabs";
import { Switch } from "../../../../components/ui/switch";
import { Button } from "../../../../components/ui/button";

const ProfileSetting = () => {
  return (
    <TabsContent value="settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings Card */}
        <div className="bg-componentsBackground rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Security Settings
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Two-Factor Authentication
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Login Alerts
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified of unusual login activity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full gap-2">
                  <Lock className="w-4 h-4" />
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences Card */}
        <div className="bg-componentsBackground rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-500" />
                Notification Preferences
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Email Notifications
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Updates about your account activity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Push Notifications
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Instant alerts on your device
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Calendar Updates
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Reminders for important events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>

        {/* Account Preferences Card */}
        <div className="lg:col-span-2 bg-componentsBackground rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                Account Preferences
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-teal-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Language
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose your preferred language
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Languages className="w-4 h-4" />
                    English
                  </Button>
                </div> */}

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Dark Mode
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Toggle dark mode theme
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Chat Status
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show when you're online
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-amber-800 dark:text-amber-300">
                      Account Actions
                    </span>
                  </div>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mb-4">
                    These actions can have permanent effects on your account.
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full gap-2">
                      <UserCog className="w-4 h-4" />
                      Update Profile
                    </Button>
                    <Button variant="destructive" className="w-full gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ProfileSetting;
