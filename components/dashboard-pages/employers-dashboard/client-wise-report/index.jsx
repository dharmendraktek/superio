"use client";
import Paper from "@/components/common/Paper";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import ClientWiseReportTable from "./components/ClientWiseReportTable";


const Index = () => {
  
  

  return (
    <InnerLayout>
    <section className="px-4">
    <Paper>
        <div>
            {/* pending */}
          <ClientWiseReportTable />
        </div>
    </Paper>
    </section>
    </InnerLayout>
  );
};

export default Index;
