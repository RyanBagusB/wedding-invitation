import {
  SquareTerminal,
  LayoutDashboard,
  Package,
  Users,
  Tags,
  ShoppingCart,
  TicketPercent,
  MessageSquare,
  LogOut,
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
      title: "Dashboard",
      href: "/dashboard",
      icon: (props) => <LayoutDashboard {...props} />,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: (props) => <Package {...props} />,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: (props) => <Users {...props} />,
    },
    {
      title: "Category",
      href: "/dashboard/category",
      icon: (props) => <Tags {...props} />,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: (props) => <ShoppingCart {...props} />,
    },
    {
      title: "Coupons",
      href: "/dashboard/coupons",
      icon: (props) => <TicketPercent {...props} />,
    },
    {
      title: "Chats",
      href: "/dashboard/chats",
      icon: (props) => <MessageSquare {...props} />,
    },
  ],
  logout: {
    title: "Logout",
    icon: (props) => <LogOut {...props} />,
  },
};
