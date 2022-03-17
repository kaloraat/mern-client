import { useState, useEffect } from "react";

import axios from "axios";

const useNumbers = () => {
  // state
  const [numbers, setNumbers] = useState({});

  useEffect(() => {
    getNumbers();
  }, []);

  const getNumbers = async () => {
    try {
      const { data } = await axios.get("/numbers");
      console.log(data);
      setNumbers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { numbers };
};

export default useNumbers;
