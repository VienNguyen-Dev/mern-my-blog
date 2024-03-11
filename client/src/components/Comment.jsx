import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedComment,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex gap-2 p-5 border-b dark:border-gray-600 text-sm">
      <div className=" flex-shrink-0 mr-3">
        <img src={user.profilePicture} alt={user.username} className=" w-10 h-10 rounded-full bg-gray-200" />
      </div>
      <div className="flex-1">
        <div className=" flex items-center mb-1">
          <span className=" font-bold text-xs truncate mr-2">{user ? `@${user.username}` : "anonymous user"}</span>
          <span className=" text-xs text-gray-500">{moment(user.createdAt).fromNow()}</span>
        </div>
        {isEditing ? (
          <>
            <Textarea className="mb-2" maxLength={"200"} onChange={(e) => setEditedComment(e.target.value)} value={editedComment} />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" gradientDuoTone={"purpleToBlue"} size={"sm"} onClick={handleSave}>
                Save
              </Button>
              <Button type="button" gradientDuoTone={"purpleToBlue"} outline size={"sm"} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex gap-2 border-t dark:border-gray-700 max-w-fit p-2 text-xs items-center">
              <button type="button" onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"}`}>
                <FaThumbsUp className=" text-sm" />
              </button>
              <p className=" text-gray-500">{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}</p>
              <button className=" text-gray-400 hover:text-blue-500" onClick={handleEdit}>
                Edit
              </button>
              <button type="button" className=" text-gray-400 hover:text-blue-500" onClick={() => onDelete(comment._id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
