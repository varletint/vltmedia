import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(data.message);
    }
  }, [postId]);

  // Image upload function
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Image must be selected");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image failed to upload");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image failed to upload");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}
        `,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (data.success === false) {
        setPublishError(data.message);
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className=' p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className=' text-center text-3xl my-7 font-semibold'>
        Update a Post
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            required
            id='title'
            value={formData.title}
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}>
            <option value='uncategorized'>Select a category</option>
            <option value='entertainment'>Entertainments</option>
            <option value='politics'>Politics</option>
            <option value='sport'>Sports/Football</option>
            <option value='Education'>Education</option>
          </Select>
        </div>
        <div
          className='flex gap-4 items-center justify-between
        border-4 border-gray-400 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            type='button'
            className='bg-black-border btn-long
            btn-rounded hover:text-white font-semibold text-sm
            text-black
          '
            size='sm'
            onClick={handleUploadImage}
            outline
            disabled={imageUploadProgress}>
            {imageUploadProgress ? (
              <div className=' h-10 w-10'>
                <CircularProgressbar
                  styles={buildStyles({
                    backgroundColor: "#12a32d",
                    pathColor: "#12a32d",
                    textColor: "#12a32d",
                    trailColor: "",
                  })}
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </button>
        </div>
        {imageUploadError && (
          <Alert color={"failure"}> {imageUploadError} </Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt='Upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className=' h-72 mb-12'
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
          required
        />
        {/* <JoditEditor
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        /> */}
        <button
          className='btn btn-long btn-rounded'
          type='submit'
          gradientDuoTone='greenToBlue'>
          Update Post
        </button>
        {publishError && <Alert color='failure'> {publishError} </Alert>}
      </form>
    </div>
  );
}
