"use client";

import { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData } from "@/lib/data";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

// Fields for FormModal (create & update only)
const formFields = [
  { name: "title", label: "Title", required: true },
  { name: "class", label: "Class", required: true },
  { name: "date", label: "Date", type: "date", required: true },
];

const AnnouncementListPage = () => {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  const [modalType, setModalType] = useState<
    "create" | "update" | "delete" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<Announcement | null>(null);

  const openModal = (
    type: "create" | "update" | "delete",
    item?: Announcement
  ) => {
    setModalType(type);
    setSelectedItem(item || null);
  };

  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <button
                onClick={() => openModal("update", item)}
                className="text-blue-600 text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => openModal("delete", item)}
                className="text-red-600 text-xs"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button
                onClick={() => openModal("create")}
                className="bg-lamaYellow text-xs p-2 rounded"
              >
                + Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <Table columns={columns} renderRow={renderRow} data={announcementsData} />

      {/* PAGINATION */}
      <Pagination />

      {/* FORM MODAL */}
      <FormModal
        opened={modalType !== null}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
          setModalType(null);
          setSelectedItem(null);
        }}
        fields={modalType === "delete" ? [] : formFields}
        title={
          modalType === "create"
            ? "Add Announcement"
            : modalType === "update"
            ? "Edit Announcement"
            : "Delete Announcement"
        }
        type={modalType}
        data={selectedItem}
        initialValues={selectedItem || {}}
      />
    </div>
  );
};

export default AnnouncementListPage;
