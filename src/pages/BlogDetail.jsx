import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router";
import usePost from "../hooks/useApi";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams(); // untuk mendapatkan id
  const [post, setPost] = useState(null); // untuk menandakan loading
  const [isLoading, setIsLoading] = useState(true); //untuk status loadingnya
  const [error, setError] = useState(null); // untuk error handling


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPost(); 
  }, [id]); 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>; 
  }

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => window.history.back()}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div className="card shadow-sm p-4">
        <img src={post.img} alt="Blog image" className="card-img-top" />
        <h1 className="card-title text-center">{post.title}</h1>
        <p className="card-text text-muted text-center">{post.desc}</p>
        <hr />
        <div className="card-body">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
