import { Link } from "react-router-dom";
import { useState } from "react";
import { menu } from "@material-tailwind/react";
const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Dashboard",
      src: "https://cdn-icons-png.flaticon.com/512/5974/5974636.png",
      url: "/restaurent/home",
    },

    {
      title: "Profile",
      src: "https://cdn-icons-png.flaticon.com/512/560/560277.png",
      url: "#",
    },
    {
      title: "Category",
      src: "https://cdn-icons-png.flaticon.com/512/209/209116.png",
      gap: true,
      url: "/restaurent/addCategory",
    },
    {
      title: "Add Menu Items ",
      src: "https://cdn-icons-png.flaticon.com/512/9612/9612679.png",
      url: "/restaurent/addProduct",
    },

    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
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
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3075/3075977.png"}
            alt="User"
            className=" md:h-9 md:w-9 rounded-full"
          />
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
                <img
                  src={`${Menu.src}`}
                  alt="User"
                  className=" md:h-7 md:w-9 rounded-full"
                />
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
