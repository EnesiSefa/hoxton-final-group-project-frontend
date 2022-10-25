import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Course, Instructor, User } from "../src/type";
// import { CoursesCard } from "../components/CoursesCard";
import { port } from "../src/port";
import { Link } from "react-router-dom";

type Props = {
  currentUser: User | null;
  signOutUser: () => void;
  currentInstructor: Instructor | null;
};
export function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch(`http://localhost:${port}/courses`)
      .then((resp) => resp.json())
      .then((coursesFromServer) => setCourses(coursesFromServer));
  }, []);
  console.log(courses);
  return (
    // <div>
    //   <h1>Home Page</h1>
    //   <Header
    //     currentUser={currentUser}
    //     signOutUser={signOutUser}
    //     currentInstructor={currentInstructor}
    //   />
    //   <main></main>
    //   <footer></footer>
    // </div>
    <section>
      <ul className="courses-ul">
        {courses.map((course) => (
          <li className="courses">
            <Link
              to={`/course/${course.id}`}
              style={{ textDecoration: `none` }}
            >
              <article className="courses-item">
                <img src={course.image} alt={course.title} width="100" />
                <h4>{course.title}</h4>
                <h2>{course.price}$</h2>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
