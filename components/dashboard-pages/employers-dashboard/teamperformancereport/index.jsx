"use client";
import Paper from "@/components/common/Paper";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import TeamReportTable from "./components/TeamReportTable";


const Index = () => {
  
  

  return (
    <InnerLayout>
    <section className="px-4">
    <Paper>
        <div>
            {/* pending */}
          <TeamReportTable />
        </div>
    </Paper>
    </section>
    </InnerLayout>
  );
};

export default Index;
