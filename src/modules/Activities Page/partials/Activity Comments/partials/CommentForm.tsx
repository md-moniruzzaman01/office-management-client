/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useCreateActivityCommentMutation,
  useEditActivityCommentMutation,
  useGetSingleActivityCommentQuery,
} from "../../../../../redux/features/api/Activity/activityComment";
import { showToast } from "../../../../../shared/Helpers/showToaster";
import { initialData } from "../config/constants";
import { Loader2, Send, X } from "lucide-react";

const CommentForm = ({
  id,
  commentId,
  setCommentId,
}: {
  id: number | null;
  commentId?: number | null;
  setCommentId?: any;
}) => {
  const [formData, setFormData] = useState(initialData);

  const [createComment, { isLoading: commentLoading }] =
    useCreateActivityCommentMutation();
  const [updateComment, { isLoading: updateLoading }] =
    useEditActivityCommentMutation();
  const { data: singleComment } = useGetSingleActivityCommentQuery(
    { id: commentId },
    { skip: !commentId }
  );

  useEffect(() => {
    if (singleComment) {
      if (commentId) {
        setFormData({ content: singleComment?.data?.content });
      } else {
        setFormData(initialData);
      }
    } else {
      setFormData(initialData);
    }
  }, [singleComment, commentId]);
  const handleSubmit = async () => {
    const fullData = {
      ...formData,
      activityId: id,
    };

    if (commentId) {
      const result = await updateComment({
        fullData,
        id: commentId,
      });
      const isSwalTrue = showToast(result);
      if (isSwalTrue) {
        setFormData(initialData);
        setCommentId(null);
      }
    } else {
      const result = await createComment({ fullData });
      const isSwalTrue = showToast(result);
      if (isSwalTrue) {
        setFormData(initialData);
      }
    }
  };

  return (
    <div className="shadow-md p-3">
      <div className="p-2 bg-gray-50 border-t rounded-b-xl">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full rounded-full px-4 py-1.5 border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
              placeholder="Write a comment..."
              value={formData?.content}
              onChange={(e) => setFormData({ content: e.target.value })}
              disabled={commentLoading}
            />
            <div
              className={`absolute inset-y-0 right-3 flex items-center transition-opacity duration-200 ${
                formData.content ? "opacity-100 cursor-pointer" : "opacity-0"
              }`}
            >
              <X
                onClick={() => {
                  setCommentId(null);
                  setFormData(initialData);
                }}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={commentLoading || !formData?.content?.trim()}
            className={`
                inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-full
                shadow-sm text-white bg-blue-600 transition-all duration-200
                ${
                  commentLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "hover:bg-blue-700 hover:scale-105 active:scale-95"
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              `}
          >
            {commentLoading || updateLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send
                size={18}
                className="transform rotate-45 transition-transform group-hover:translate-x-1"
              />
            )}
            <span className="ml-2">
              {commentLoading || updateLoading
                ? `${commentId ? "Editing..." : "Posting..."}`
                : `${commentId ? "Edit" : "Post"} `}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
