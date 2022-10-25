import React from "react";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DetailPage() {
  const [course, setCourse] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4167/course/${params.id}`)
      .then((resp) => resp.json())
      .then((pizzaFromServer) => setCourse(pizzaFromServer));
  }, []);
  if (course === null) return <h2>Loading...</h2>;
  return (
    <div className="detail">
      <div className="detail-section">
        <img src={course.image} alt="photot of the cours" width={500} />

        <div className="detail-container">
          <h2>{course.title}</h2>
          <p className="detail-description">{course.description}</p>
          {/* <p className="detail-type"> Type: {course.type}</p> */}
          <h4 className="detail-price">Price: {course.price}$</h4>
        </div>
      </div>

      <button className="add-to-cart-button">
        Add to cart
      </button>
 
    </div>
  );
}