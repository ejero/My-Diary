import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Modal, Divider } from "antd";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import jwt_decode from "jwt-decode";

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { postId } = useParams();

  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  // const ownerId = 16;
  const ownerId = decodedToken.id;

  const handleCardClick = (post) => {
    showModal(post);
  };

  const showModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/singlepost/${ownerId}/${postId}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
  }, [ownerId, postId]);

  useEffect(() => {
    console.log("decoded token", decodedToken);
    console.log("ownerId", ownerId);

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4004/viewposts/${ownerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error! Response Error");
        }
        const postInfo = await response.json();
        setPosts(postInfo);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/posts/${ownerId}/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error! Response Error");
      }
      // Update state or do something else
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="viewContainer">
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: "1px",
              boxShadow: "0px 0px 5px 0px #dcdcdc",
            }}
          >
            <p
              style={{
                backgroundColor: "#AFD8E5",
                color: "DarkBlue",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {post.title}
            </p>
            {/* <p style={{ padding: "3px" }}>{post.content}</p> */}
            <p
              style={{
                marginBottom: "2px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {post.content.split(" ").slice(0, 18).join(" ")}
            </p>
            <IconTrash
              size={20}
              key="delete"
              style={{
                color: "red",
                marginRight: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              onClick={handleDelete}
            />
            <IconEdit size={20} key="edit" style={{ color: "gray" }} />
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewPosts;
