import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { postId } = useParams();
  // const { DataId } = useParams();
  // console.log(postId + " poId");
  // console.log(formData.post._id);

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
            <option value='Javascript'>JavaScript</option>
            <option value='html'>HTML</option>
            <option value='reactjs'>React.js</option>
          </Select>
        </div>
        <div
          className='flex gap-4 items-center justify-between
        border-4 border-gray-400 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />

          <button
            type='button'
            className='bg-black-border btn-long
            btn-rounded hover:text-white font-semibold text-sm
            text-black
          '
            size='sm'
            outline>
            Upload image
          </button>
        </div>{" "}
        {/* {formData.image && (
          <img
            src={formData.image}
            alt='Upload'
            className='w-full h-72 object-cover'
          />
        )} */}
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
