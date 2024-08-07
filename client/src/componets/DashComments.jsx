import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [totalComments, setTotalComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch("/api/comment/getComments");
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          if (data.comments.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
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

  return (
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
                    <span className=' text-red-500 font-semibold'>Delete</span>
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
    </div>
  );
}
