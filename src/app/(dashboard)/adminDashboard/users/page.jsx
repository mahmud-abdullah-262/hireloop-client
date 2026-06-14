import { getUsers } from '@/lib/api/fetchFunctions';
import { Button, Chip } from "@heroui/react";
import {
  Person,
  Envelope,
  Briefcase,
  Calendar,
  CircleCheck,
  CircleXmark,
} from "@gravity-ui/icons";

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

const AdminUsersPage = async () => {
  const data = await getUsers();
  const users = data.users;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Users{" "}
        <span className="text-sm font-normal text-default-500">
          ({users.length} total)
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
              const id = user._id?.$oid ?? user._id;

              return (
                <tr
                  key={id}
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
                      startContent={
                        user.role === "recruiter" ? (
                          <Briefcase className="w-3 h-3" />
                        ) : (
                          <Person className="w-3 h-3" />
                        )
                      }
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
                      startContent={
                        isActive ? (
                          <CircleCheck className="w-3 h-3" />
                        ) : (
                          <CircleXmark className="w-3 h-3" />
                        )
                      }
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
                            <Button className="text-xs text-default-500 hover:text-foreground transition-colors">
                              Make Recruiter
                            </Button>
                          )}
                          {user.role === "recruiter" && (
                            <Button className="text-xs text-default-500 hover:text-foreground transition-colors">
                              Make Seeker
                            </Button>
                          )}
                          <Button variant='danger' className="text-xs text-white hover:text-white/80 transition-colors">
                            Suspend
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="text-xs text-success hover:text-success/80 transition-colors">
                            Activate
                          </Button>
                          <Button className="text-xs text-danger hover:text-danger/80 transition-colors">
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
    </div>
  );
};

export default AdminUsersPage;