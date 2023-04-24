import { useEffect, useState } from "react";
import { Card, Modal } from "antd";
import { IconTrash, IconEdit } from "@tabler/icons-react";
//import jwt_decode from "jwt-decode";

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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
    const token = localStorage.getItem("token");
    // const decodedToken = jwt_decode(token);
    const ownerId = 16;

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            paddingTop: "24px",
          }}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              style={{
                width: 255,
                marginBottom: "16px",
                boxShadow: "0px 0px 5px 0px #dcdcdc",
              }}
              title={
                <div onClick={() => handleCardClick(post)}>{post.title}</div>
              }
              headStyle={{ backgroundColor: "#AFD8E5", color: "DarkBlue" }}
              bodyStyle={{ padding: "8px" }}
            >
              {expandedCardId === post.id ? (
                <p>{post.content}</p>
              ) : (
                <div>
                  <p>{post.content.split(" ").slice(0, 25).join(" ")}...</p>
                  <IconTrash
                    size={20}
                    key="delete"
                    style={{ color: "red", marginRight: "10px" }}
                  />
                  <IconEdit size={20} key="edit" style={{ color: "gray" }} />
                </div>
              )}
            </Card>
          ))}
        </div>
        {selectedPost && (
          <Modal open={isModalOpen} onClose={handleCancel}>
            <Modal.Title>{selectedPost.title}</Modal.Title>
            <Modal.Content>
              <p>{selectedPost.content}</p>
            </Modal.Content>
          </Modal>
        )}
      </div>
    </>
  );
}

export default ViewPosts;
