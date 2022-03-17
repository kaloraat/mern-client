import { useState, useEffect } from "react";
import axios from "axios";

const usePost = () => {
  // state
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("/posts/1");
        setLatestPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    // execute
    getPosts();
  }, []);

  return {
    latestPosts,
  };
};

export default usePost;
