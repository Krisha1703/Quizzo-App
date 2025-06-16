// Class List Table Rows Component

import { useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import EditClass from "@/components/class/edit-class";
import DeleteModal from "./delete-modal";
import ShareModal from "./share-modal";
import { handleExport } from "@/components/class/helper-functions";
import ActionMenu from "@/components/class/action-menus"; 

const ClassTableRows = ({
  classes = [],
  userRole,
  actionMenuOpen,
  activeModal,
  selectedClassId,
  mobileMenuOpenId,
  copied,
  openModal,
  closeModal,
  handleDelete,
  handleCopyCode,
  toggleMobileMenu,
}) => {
  const router = useRouter();

  const getActionProps = (cls) => [
    {
      name: "edit",
      icon: "/Assets/edit.svg",
      alt: "Edit",
      width: 30,
      height: 30,
      onClick: () => openModal("edit", cls.classId),
    },
    {
      name: "delete",
      icon: "/Assets/delete.svg",
      alt: "Delete",
      width: 27,
      height: 30,
      onClick: () => openModal("delete", cls.classId),
    },
    {
      name: "share",
      icon: "/Assets/share.svg",
      alt: "Share",
      width: 25,
      height: 30,
      onClick: () => openModal("share", cls.classId),
    },
    {
      name: "export",
      icon: "/Assets/download.svg",
      alt: "Export",
      width: 23,
      height: 30,
      onClick: () => handleExport(cls.classId),
    },
  ];

  return (
    <>
      {classes.map((cls) => (
        <div key={cls.classId} className="space-y-1">
          {/* Desktop */}
          <div
            className={`hidden md:grid ${
              userRole === "Teacher" ? "grid-cols-6" : "grid-cols-5"
            } gap-4 items-center`}
          >
            <div
              className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate hover:bg-primary cursor-pointer"
              onClick={() => router.push(`/class/${cls.classId}`)}
            >
              {cls.name}
            </div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {new Date(cls.createdAt).toLocaleDateString()}
            </div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {cls.totalStudents}
            </div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {cls.classCode}
            </div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {cls.schedule || "-"}
            </div>

            {userRole === "Teacher" && actionMenuOpen && (
              <div className="relative right-5 bottom-5">
                <ActionMenu
                  isOpen={true}
                  actions={getActionProps(cls)}
                  assignment={false}
                />
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden bg-secondary text-white rounded-lg p-4 space-y-1">
            <div onClick={() => router.push(`/class/${cls.classId}`)}>
              <strong>Class Name:</strong> {cls.name}
            </div>
            <div>
              <strong>Created:</strong> {new Date(cls.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Students:</strong> {cls.totalStudents}
            </div>
            <div>
              <strong>Code:</strong> {cls.classCode}
            </div>
            <div>
              <strong>Schedule:</strong> {cls.schedule || "-"}
            </div>

            {userRole === "Teacher" && (
              <div className="relative mt-3 flex justify-end">
                <button
                  className="mobile-menu-toggle"
                  onClick={() => toggleMobileMenu(cls.classId)}
                >
                  <EllipsisVertical className="w-6 h-6 text-white" />
                </button>

                {mobileMenuOpenId === cls.classId && (
                  <ActionMenu
                    isOpen={true}
                    actions={getActionProps(cls)}
                    assignment={false}
                    menuClass="top-full mt-2"
                  />
                )}
              </div>
            )}
          </div>

          {/* Modals */}
          {activeModal === "edit" && selectedClassId === cls.classId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="relative bg-white rounded-lg shadow-xl p-6 md:max-w-5xl max-w-4xl w-5/6 md:h-screen h-5/6 md:w-full">
                <EditClass onClose={closeModal} classId={cls.classId} />
              </div>
            </div>
          )}

          {activeModal === "delete" && selectedClassId === cls.classId && (
            <DeleteModal closeModal={closeModal} handleDelete={handleDelete} />
          )}

          {activeModal === "share" && selectedClassId === cls.classId && (
            <ShareModal
              closeModal={closeModal}
              handleCopyCode={handleCopyCode}
              copied={copied}
              cls={cls}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default ClassTableRows;
