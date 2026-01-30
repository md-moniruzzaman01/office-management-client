import {
  TrendingUp,
  Award,
  Target,
  Star,
  Users,
  Zap,
  Trophy,
  GitPullRequest,
  Code,
  Rocket,
  LineChart,
  Brain,
  Lightbulb,
} from "lucide-react";
import { TabsContent } from "../../../../components/ui/tabs";

const ProfilePerformance = () => {
  return (
    <TabsContent value="performance">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Performance Card */}
        <div className="bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Overall Performance
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    85%
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  +5%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Goals Met
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  92%
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Rating
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Excellent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Card */}
        <div className="bg-componentsBackground rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-green-500" />
                Key Performance Metrics
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      Project Completion Rate
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full text-sm font-medium">
                    95%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      Code Quality
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium">
                    Excellent
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      Team Collaboration
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-sm font-medium">
                    Very Good
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="lg:col-span-2 bg-componentsBackground rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Recent Achievements & Contributions
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Key Achievements
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex-shrink-0">
                      <Rocket className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Microservices Migration
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Successfully led the migration to microservices
                        architecture, improving system scalability by 200%
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex-shrink-0">
                      <Brain className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Mentorship Program
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mentored 3 junior developers, all of whom received
                        promotions within 6 months
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex-shrink-0">
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Performance Optimization
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Improved application performance by 40% through code
                        optimization and caching strategies
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Impact & Innovation
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Code Reviews
                      </span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        150+
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Contributed to maintaining high code quality standards
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Technical Docs
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        25+
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Created comprehensive technical documentation
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Team Initiatives
                      </span>
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        8
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Led key technical initiatives
                    </div>
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

export default ProfilePerformance;
