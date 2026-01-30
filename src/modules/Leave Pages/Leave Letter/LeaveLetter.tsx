import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../../components/ui/button";
import { getFromLocalStorage } from "../../../shared/Helpers/local_storage";
import { authKey } from "../../../shared/config/constaints";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";
import { useGetSingleLeaveApplicationQuery } from "../../../redux/features/api/Leave Application/leaveApplication";

const LeaveLetter = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const token = getFromLocalStorage(authKey);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  const { id } = useParams();
  const { data: singleData, isLoading } = useGetSingleLeaveApplicationQuery({
    id,
    token,
  });


  if (isLoading) {
    return <LoadingPage fullPage />;
  }
  return (
    <div className="relative min-h-screen bg-componentsBackground rounded-md shadow-md">
      <div className="absolute right-4 top-4 z-10 print:hidden">
        <Button
          onClick={() => handlePrint()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Print
        </Button>
      </div>

      <div ref={contentRef} className="flex   justify-center min-h-[1056px] ">
        <div
          className="relative w-full print:min-w-full max-w-2xl  min-h-screen"
          style={{
            backgroundImage: `url(${singleData?.data?.user?.branch?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Semi-transparent overlay to improve text readability */}
          <div className="absolute inset-0 " />

          <div className="relative z-10 p-8  pt-32 print:pt-72">
            <div className="space-y-8 text-base text-gray-700">
              <p className="text-right text-sm font-medium text-gray-500">
                Date: 2024-03-14
              </p>

              <div className="space-y-2">
                <p className="text-lg font-semibold">To,</p>
                <p>The Manager</p>
                <p>Demo Office</p>
              </div>

              <div className="space-y-4 text-justify">
                <p>Dear Sir/Madam,</p>
                <p>
                  I am writing to formally request leave for{" "}
                  <span className="font-semibold">5 days</span>, starting from{" "}
                  <span className="italic">2024-03-20</span> to
                  <span className="italic"> 2024-03-24</span>, due to
                  <span className="italic"> personal reasons</span>.
                  <br />I hope this request can be considered and approved at
                  the earliest.
                </p>
              </div>

              <div className="space-y-1">
                <p>Sincerely,</p>
                <p className="font-semibold">John Doe</p>
                <p>Software Engineer</p>
                <p>Engineering Department</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveLetter;
