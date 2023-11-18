import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateData } from "../../redux/user/authSlice";
import { data } from "autoprefixer";

function imageUpdateDemo() {
  const { user } = useSelector((state: any) => state.userAuth);
  // const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const userData = user;
  const dispatch = useDispatch();
  const [demo, setDemo] = useState('');

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const images = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        });
      })
    );
    setImages(images);
  };
  

  // const handleImageChange = async(e:SyntheticEvent) => {
  //   setImage(e.target.files[0]);
  // };

  // const handleImageChange = async (e: SyntheticEvent) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };
  // };

  // const handleSubmit = async (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   console.log(  image)
  //   try {
  //     const data = await axios.post("http://localhost:3000/uploadImage", formData);
  //     setDemo(data.data.data);
  //     alert(data.data.data)
  //     console.log("Image uploaded successfully!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("image", image);
          await axios.post("http://localhost:3000/uploadImage", formData);
        })
      );
      console.log("Images uploaded successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  
  // const handleSubmit = async (e:SyntheticEvent) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   if (image) {
  //     formData.append("image", image);
  //   } else {
  //     formData.append("image", userData?.image);
  //   }
  //   console.log(formData);
  //   try {
  //     await axios
  //       .post("http://localhost:3000/uploadImage", formData)
  //       .then((result) => {
  //         console.log(result, "dataaaaaaaaaaaaaaa");
  //         if (result.data.message === "success") {
  //           console.log(result.data.message, "testing state");
  //           dispatch(updateData(data));
  //           return;
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div>
        <span>fffffffffff<img src={demo} alt="" /> </span>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* {image ? (
            <img
              className="w-20 h-20 rounded-full"
              src={URL.createObjectURL(image)}
              alt="posts"
            />
          ) : (
            <img
              className="w-20 h-20 rounded-full"
              src={"http://localhost:3000/images/" + userData?.image}
              alt="posts"
            />
          )} */}
          {/* <input
            type="file"
            name="image"
            className="py-5"
            onChange={handleImageChange}
          /> */}

{/* <input
  type="files"
  name="image"
  className="py-5"
  onChange={handleImageChange}
/> */}

<input
  type="file"
  name="images"
  className="py-5"
  onChange={handleImageChange}
  multiple
/>



          {/* <input type="file" className="py-5" onChange={(e) => setImage(e.target?.files[0])} /> */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default imageUpdateDemo;
