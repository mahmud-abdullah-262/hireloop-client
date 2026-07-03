'use client'
import { Button, Chip, Pagination, toast } from "@heroui/react";
import {
  Person,
  Envelope,
  Briefcase,
  Calendar,
  CircleCheck,
  CircleXmark,
} from "@gravity-ui/icons";
import { deleteProfile, updateUserProfileStatus, updateUserRole } from '@/lib/actions/action';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getUsers } from "@/lib/api/fetchFunctions";

const roleColorMap = {
  admin: "danger",
  recruiter: "warning",
  seeker: "primary",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const formatDate = (dateObj) => {
  const raw = dateObj?.$date ?? dateObj;
  if (!raw) return "N/A";
  return new Date(raw).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};



const UserPageClient =  ({users, totalData, currentPage, size}) => {
 const router = useRouter()
 const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalData / size);
  const itemsPerPage = size;
  const totalItems = totalData;

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);



  const handleUpdate = async (id, role) =>{
   
   const result = await updateUserRole(id, role)
   if(result){
    toast.success('User Role Successfully Updated!')
   }
  }

  const handleStatusUpdate = async (id, statusData) => {
    
    const body = {
      status: statusData
    }
    console.log('function clicked', id, body)
    const result = await updateUserProfileStatus(id, body, "PATCH")
    if(result.ok){
      toast.success(result.message)
      router.refresh()
    }else{
      toast.danger(result.message)
    }


  }

  const handleDelete = async (id) => {
     const result = await deleteProfile(id, undefined, "DELETE")
    if(result.ok){
      toast.success(result.message)
      router.refresh()
    }else{
      toast.danger(result.message)
    }
  }

  

   


  const handlePageChange =  (newPage) => { // প্যারামিটারে পেজ নাম্বার আসছে
    console.log('clicked', newPage, totalPages) 
    if (newPage < 1 || newPage > totalPages) return; // যদি পেজ নাম্বার একের কম হয়, বা টোটাল পেজের কম হয় তাহলে রিটার্ন। টোটাল পেজ নাম্বার ফরম্যাটেঠিকভাবে দেয়া আছে কিনা দেখতে হবে।

    const params = new URLSearchParams(searchParams.toString()); // বিদ্যমান ব্রাউজার টেক্সটটা  নিয়ে এসে স্ট্রিং বানালাম

    params.set("page", newPage.toString()); // সেখানের পেজ প্যারামিটারে পেজিনেশনথেকে আসা পেজ নাম্বার সেট করলাম
   
    router.push(`?${params.toString()}`); // ব্রাউজারের এড্রেসবারে সেটা সেট করলাম।
  };

  return (
    <div className="p-6">
  <h1 className="text-2xl font-semibold mb-6">
    Users{" "}
    <span className="text-sm font-normal text-default-500">
      ({totalItems} total)
    </span>
  </h1>

  <div className="w-full overflow-x-auto rounded-xl border border-divider">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-divider text-default-500 text-xs uppercase tracking-wide">
          <th className="text-left px-5 py-3 font-medium">User Name</th>
          <th className="text-left px-5 py-3 font-medium">Email Address</th>
          <th className="text-left px-5 py-3 font-medium">Role</th>
          <th className="text-left px-5 py-3 font-medium">Join Date</th>
          <th className="text-left px-5 py-3 font-medium">Status</th>
          <th className="text-right px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-divider">
        {users.map((user) => {
          const isActive = user.status !== "suspended";
          const id = user.id?.$oid ?? user.id;

          return (
            <tr
              key={id || user.name}
              className="hover:bg-default-50 transition-colors group"
            >
              {/* User Name */}
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-default-200 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-default-600">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {user.name}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-5 py-3 text-default-500">{user.email}</td>

              {/* Role */}
              <td className="px-5 py-3">
                <Chip
                  size="sm"
                  variant="flat"
                  color={roleColorMap[user.role] ?? "default"}
                  className="capitalize"
                >
                  {user.role}
                </Chip>
              </td>

              {/* Join Date */}
              <td className="px-5 py-3 text-default-500">
                {formatDate(user.createdAt)}
              </td>

              {/* Status */}
              <td className="px-5 py-3">
                <Chip
                  size="sm"
                  variant="flat"
                  color={isActive ? "success" : "danger"}
                >
                  {isActive ? "Active" : "Suspended"}
                </Chip>
              </td>

              {/* Actions */}
              <td className="px-5 py-3 text-right">
                <div className="flex items-center justify-end gap-3">
                  {isActive ? (
                    <>
                      {user.role === "seeker" && (
                        <Button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to change ${user.name}'s role to Recruiter?`)) {
                              handleUpdate(id, 'recruiter');
                            }
                          }}
                          className="text-xs text-default-500 hover:text-foreground transition-colors"
                        >
                          Make Recruiter
                        </Button>
                      )}
                      {user.role === "recruiter" && (
                        <Button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to change ${user.name}'s role to Seeker?`)) {
                              handleUpdate(id, 'seeker');
                            }
                          }}
                          className="text-xs text-default-500 hover:text-foreground transition-colors"
                        >
                          Make Seeker
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to suspend ${user.name}?`)) {
                            handleStatusUpdate(user.id, 'suspended');
                          }
                        }}
                        variant="danger"
                        className="text-xs text-white hover:text-white/80 transition-colors"
                      >
                        Suspend
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to activate ${user.name}?`)) {
                            // এখানে আপনার অ্যাক্টিভেট করার ফাংশনটি কল করুন
                             handleStatusUpdate(user.id, 'active');
                          }
                        }}
                        className="text-xs text-success hover:text-success/80 transition-colors"
                      >
                        Activate
                      </Button>
                      <Button
                        onClick={() => {
                          if (window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete ${user.name}?`)) {
                           
                          handleDelete(user?.id);
                          }
                        }}
                        className="text-xs text-danger hover:text-danger/80 transition-colors"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>


  <div>
    <Pagination className="justify-center my-6">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={currentPage == 1} onPress={() => handlePageChange(currentPage - 1)}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === currentPage} onPress={() => handlePageChange(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next isDisabled={currentPage === totalPages} onPress={() => handlePageChange(currentPage + 1)}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  </div>
</div>
  );
};

export default UserPageClient;