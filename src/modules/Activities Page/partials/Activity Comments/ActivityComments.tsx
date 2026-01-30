/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, Heart, MoreVertical, Trash } from "lucide-react";
import Modal from "../../../../common/Modal/Modal";

import { useGetSingleActivityQuery } from "../../../../redux/features/api/Activity/activity";

import { demoUserLogo } from "../../../../shared/config/constaints";
import { Comment } from "./config/types";

import CommentForm from "./partials/CommentForm";
import { getFormatDate } from "../../../../shared/Helpers/getFullTimeAndDate";
import {
  useCreateCommentReactionMutation,
  useDeleteActivityCommentMutation,
  useDeleteCommentReactionMutation,
} from "../../../../redux/features/api/Activity/activityComment";
import { WarningSwal } from "../../../../shared/Helpers/warningSwal";
import { showSwal } from "../../../../shared/Helpers/SwalShower";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { getUser } from "../../../../shared/Helpers/jwt";
import { hasReacted } from "./helpers/checkCommentReaction";

const ActivityComments = ({
  id,
  isCommentModalOpen,
  setIsCommentModalOpen,
}: {
  id: number | null;
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: any;
}) => {
  const user: any = getUser();

  const [commentId, setCommentId] = useState<number | null>(null);

  const { data: activityCommentsData, isLoading } = useGetSingleActivityQuery(
    {
      id,
    },
    { skip: !id }
  );
  const [createCommentReaction] = useCreateCommentReactionMutation();
  const [deleteCommentReaction] = useDeleteCommentReactionMutation();

  const [deleteComment, { isLoading: deleteLoading }] =
    useDeleteActivityCommentMutation();

  const handleLikeToggle = async (id: number) => {
    const fullData = {
      commentId: id,
      type: "LOVE",
    };

    const reaction = hasReacted(
      activityCommentsData?.data?.comments,
      id,
      user?.id
    );
    if (reaction && reaction.id) {
      await deleteCommentReaction({ id: reaction?.id });
    } else {
      await createCommentReaction({ fullData });
    }
  };

  const handleDeleteComment = async (id: number | string) => {
    const result = await deleteComment({ id });

    showSwal(result);
  };

  return (
    <div>
      {
        <Modal
          loading={isLoading || deleteLoading}
          className="p-0"
          isOpen={isCommentModalOpen}
          setIsOpen={setIsCommentModalOpen}
          bgColor="white"
          header={`${activityCommentsData?.data?.user?.name}'s Activity`}
          description={activityCommentsData?.data?.name}
        >
          <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto px-5">
            {activityCommentsData?.data?.comments?.length ? (
              [...(activityCommentsData?.data?.comments ?? [])]
                .reverse()
                .map((comment: Comment, idx: number) => (
                  <div key={idx} className="p-2  transition-colors">
                    <div className="flex items-start space-x-1">
                      <img
                        src={comment?.user?.profileImage || demoUserLogo}
                        alt={comment?.user?.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="flex-1 min-w-0 bg-gray-50 pl-3 pr-2 py-2 rounded-lg border shadow-md">
                        <div className="flex  justify-between ">
                          <div>
                            <div className="flex gap-2">
                              <h3 className="text-sm font-medium text-gray-900">
                                {comment?.user?.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {getFormatDate(comment?.createdAt ?? "")}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {[
                                comment?.user?.designation,
                                comment?.user?.department?.name,
                                comment?.user?.branch?.name,
                              ]
                                .filter(Boolean)
                                .join(" • ")}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <MoreVertical
                                  className="cursor-pointer"
                                  size={20}
                                />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    setCommentId(comment?.id || null)
                                  }
                                >
                                  <Edit className="mr-2" size={15} /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    WarningSwal({
                                      handleDelete: handleDeleteComment,
                                      id: comment?.id,
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
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                          {comment?.content}
                        </p>
                        <div className="flex items-center justify-end w-full ">
                          <button className="flex  items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart
                              size={18}
                              onClick={() => handleLikeToggle(comment?.id)}
                              className={
                                hasReacted(
                                  activityCommentsData?.data?.comments,
                                  comment?.id,
                                  user?.id
                                )
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }
                            />
                            <abbr
                              className="text-sm font-medium no-underline"
                              title={(
                                comment?.reactions
                                  ?.map((user: any) =>
                                    [
                                      user?.user?.name,
                                      user?.user?.designation,
                                      user?.user?.department?.name,
                                      user?.user?.branch?.name,
                                    ]
                                      .filter(Boolean)
                                      .join(" • ")
                                  )
                                  .join("\n") || "No Reactions"
                              ).toString()}
                            >
                              {comment?._count?.reactions}
                            </abbr>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <Heart size={24} />
                <p className="mt-2 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
          </div>
          <CommentForm
            setCommentId={setCommentId}
            commentId={commentId}
            id={id}
          />
        </Modal>
      }
    </div>
  );
};

export default ActivityComments;
