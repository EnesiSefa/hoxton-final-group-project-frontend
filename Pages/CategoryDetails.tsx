import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { port } from "../src/port";
import { Category } from "../src/type";
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
      {category?.courses.map((course) => (
        <div>
          <Link to={`/courses/${course.id}`}>
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
    </div>
  );
}
