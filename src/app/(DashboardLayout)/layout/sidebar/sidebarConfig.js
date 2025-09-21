import {
  SquareTerminal,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from "lucide-react";

export const sidebarConfig = {
  width: {
    expanded: "w-54 sm:w-60",
    minimized: "w-17",
  },
  logo: {
    icon: (props) => <SquareTerminal {...props} />,
    text: "RBDev",
  },
  items: [
    {
      title: "Beranda",
      href: "/dashboard",
      icon: (props) => <LayoutDashboard {...props} />,
    },
    {
      title: "Daftar Tamu",
      href: "/dashboard/invitations",
      icon: (props) => <Mail {...props} />,
    },
    {
      title: "Tamu Saya",
      href: "/dashboard/my-invitations",
      icon: (props) => <Users {...props} />,
    },
  ],
  logout: {
    title: "Logout",
    icon: (props) => <LogOut {...props} />,
  },
};
