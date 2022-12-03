import React from "react";
import { NavLink } from "react-router-dom";
import "./Bollywood.css";
import { useLayoutEffect, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const Fitness = () => {
  const [data, setData] = useState([]);
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

  const x = [17, 25, 37, 47, 7];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div id="main" className="main">
      {loading ? (
        <>
          <h2 className="h2-1">Fitness</h2>
          <hr className="hr-1" />

          {data
            .filter((data) => data.category === "Fitness")
            .map((data, index) => (
              <div key={index} className="bolly-page">
                <NavLink className="link" to={`/fitness/${data.id}`}>
                  <img src={data.image} alt="cover" className="img-bolly" />
                  <h5 id="bolly-h5">{data.title}</h5>
                  <p className="blog-desc">{data.description}</p>
                  <p className="below-date">{data.date}</p>
                  <div className="line-div"></div>
                </NavLink>
              </div>
            ))}

          <aside id="aside-b">
            <h2 className="h2-2">Top Stories</h2>
            <hr className="hr-2" />
            {data
              .filter((data) => x.includes(data.id))
              .map(
                (data, index) =>
                  index < 5 && (
                    <div key={index} className="aside-div">
                      {
                        <NavLink className="link" to={`/bollywood/${data.id}`}>
                          <img
                            src={data.image}
                            alt="cover"
                            className="img-div"
                          />
                          <p>{data.title}</p>
                          <h6>
                            <strong>{data.category}</strong> <br /> {data.date}
                          </h6>
                        </NavLink>
                      }
                    </div>
                  )
              )}
            <a href="https://www.mcdonaldsindia.com/">
              <div className="ad"></div>
            </a>
          </aside>
          <div id="footer-page" className="footer">
            <small>Copyright &copy; Ravichandra Patil</small>
          </div>
        </>
      ) : (
        <center>
          <Spinner animation="border" variant="danger" />
          <br />
          <br />
          <h3>Loading...</h3>
        </center>
      )}
    </div>
  );
};

export default Fitness;
