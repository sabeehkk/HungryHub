import { Link } from "react-router-dom";
import { useState } from "react";
import { menu } from "@material-tailwind/react";
import {
  BiSolidBarChartSquare,
  BiSolidUserRectangle,
  BiFoodMenu,
} from "react-icons/bi";
interface MenuItem {
  title: string;
  icon: JSX.Element;
  url: string;
  gap?: boolean; // Add gap property as an optional boolean
}
const App = () => {
  const [open, setOpen] = useState(true);
  const Menus : MenuItem[] =  [
    {
      title: "Dashboard",
      icon: <BiSolidBarChartSquare />,
      url: "/employee/home",
    },

    {
      title: "Profile",
      icon: <BiSolidUserRectangle />,
      url: "#",
    },
    {
      title: "Orders ",
      icon: <BiFoodMenu />,
      url: "/employee/deliveryHistory",
    },
    {
      title: "Logout ",
      icon: <BiSolidUserRectangle />,
      url: "/employee/logout",
    },
  ];

  return (
    <div className="flex sticky top-0">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-700 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
         
          <h1
            className={`text-white origin-left font-semibold text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Hungry
            <span className="font-bold ">Hub </span>
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link to={Menu.url} className="flex items-center gap-x-2 w-full">
              
                <span className="text-2xl">{Menu.icon}</span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default App;
