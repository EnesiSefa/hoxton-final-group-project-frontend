import React from "react";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { port } from "../src/port";
import { Course, Review, User } from "../src/type";
type Props = {
  currentUser: User | null;
};
export function DetailPage({ currentUser }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:${port}/course/${params.id}`)
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

      <button className="add-to-cart-button">Add to cart</button>
      <div className="reviews-section">
        <ul>
          {course.reviews.map((review) => (
            <li>
              <p>{review.review}</p>
            </li>
          ))}
        </ul>
        {currentUser ? (
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();

              const data = {
                userId: currentUser?.id,
                courseId: course.id,
                // @ts-ignore
                review: e.target.review.value,
              };

              fetch(`http://localhost:${port}/review`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  if (data.error) {
                    alert(data.error);
                    console.log(data.error);
                  }
                });
              
            }}
          >
            <label htmlFor="review">
              <input type="text" id="review"  name="review" />
            </label>

            <button type="submit">post</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
