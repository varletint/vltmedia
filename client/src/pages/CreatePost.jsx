import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { React, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
("react-router-dom");

export default function CreatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
    <div className=" p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className=" text-center text-3xl my-7 font-semibold">
        Create a Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            required
            id="title"
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value="uncategorized">Select a category</option>
            <option value="Javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="reactjs">React.js</option>
          </Select>
        </div>
        <div
          className="flex gap-4 items-center justify-between
        border-4 border-gray-400 border-dotted p-3"
        >
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone={"greenToBlue"}
            size="sm"
            outline
          >
            Upload image
          </Button>
        </div>
        {/* <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className=" h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          required
        /> */}
        <JoditEditor
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="greenToBlue">
          Publish
        </Button>
        {publishError && <Alert color="failure"> {publishError} </Alert>}
      </form>
    </div>
  );
}
