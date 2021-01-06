import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Admin Login",
    path: "#",
    icon: <RiIcons.RiAdminLine />,
    iconClosed: <RiIcons.RiArrowDropDownFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "User",
        path: "#",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Password",
        path: "#",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];

export const SidebarData_2 = [
  {
    title: "Add Completed Projects",
    path: "/add_completed_project",
    icon: <AiIcons.AiFillFileAdd/>,
  },
  {
    title: "View Completed Projects",
    path: "/admin_completed_projects",
    icon: <AiIcons.AiOutlineFileDone />,
  },
  {
    title: "Add Current Projects",
    path: "/add_current_project",
    icon: <AiIcons.AiOutlineDoubleRight/>,
  },
  {
    title: "View Current Projects",
    path: "/admin_current_projects",
    icon: <AiIcons.AiOutlineFieldTime />,
  },
];