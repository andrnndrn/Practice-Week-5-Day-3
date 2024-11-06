import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import axios from "axios"

const BlogList = () => {
  // untuk menyimpan data artikernya
  const [posts, setPosts] = useState([]); 
  // untuk status loading
  const [isLoading, setIsLoading] = useState(true); 
  // untuk error handling
  const [error, setError] = useState(null);

  const navigate = useNavigate(); //hook untuk navigasi
  const location = useLocation(); // untuk mendapatkan lokasi 

  const postsPerPage = 6; // mengatur artikel per halaman

  // Get the current page from the query parameter or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  
  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data); // menyimpan data ke post
        setIsLoading(false); // mengubah loading menjadi false
      } catch (error) {
        setError(error.message); 
        setIsLoading(false);
      }
    };

    fetchData(); // untuk mengambil data dari API
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // untuk memunculkan artikel pada halaman saat ini
  const startIndex = (initialPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // untuk penggunaan navigasi ke halaman berikutnya
  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <section className="row">
        {currentPosts.map((posts) => (
          <div className="col-md-6 col-lg-4 mb-4" key={posts.id}>
            <Link to={`/post/${posts.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src={posts.img}
                  className="card-img-top img-cstm"
                  alt={posts.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{posts.title}</h5>
                  <p className="card-text text-muted">{posts.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      {/* Navigasi Halaman */}
      <div className="d-flex justify-content-center mt-4">
        {initialPage > 1 && (
          <button
            onClick={() => handlePageChange(initialPage - 1)}
            className="btn btn-outline-primary me-2"
          >
            <i className="bi bi-arrow-left"></i> Previous
          </button>
        )}
        {currentPosts.length === postsPerPage && (
          <button
            onClick={() => handlePageChange(initialPage + 1)}
            className="btn btn-outline-primary"
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
