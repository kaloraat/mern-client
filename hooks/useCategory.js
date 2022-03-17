import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  // state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get("/categories");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    // execute
    getCategories();
  }, []);

  return {
    categories,
  };
};

export default useCategory;
