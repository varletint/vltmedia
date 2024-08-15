import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Loading from "./Loading";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/post/getposts");
        const data = await res.json();

        if (res.ok) {
          setLoading(false);
          setAllPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchAllPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = allPosts.length;
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setAllPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setLoading(false);
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setAllPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div
        className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
        {loading ? (
          <Loading />
        ) : (
          <>
            {currentUser.isAdmin && allPosts.length > 0 ? (
              <>
                <Table hoverable className=' shadow-md'>
                  <Table.Head>
                    <Table.HeadCell> Date updated</Table.HeadCell>
                    <Table.HeadCell> Post Image</Table.HeadCell>
                    <Table.HeadCell> Post title</Table.HeadCell>
                    <Table.HeadCell> Category</Table.HeadCell>
                    <Table.HeadCell> Delete</Table.HeadCell>
                    <Table.HeadCell>
                      <span>Edit</span>
                    </Table.HeadCell>
                  </Table.Head>

                  {allPosts.map((post) => (
                    <Table.Body className=' divide-y'>
                      <Table.Row>
                        <Table.Cell>
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${post.slug}`}>
                            <img
                              src={post.image}
                              alt={post.title}
                              className=' w-20 h-10 bg-gray-500'
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            className=' font-medium text-gray-900 line-clamp-2'
                            to={`/post/${post.slug}`}>
                            {post.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{post.category}</Table.Cell>
                        <Table.Cell>
                          <span
                            className=' text-red-500 font-medium 
                    hover:underline cursor-pointer'
                            onClick={() => {
                              setShowModal(true);
                              setPostIdToDelete(post._id);
                            }}>
                            Delete
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            className=' text-teal-500 hover:text-gray-900'
                            to={`/update-post/${post._id}`}>
                            <span>Edit</span>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
                </Table>
                {showMore && (
                  <button
                    onClick={handleShowMore}
                    className=' w-full text-teal-500 p-7  self-center'>
                    Show more
                  </button>
                )}
              </>
            ) : (
              <p className='  text-center text-red-500 font-semibold self-center'>
                You have no posts yet
              </p>
            )}
          </>
        )}

        <Modal
          show={showModal}
          size='md'
          onClose={() => setShowModal(false)}
          popup>
          <Modal.Header>
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mx-auto mb-4' />
                <h3 className=' text-gray-400 mb-4'>
                  Are you sure want to delete your post
                </h3>
                <div className=' flex  justify-center gap-4'>
                  <Button onClick={handleDeletePost} color='failure'>
                    Yes, i'm sure
                  </Button>
                  <Button
                    color='green'
                    onClick={() => {
                      setShowModal(false);
                    }}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    </>
  );
}
