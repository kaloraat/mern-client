import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LoadingToRedirect = ({ path = "/" }) => {
  const [count, setCount] = useState(3);
  let router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && router.push(path);
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <p
        style={{
          position: "absolute",
          top: "50%",
        }}
      >
        Redirecting in {count} second
      </p>
    </div>
  );
};

export default LoadingToRedirect;
