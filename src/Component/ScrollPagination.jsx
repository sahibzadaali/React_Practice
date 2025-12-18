import React, { useEffect } from "react";

const ScrollPagination = () => {
  const [posts, setPosts] = React.useState([]);
  console.log("🚀 ~ ScrollPagination ~ posts:", posts);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      { cache: "no-store" }
    );
    const data = await res.json();
    console.log("🚀 ~ fetchData ~ data:", data);
    if (data.length > 0) {
      setPosts(data);
    } else {
      setHasMore(false);
    }
  };
  return (
    <div>
      {posts.map((res) => (
        <h4>{res?.title}</h4>
      ))}
    </div>
  );
};

export default ScrollPagination;
