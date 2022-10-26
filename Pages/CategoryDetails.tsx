import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
          <h1>{course.title}</h1>
          <img src={course.image} alt="" />
        </div>
      ))}
    </div>
  );
}
