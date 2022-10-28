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
  currentUser: User | null;
  signOutUser: () => void;
  currentInstructor: Instructor | null;
};
export function HomePage({ currentUser,signOutUser,currentInstructor}: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructor, setInstructor] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:${port}/courses`)
      .then((resp) => resp.json())
      .then((coursesFromServer) => {
        setCourses(coursesFromServer);
      });
    
  }, []);
  useEffect(() => {
    fetch(
      `http://localhost:${port}/instructor/${currentInstructor?.id}/courses`
    )
      .then((resp) => resp.json())
      .then((courses) => {
        setInstructorCourses(courses);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

      <><div>
      <Header
        currentUser={currentUser}
        signOutUser={signOutUser}
        currentInstructor={currentInstructor} />
    </div><section className="courses">
        <div className="searchBar">
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="courses-section">
          <ul className="courses-ul">
            {filteredCourses.map((course) => (
              <li className="courses">
                <Link
                  to={`/course/${course.id}`}
                  style={{ textDecoration: `none` }}
                >
                  <article className="courses-item">
                    <img className="course-img" src={course.image} alt={course.title} width="100" />
                    <div className="name-price">
                      <div className="course-name">
                        <h4 className="courseName">{course.title}</h4>
                        <p>...</p></div>
                      <p className="courseDesc">{`${course.description.slice(0, 100)} ${"..."}`}$</p>
                      <h2 className="coursePrice">{course.price}$</h2>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </section></>
    
  );
}
