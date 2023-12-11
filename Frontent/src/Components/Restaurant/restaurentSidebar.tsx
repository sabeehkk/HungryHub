import { Link } from "react-router-dom";
import { useState } from "react";
import { menu } from "@material-tailwind/react";
import { BiSolidBarChartSquare, BiSolidUserRectangle,BiFoodMenu,BiCategory } from 'react-icons/bi'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { MdSettingsApplications, MdOutlineFastfood } from 'react-icons/md'
const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Dashboard",
      icon: <BiSolidBarChartSquare/>,
      url: "/restaurent/home",
    },

    {
      title: "Profile",
      icon: <BiSolidUserRectangle/>,
      url: "/restaurent/restaurentProfile",
    },
    {
      title: "Category",
      icon: <BiCategory/>,
      gap: true,
      url: "/restaurent/categoryAddingModal",
    },
    {
      title: "Add Menu Items ",
      icon: <AiOutlinePlusSquare/>,
      url: "/restaurent/addProduct",
    },
    {
      title: "Menu Items ",
      icon: <MdOutlineFastfood/>,
      url: "/restaurent/products",
    },
    // {
    //   title: "Orders ",
    //   icon: <BiFoodMenu/>,
    //   url: "/restaurent/orders",
    // },
    {
      title: "Logout ",
      icon: <BiSolidUserRectangle/>,
      url: "/restaurent/logout",
    },
    {
      title: "Logout ",
      icon: <BiSolidUserRectangle/>,
      url: "/restaurent/orders",
    },

    // { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex sticky top-0">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          {/* <img
            src={"https://cdn-icons-png.flaticon.com/512/3075/3075977.png"}
            alt="User"
            className=" md:h-9 md:w-9 rounded-full"
          /> */}
          <h1
            className={`text-white origin-left font-semibold text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Hungry 
            <span className='font-bold '>Hub </span>
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
                {/* <img
                  src={`${Menu.src}`}
                  alt="User"
                  className=" md:h-7 md:w-9 rounded-full"
                /> */}
                 <span className='text-2xl'>{Menu.icon}</span>
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
