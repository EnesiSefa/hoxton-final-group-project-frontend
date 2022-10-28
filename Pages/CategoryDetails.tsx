import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { port } from "../src/port";
import { Category, Course, Instructor, User } from "../src/type";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

type Props = {
  currentUser: User | null;
  refreshPage: any;

  currentInstructor: Instructor | null;
  signOutUser: () => void;
};
export function CategoryDetails({
  currentUser,
  refreshPage,
  currentInstructor,
  signOutUser,
}: Props) {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  useEffect(() => {
    fetch(`http://localhost:${port}/categories/${params.id}`)
      .then((resp) => resp.json())
      .then((singleCategory) => setCategory(singleCategory));
  }, []);
  return (
    <>
      <Header
        currentUser={currentUser}
        signOutUser={signOutUser}
        currentInstructor={currentInstructor}
      />
      <div className="category-details">
        {category?.courses.map((course: Course) => (
          <div>
            <Link
              to={`/course/${course.id}`}
              style={{ textDecoration: `none` }}
            >
              <h1 className="category-title">{course.title}</h1>
              <img
                className="category-image"
                src={course.image}
                alt=""
                key={category.id}
              />
            </Link>
          </div>
        ))}
        <Footer />
      </div>
    </>
  );
}
