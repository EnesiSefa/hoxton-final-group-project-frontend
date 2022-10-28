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
    <div className="category-page">
      <Header
        currentUser={currentUser}
        signOutUser={signOutUser}
        currentInstructor={currentInstructor}
      />
      <h1 className="category-name">{category?.name}</h1>
      <div className="category-details">
        {category?.courses.map((course: Course) => (
          <div className="category-det">
            <Link
              to={`/course/${course.id}`}
              style={{ textDecoration: `none` }}
            >
              <div>
                <img
                className="course-img"
                src={course.image}
                alt=""
                key={category.id}
              />
              </div>
              <div>
              <h5 className="courseName">{course.title}</h5>
              <p className="courseDesc">{`${course.description.slice(0, 100)} ${"..."}`}$</p>
                      <h2 className="coursePrice">{course.price}$</h2>
                      </div>
            </Link>
          </div>
        ))}
       
      </div>
      <Footer />
    </div>
  );
}
