"use client";

const announcements = [
  {
    title: "System Update",
    date: "2025-04-21",
    message:
      "Please ensure all system updates are completed by the IT team before the end of the week.",
    color: "bg-lamaSkyLight",
  },
  {
    title: "Pending Documents",
    date: "2025-04-20",
    message:
      "Student KatKat Katrina Katrina still needs to submit her proof of residence. Follow up required.",
    color: "bg-lamaPurpleLight",
  },
  {
    title: "New Instructor Orientation",
    date: "2025-04-19",
    message:
      "Orientation for new instructors will take place on Monday at 9 AM in the conference room.",
    color: "bg-lamaYellowLight",
  },
];

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md w-full h-full shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((item, index) => (
          <div
            key={index}
            className={`rounded-md p-4 transition duration-300 transform hover:scale-[1.02] hover:shadow-md ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{item.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {item.date}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
