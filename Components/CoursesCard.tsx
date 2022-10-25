import React from "react";
import { Link } from "react-router-dom";
export function CoursesCard({ courses }) {
  return (
    <div>
      <li className="courses">
        <Link to={`/course/${courses.id}`} style={{ textDecoration: `none` }}>
          <article className="courses-item">
            <img src={`${courses.image}`} alt={courses.name} width="100" />
            <h4>{courses.title}</h4>
            <h2>{courses.price}$</h2>
          </article>
        </Link>
      </li>
    </div>
  );
}

// test
