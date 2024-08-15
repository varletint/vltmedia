import { useEffect, useState } from "react";
import { Modal, Spinner, Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Loading from "./Loading";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/comment/getComments");
        const data = await res.json();

        if (res.ok) {
          // setLoading(false);
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          if (data.comments.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getComments?startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 5) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // if (loading)
  //   return (
  //     <>
  //       <Loading />;
  //     </>
  //   );
  // return (
  //   <div className=' min-h-screen flex  justify-center items-centerw-full mx-auto max-w-3xl'>
  //     <Spinner size={"xl"} color={"success"} />
  //   </div>
  // );

  return (
    <>
      {/* {loading && <Loading />} */}
      <div
        className=' table-auto overflow-x-scroll p-3 scrollbar font-[poppins]
      scrollbar-track-slate-100 scrollbar-thumb-slate-300 md:mx-auto
      '>
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <div className=' px-3 mb-3 font-semibold'>
              <p>Total comments ({totalComments})</p>
            </div>
            <Table className=' text-sm'>
              <Table.Head>
                <Table.HeadCell className=''>Date updated</Table.HeadCell>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>PostId</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>

              {comments.map((comment) => (
                <Table.Body key={comment._id}>
                  <Table.Row className=''>
                    <Table.Cell>
                      {new Date(comment.updatedAt).toDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span
                        className=' text-red-500 font-semibold
                      cursor-pointer'
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}>
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                className='w-full text-teal-500 self-center p-7'
                onClick={handleShowMore}>
                Show more
              </button>
            )}
          </>
        ) : (
          <div className=''>No comments yets</div>
        )}

        <Modal
          show={showModal}
          popup
          size={"md"}
          onClose={() => setShowModal(false)}>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className=' w-14 h-14 text-gray-500 mb-4 mx-auto' />
              <h3
                className=' text-xl font-semibold
            text-gray-500'>
                Are you sure want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4 mt-5'>
                <button
                  className=' px-4 py-1 bg-red-600 text-white
               font-semibold border-[2px] border-red-700 
               hover:bg-red-700 transition-all duration-300
               rounded
               shadow-xl'
                  onClick={handleDeleteComment}>
                  Yes, I'm sure
                </button>
                <button
                  className='px-4 py-1 bg-gray-500 text-white
               font-semibold border-[1px] border-gray-600 
               hover:bg-gray-600 transition-all duration-300
               rounded
               shadow-xl'
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
