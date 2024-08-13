import { MdSpaceDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import {
  RiSettingsLine,
  RiAddCircleLine,
  RiEditCircleLine,
} from "react-icons/ri";
import {
  FaGraduationCap,
} from "react-icons/fa";

export const adminSideBarLinks = [
  {
    heading: "",
    links: [
      {
        name: "Dashboard",
        icon: <MdSpaceDashboard />,
        link: "/admin/dashboard",
      },
      {
        name: "Products",
        icon: <FaGraduationCap />,
        link: "/admin/dashboard/products",
      },
      {
        name: "Users",
        icon: <ImUsers />,
        link: "/admin/dashboard/users",
      },
      {
        name: "Messages",
        icon: <AiFillMessage />,
        link: "/admin/dashboard/messages",
      },
      {
        name: "Orders",
        icon: <RiEditCircleLine />,
        link: "/admin/dashboard/orders",
      },
      {
        name: "Settings",
        icon: <RiSettingsLine />,
        link: "/admin/dashboard/settings",
      },
    ],
  },
];
