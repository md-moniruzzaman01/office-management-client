/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";
import { Activity } from "../../config/type";
import {
  Edit,
  HeartIcon,
  MessageCircle,
  MoreVertical,
  Trash,
} from "lucide-react";

import { demoUserLogo } from "../../../../shared/config/constaints";
import { getFormatDate } from "../../../../shared/Helpers/getFullTimeAndDate";
import ActivityReactions from "../Activity Reactions/ActivityReactions";
import ActivityComments from "../Activity Comments/ActivityComments";
import { useDeleteActivityMutation } from "../../../../redux/features/api/Activity/activity";
import { showSwal } from "../../../../shared/Helpers/SwalShower";
import { WarningSwal } from "../../../../shared/Helpers/warningSwal";
import { EmptyData } from "../../../../common/Empty Data/EmptyData";
import {
  useCreateActivityReactionMutation,
  useDeleteActivityReactionMutation,
} from "../../../../redux/features/api/Activity/activityReaction";
import LoadingPage from "../../../../common/LoadingPage/LoadingPage";
import { getUser } from "../../../../shared/Helpers/jwt";
import { hasReacted } from "./helpers/checkReaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";

interface ActivityListProps {
  activities: Activity[];
  setActivityId?: any;
  loading: boolean;
  setLimit: any;
  total: number;
}

const ActivityList: FC<ActivityListProps> = ({
  activities,
  setActivityId,
  loading,
  setLimit,
  total,
}) => {
  const [reactionId, setReactionId] = useState<number | null>(null);
  const [commentId, setCommentId] = useState<number | null>(null);
  const activityEndRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState(true); // State to track the first page load

  const user: any = getUser();
  const [deleteActivity] = useDeleteActivityMutation();
  const [createActivityReaction] = useCreateActivityReactionMutation();
  const [deleteActivityReaction] = useDeleteActivityReactionMutation();

  useEffect(() => {
    if (activityEndRef.current) {
      if (initialLoad) {
        activityEndRef.current.scrollIntoView({ behavior: "smooth" });
        setInitialLoad(false);
      }
    }
  }, [activities, initialLoad]);

  const handleDeleteActivity = async (id: number) => {
    const result = await deleteActivity({ id });
    showSwal(result);
  };

  const handleLikeToggle = async (id: number) => {
    const fullData = {
      activityId: id,
      type: "LOVE",
    };

    const reaction = hasReacted(activities, id, user?.id);
    if (reaction && reaction.id) {
      await deleteActivityReaction({ id: reaction.id });
    } else {
      await createActivityReaction({ fullData });
    }
  };

  return (
    <div className="w-2/3 ">
      <div
        className="h-[calc(100vh-150px)] pr-5 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {activities?.length < total && (
          <div className="flex justify-center">
            <Button
              variant="link"
              onClick={() => setLimit((prev: number) => prev + 5)}
            >
              See more...
            </Button>
          </div>
        )}
        <div>
          {loading ? (
            <LoadingPage />
          ) : !activities?.length ? (
            <EmptyData />
          ) : (
            activities
              .map((activity, index) => (
                <div
                  ref={index === 0 ? activityEndRef : null}
                  key={index}
                  className="bg-componentsBackground  rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue dark:border-gray-500"
                >
                  <div className="flex justify-between  mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={activity?.user?.profileImage || demoUserLogo}
                        alt={activity?.user?.name || "User profile"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex gap-5 items-center">
                          <h2 className="text-lg font-semibold leading-tight">
                            {activity?.user?.name || "Unknown User"}
                          </h2>
                          <p className="text-sm text-gray-400">
                            {getFormatDate(activity?.createdAt ?? "")}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {[
                            activity?.user?.designation,
                            activity?.user?.department?.name,
                            activity?.user?.branch?.name,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreVertical className="cursor-pointer" size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setActivityId(activity?.id || null)}
                          >
                            <Edit className="mr-2" size={15} /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              WarningSwal({
                                handleDelete: handleDeleteActivity,
                                id: activity?.id,
                              })
                            }
                            className="text-destructive"
                          >
                            <Trash className="mr-2" size={15} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <h3 className="text-md font-semibold mb-1">
                    {activity?.name}
                  </h3>
                  <p>{activity?.description}</p>
                  <div className="flex items-center mt-4">
                    <div
                      className={`flex items-center  mr-6 ${
                        hasReacted(activities, activity?.id, user?.id) &&
                        "text-red-500"
                      }`}
                    >
                      <span
                        className={`mr-2 cursor-pointer `}
                        onClick={() => handleLikeToggle(activity?.id)}
                      >
                        {hasReacted(activities, activity?.id, user?.id) ? (
                          "❤️"
                        ) : (
                          <HeartIcon size={20} />
                        )}
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          setReactionId(activity?.id);
                          setIsModalOpen(true);
                        }}
                      >
                        {activity?._count?.reactions} Love
                      </span>
                    </div>

                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        setCommentId(activity?.id);
                        setIsCommentModalOpen(true);
                      }}
                    >
                      <span className="mr-2">
                        <MessageCircle size={20} />
                      </span>
                      <span className="cursor-pointer">
                        {activity?._count?.comments} Comments
                      </span>
                    </div>
                  </div>
                </div>
              ))
              .reverse()
          )}
        </div>
      </div>

      <ActivityReactions
        isModalOpen={isModalOpen}
        id={reactionId}
        setIsModalOpen={setIsModalOpen}
      />

      <ActivityComments
        id={commentId}
        isCommentModalOpen={isCommentModalOpen}
        setIsCommentModalOpen={setIsCommentModalOpen}
      />
    </div>
  );
};

export default ActivityList;
