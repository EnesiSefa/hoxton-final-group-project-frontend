import React from "react";
import { Link } from "react-router-dom";
import { Course } from "../src/type";
type Props={
  course : Course
}
export function CoursesCard({ course }: Props) {
  return (
    <div>
      <li className="courses">
        <Link to={`/course/${course.id}`} style={{ textDecoration: `none` }}>
          <article className="courses-item">
            <img src={`${course.image}`} alt={course.title} width="100" />
            <h4>{course.title}</h4>
            <h2>{course.price}$</h2>
          </article>
        </Link>
      </li>
    </div>
  );
}

// test
