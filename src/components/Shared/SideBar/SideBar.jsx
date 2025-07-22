import { useState } from "react";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineSetting,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { GrUserExpert } from "react-icons/gr";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiContactsBook3Fill} from "react-icons/ri";
import { BsPalette } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { ImBlog } from "react-icons/im";
const SideBar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");

  const handleActiveRoute = (item) => {
    setActive(item);
    setOpenDropdown("");
  };

  const handleSubItemClick = (subItem) => {
    setActive(subItem);
    closeDrawer();
  };

  // const toggleDropdown = (item) => {
  //     setActive(item);
  //     setOpenDropdown(openDropdown === item ? "" : item);
  // };
  const toggleDropdown = (label) => {
    // setActive(label);
    setOpenDropdown(openDropdown === label ? "" : label);
  };

  const menuItems = [
    {
      icon: <MdDashboard className="h-5 w-5" />,
      label: "dashboard",
      Link: "/",
    },

    {
      icon: <GiSkills className="h-5 w-5" />,
      label: "Skills",
      Link: "/skills",
    },
    {
      icon: <AiOutlineFundProjectionScreen className="h-5 w-5" />,
      label: "Projects",
      Link: "/projects",
    },
    {
      icon: <GrUserExpert className="h-5 w-5" />,
      label: "Experience",
      Link: "/experience",
    },

    // {
    //   icon: <FaUser className="h-5 w-5" />,
    //   label: "Profile",
    //   Link: "/profile",
    // },
    {
      icon: <ImBlog className="h-5 w-5" />,
      label: "Blogs",
      Link: "/blogs",
    },

    {
      icon: <AiOutlineSetting className="h-5 w-5" />,
      label: "Settings",
      isDropdown: true,
      subItems: [
        {
          icon: <FaEdit className="h-5 w-5" />,
          label: "About Me",
          Link: "/settings/about-us",
        },
        {
          icon: <RiContactsBook3Fill className="h-5 w-5" />,
          label: "Contact Me",
          Link: "/settings/contact-us",
        },

        {
          icon: <BsPalette className="h-5 w-5" />,
          label: "Add Logo And Color ",
          Link: "/settings/add-logo-and-color",
        },
      ],
    },
  ];

  return (
    <div className="bg-white h-[90vh] md:ml-16">
      <div className="flex flex-col md:h-full">
        <div className="flex flex-col gap-2 md:my-5 mb-10">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className={`w-72 flex justify-between items-center px-5 py-2 cursor-pointer rounded-s-2xl  ${
                  active === item.label
                    ? "bg-primary text-white font-semibold"
                    : "bg-white text-black font-semibold"
                }`}
                onClick={() =>
                  item.isDropdown
                    ? toggleDropdown(item.label)
                    : handleActiveRoute(item.label)
                }
              >
                <Link to={item.Link}>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <p>{item.label}</p>
                    {item.isDropdown && (
                      <BiChevronDown
                        className={`transform transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </Link>
              </div>
              {/* Dropdown for sub-items */}
              {item.isDropdown && openDropdown === item.label && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer  ${
                          active === subItem.label
                            ? "text-white bg-primary font-bold"
                            : "text-black "
                        }`}
                        onClick={() => handleSubItemClick(subItem.label)}
                      >
                        <p className="flex items-center gap-2 ml-10">
                          {subItem.icon}
                          {subItem.label}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Logout */}
          <Link className="text-black hover:text-black" to="/sign-in">
            <div
              className="bg-primary w-72 md:mt-60 py-3 flex justify-center items-center cursor-pointer hover:bg-primary text-white"
              onClick={() => console.log("Logged out")}
            >
              <FiLogOut className="text-xl" />
              <p className="ml-2">Log out</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
