import { useRef } from "react";
import { CardContent } from "../../../components/ui/card";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../../components/ui/button";
import { getFromLocalStorage } from "../../../shared/Helpers/local_storage";
import { authKey } from "../../../shared/config/constaints";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";
import { useGetSingleUserQuery } from "../../../redux/features/api/Users/user";

const LateApplication = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const token = getFromLocalStorage(authKey);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Leave Letter",
  });

  const { id } = useParams();
  const { data: singleData, isLoading } = useGetSingleUserQuery({
    id,
    token,
  });
  if (isLoading) {
    return <LoadingPage fullPage />;
  }
  return (
    <div className="relative min-h-screen">
      <div className="absolute right-4 top-4 z-10 print:hidden">
        <Button onClick={() => reactToPrintFn()}>Print</Button>
      </div>

      <div
        ref={contentRef}
        className="flex items-center justify-center min-h-[1056px]  bg-contain print:bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${singleData?.data?.bg_image || ""})`,
        }}
      >
        <CardContent className="max-w-2xl w-full  p-8 ">
          <div className="space-y-8 text-base text-gray-700">
            <p className="text-sm font-medium text-gray-500 text-right">
              Date: {singleData?.data?.createdAt?.slice(0, 10)}
            </p>
            <div className="space-y-2">
              <p className="font-semibold text-lg">To,</p>
              <p>The Manager</p>
              <p>{singleData?.data?.company || "Office Name"}</p>
            </div>
            <div className="space-y-4 text-justify">
              <p>
                Dear {singleData?.data?.supervisorName || "Supervisor Name"},
              </p>
              <p>
                I am writing to inform you that I am late due to{" "}
                <span className="italic">
                  {singleData?.data?.reason || "Reason for late"}
                </span>
                . I apologize for any inconvenience that I could not reach on
                time in the Office.
              </p>
              <p>
                Thank you for your kind Patience. Please let me know if you need
                any additional information.
              </p>
            </div>
            <div className="space-y-1">
              <p>Sincerely,</p>
              <p className="font-semibold">
                {singleData?.data?.name || "Your Name"}
              </p>
              <p>{singleData?.data?.designation || "Your Designation"}</p>
              <p>{singleData?.data?.department || "Your Department"}</p>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default LateApplication;
