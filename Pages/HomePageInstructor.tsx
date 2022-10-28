import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Course, Instructor, User } from "../src/type";
// import { CoursesCard } from "../components/CoursesCard";
import { port } from "../src/port";
import { SearchBar } from "../Pages/SearchBar";
import { Link } from "react-router-dom";
import { Home } from "./Home";
import { Footer } from "../Components/Footer";

type Props = {
  currentInstructor: Instructor | null;
  signOutUser: () => void;
};
export function HomePageInstructor({ currentInstructor, signOutUser }: Props) {
  const [search, setSearch] = useState("");
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(`http://localhost:${port}/instructor/${currentInstructor?.id}`)
      .then((resp) => resp.json())
      .then((instructor) => {
        setInstructorCourses(instructor.courses);
      });
  }, []);

  console.log(instructorCourses);

  const filteredCoursesFromInstructor = instructorCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Home Page</h1>
        <Header
          signOutUser={signOutUser}
          currentInstructor={currentInstructor}
          currentUser={null}
        />
        <main></main>
        <footer></footer>
      </div>

      <section className="courses">
        <div className="searchBar">
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="courses-section">
          <ul className="courses-ul">
            {filteredCoursesFromInstructor.map((course) => (
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
        </div>
        <Footer />
      </section>
    </>
  );
}
