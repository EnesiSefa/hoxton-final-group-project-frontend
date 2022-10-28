import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { port } from "../src/port";
import { Category, Course } from "../src/type";
import { Footer } from "../Components/Footer";

export function CategoryDetails() {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  useEffect(() => {
    fetch(`http://localhost:${port}/categories/${params.id}`)
      .then((resp) => resp.json())
      .then((singleCategory) => setCategory(singleCategory));
  }, []);
  return (
    <div className="category-details">
      {category?.courses.map((course: Course) => (
        <div className="courses-category">
          <Link to={`/course/${course.id}`} style={{ textDecoration: `none` }}>
            <img
              className="category-image"
              src={course.image}
              alt=""
              key={category.id}
            />
             <h1 className="category-title">{course.title}</h1>
          </Link>
        </div>
      ))}
      {/* <Footer/> */}
    </div>
  );
}
