
'use client'
import {LayoutSideContentLeft, Plus, Briefcase, Gear, House, Magnifier, Person, LayoutHeaderSideContent, MagnifierPlus, BookmarkFill, FileText, CreditCard, Factory} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const seekerNavLinks = [
  { icon: LayoutHeaderSideContent,      label: "Dashboard",    href: "/seekerDashboard" },
  { icon: MagnifierPlus, label: "Jobs",         href: "/seekerDashboard/jobs" },
  { icon: BookmarkFill,  label: "Saved Jobs",   href: "/seekerDashboard/savedjobs" },
  { icon: FileText,      label: "Applications", href: "/seekerDashboard/applications" },
  { icon: CreditCard,    label: "Billing",      href: "/seekerDashboard/billing" },
  { icon: Gear,          label: "Settings",     href: "/seekerDashboard/settings" },
];

const recruiterNavLinks = [
  { icon: House,    label: "Home",          href: "/recruiterdashboard" },
  { icon: Plus,     label: "Create a job",   href: "/recruiterdashboard/new" },
  { icon: Briefcase, label: "All Jobs",       href: "/recruiterdashboard/recruiteralljobs" },
  { icon: Person,   label: "Profile",        href: "/recruiterdashboard/recruitercompany" },
  { icon: Gear,     label: "Settings",       href: "/recruiterdashboard/settings" },
];

const adminNavLinks = [
  { icon: LayoutHeaderSideContent, label: "Dashboard",  href: "/adminDashboard" },
  { icon: Person,                  label: "Users",      href: "/adminDashboard/users" },
  { icon: Factory,                label: "Companies",  href: "/adminDashboard/companies" },
  { icon: Briefcase,               label: "Jobs",       href: "/adminDashboard/jobs" },
  { icon: CreditCard,              label: "Payments",   href: "/adminDashboard/payments" },
  { icon: Gear,                    label: "Settings",   href: "/adminDashboard/settings" },
];

const navLinkMappings = {
  seeker : seekerNavLinks,
  recruiter : recruiterNavLinks,
  admin: adminNavLinks
}


export function DashboardLayout({user}) {

  const pathname = usePathname();
  if(!user?.role) return null
 const navItems = navLinkMappings[user?.role] ?? []
  const navLinks =    <nav>
      {navItems.map(({ icon: Icon, label, href }) => (
        <Link
          key={href}
          href={href}
          className={`nav-item flex gap-2 items-center justify-start p-1 rounded ${pathname === href ? "active" : ""}`}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>


  return (
    <>
    <aside className="hidden lg:block w-64 border-r p-4 border-default">
      {navLinks}
    </aside>
    <Drawer >
      <Button className={'lg:hidden'} variant="secondary">
        <LayoutSideContentLeft />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Body>
              {navLinks}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
    
  );
}