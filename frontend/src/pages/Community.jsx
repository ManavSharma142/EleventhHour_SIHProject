import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

const samplePosts = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=1",
    content: "Just finished a 5km run! Feeling energized 💪",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    content: "Anyone has tips for healthy meal prep?",
    likes: 8,
    comments: 5,
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(samplePosts);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      user: "You",
      avatar: "https://i.pravatar.cc/40?img=3",
      content: newPost,
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Communfsdfdsfity</h1>

      {/* New Post Input */}
      <div className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your progress or ask a question..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
        <button
          onClick={handleAddPost}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center mb-2">
              <img
                src={post.avatar}
                alt={post.user}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold">{post.user}</span>
            </div>
            <p className="mb-3">{post.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-1 hover:text-red-500"
              >
                <FaHeart /> <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaComment /> <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
