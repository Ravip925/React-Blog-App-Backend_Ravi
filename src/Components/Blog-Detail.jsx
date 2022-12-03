import React from "react";
import "./Compo.css";
import { useLayoutEffect, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const BlogDetail = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://react-blog-app-backend-git-main-ravip925.vercel.app/api/home")
        .then((response) => response.json())
        .then((data) => setData(data));
      setLoading(true);
    };
    getData();
  }, []);


  const { id } = useParams();

  const blog = data && data.find((blog) => blog.id === parseInt(id));

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      {
        loading ? 
        <>
          <center className="full-center">
        <h2 id="detail-title">{blog.title}</h2>
        <img src={blog.image} alt="cover" className="full-img" />
        <h6 className="full-date">
          <strong>{blog.category}</strong> <br />
          {blog.date}
        </h6>
        <div className="full-body">{blog.body}</div>
        <div className="full-line"></div>
      </center>

      <h2 className="bottom-h2">Read More From {blog.category}</h2>
      <div className="highlight"></div>
      {data
        .filter((data) => data.category === blog.category)
        .map(
          (data, index) =>
            index < 5 && (
              <div key={index} className="bottom-div">
                {
                  <NavLink className="link" to={`/${blog.category}/${data.id}`}>
                    <img src={data.image} alt="cover" className="bottom-img" />
                    <h5 className="bottom-title">{data.title}</h5>
                    <p className="bottom-desc">{data.description}</p>
                  </NavLink>
                }
                <div className="bottom-hrLine"></div>
              </div>
            )
        )}
        </>
        :
        <center>
          <br /><br /><br /><br />
          <Spinner animation="border" variant="danger" /><br /><br />
          <h3>Loading...</h3>
        </center>
      }
    </div>
  );
};

export default BlogDetail;
