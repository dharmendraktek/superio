
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Paper from "@/components/common/Paper";
import AttendanceCalendar from "../dashboard/components/AttendanceCalender";



const Index = () => {
  
  return (
    <InnerLayout>
      <section className="px-4">
        <Paper height='800px'>
         <AttendanceCalendar />
        </Paper>
      </section>
    </InnerLayout>
  );
};

export default Index;
