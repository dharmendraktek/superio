"use client";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import UpdateMom from "./components/UpdateMom";

const Index = () => {

  return (
    <InnerLayout>
      {/* {isLoading && <Loader />} */}
     <div className="px-4">
      <UpdateMom />
     </div>
    </InnerLayout>
  );
};

export default Index;
