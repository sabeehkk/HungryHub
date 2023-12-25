import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAxios } from "../../axios/axios";
import { io } from "socket.io-client";
function UserChat() {
  const user = useSelector((state:any) => state.userAuth);
  const [chatPerson, setChatPerson] = useState([]);
  const [Userdetails, setUserdetails] = useState({});
  const location = useLocation();
  const messageRef = useRef();
  const data = import.meta.env.VITE_USER_BACKEND_URL;
  const socket = io(data);
  useEffect(() => {
    socket.on("receiveMessage", () => {
      const id = location.state;
      userAxios.get(`/getchat?id=${id}`).then((res) => {
        setChatPerson(res.data.findChat[0].chat);
      });
    });
    const id = location.state;
    userAxios.get(`/getchat?id=${id}`).then((res) => {
      setUserdetails(res.data.findChat[0].userId);
      setChatPerson(res.data.findChat[0].chat);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  const handleMessage = () => {
    const test = messageRef.current.value;
    const chat = {
      user: test,
      employee: "",
    };
    userAxios
      .post(`/saveChat`, { chat, orderId: location.state })
      .then((response) => {
        socket.emit("sentMessage");
        const items = response?.data?.orderItems;
      });
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <ul className="overflow-auto h-[20rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={Userdetails.profilePicture}
                  alt="username"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                      {Userdetails.name}
                    </span>
                    <span className="block ml-2 text-sm text-gray-600">
                      25 minutes
                    </span>
                  </div>
                  <span className="block ml-2 text-sm text-gray-600"></span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className=" hidden lg:col-span-2 lg:block">
          <div className="w-full ">
            <div className="relative bg-gray-100 flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={Userdetails.profilePicture}
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">
                {Userdetails.name}
              </span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className=" relative w-full p-6 overflow-y-auto h-[25rem]">
              <ul className="space-y-2">
                {chatPerson.map((val, index) => (
                  <>
                    {val.user == "" ? (
                      <li key={index} className="flex justify-start">
                        <div className="relative bg-blue-200 max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                          <span className="block">{val.employee}</span>
                        </div>
                      </li>
                    ) : (
                      <li key={index} className="flex justify-end">
                        <div className="relative bg-blue-200 max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                          <span className="block">{val.user}</span>
                        </div>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Enter Message"
                ref={messageRef}
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />
              <button onClick={handleMessage} type="submit">
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserChat;
