import React from "react";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { port } from "../src/port";
import { Course, Review, User } from "../src/type";
type Props = {
  currentUser: User | null;
  setSelectedCourse: () => void;
};
type CartItem = {
  id: number;
  pizzaId: number;
};
export function DetailPage({ currentUser, setSelectedCourse }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:${port}/course/${params.id}`)
      .then((resp) => resp.json())
      .then((courseFromServer) => setCourse(courseFromServer));
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

      <button
        className="add-to-cart-button"
        onClick={() => {
          fetch(`http://localhost:${port}/cartItem`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: course.id,
              userId: currentUser?.id,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.errors) {
                alert(data.errors);
              } else {
                setCartItem(data);
                navigate("/cart");
              }
            });
        }}
      >
        Add to cart
      </button>
      <div className="reviews-section">
        <ul>
          {course.reviews.map((review) => (
            <li>
              <h3>{review.user.name}</h3>
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
                  } else {
                    fetch(`http://localhost:${port}/course/${params.id}`)
                      .then((resp) => resp.json())
                      .then((courseFromServer) => setCourse(courseFromServer));
                  }
                });
              // @ts-ignore
              e.target.reset();
            }}
          >
            <label htmlFor="review">
              <input type="text" id="review" name="review" />
            </label>
            <button type="submit">post</button>
          </form>
        ) : (
          <></>
        )}
      </div>
      <Footer/>
    </div>
  );
}
