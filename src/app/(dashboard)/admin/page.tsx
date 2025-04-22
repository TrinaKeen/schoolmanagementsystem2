import Announcements from "@/components/Announcements";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import UserCardStudent from "@/components/UserCardStudent";
import UserCardInstructor from "@/components/UserCardInstructor";
import UserCardEmployee from "@/components/UserCardEmployee";
import Notification from "@/components/Notification";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCardStudent />
          <UserCardInstructor />
          <UserCardEmployee />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <Announcements />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Notification />
      </div>
    </div>
  );
};

export default AdminPage;
