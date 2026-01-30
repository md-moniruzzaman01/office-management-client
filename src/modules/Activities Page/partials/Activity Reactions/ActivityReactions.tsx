/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, HeartIcon } from "lucide-react";
import Modal from "../../../../common/Modal/Modal";
import { useGetSingleActivityQuery } from "../../../../redux/features/api/Activity/activity";
import { demoUserLogo } from "../../../../shared/config/constaints";

const ActivityReactions = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: {
  id: number | null;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: activityReactionsData, isLoading } = useGetSingleActivityQuery(
    {
      id,
    },
    { skip: !id }
  );

  return (
    <div>
      {
        <Modal
          loading={isLoading}
          isOpen={isModalOpen}
          header={`${activityReactionsData?.data?.user?.name}'s Activity`}
          description={activityReactionsData?.data?.name}
          setIsOpen={setIsModalOpen}
          bgColor="white"
        >
          <div className="p-4 space-y-2 max-h-[50vh] overflow-y-auto">
            <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-red-100">
              <HeartIcon size={20} className="text-red-500" />
              <span className="text-red-500 font-semibold">
                {activityReactionsData?.data?._count?.reactions || 0}
              </span>
            </div>

            {activityReactionsData?.data?.reactions?.length ? (
              activityReactionsData?.data?.reactions?.map(
                (reaction: any, idx: number) => (
                  <div key={idx} className="p-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <img
                          src={reaction?.user?.profileImage || demoUserLogo}
                          alt={reaction?.user?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-slate-600">
                          <h3>{reaction?.user?.name}</h3>
                          <p className="text-[10px]">
                            {[
                              reaction?.user?.designation,
                              reaction?.user?.department?.name,
                              reaction?.user?.branch?.name,
                            ]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>
                      </div>
                      <p className="text-red-500">
                        <HeartIcon size={20} />
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <Heart size={24} />
                <p className="mt-2 text-sm">
                  No reactions yet. Be the first to react!
                </p>
              </div>
            )}
          </div>
        </Modal>
      }
    </div>
  );
};

export default ActivityReactions;
