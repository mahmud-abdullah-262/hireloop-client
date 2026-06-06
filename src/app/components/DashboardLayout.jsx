
'use client'
import {LayoutSideContentLeft, Plus, Briefcase, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLayout({user}) {
  const pathname = usePathname();
 const navItems = [
  { icon: House,    label: "Home",          href: "/recruiterdashboard" },
  { icon: Plus,     label: "Create a job",   href: "/recruiterdashboard/new" },
  { icon: Briefcase, label: "All Jobs",       href: "/recruiterdashboard/recruiteralljobs" },
  { icon: Person,   label: "Profile",        href: "/recruiterdashboard/recruitercompany" },
  { icon: Gear,     label: "Settings",       href: "#2" },
];
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