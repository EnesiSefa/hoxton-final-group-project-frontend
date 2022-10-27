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
  setSelectedCourse: (course:Course) => void;
};
export function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(`http://localhost:${port}/courses`)
      .then((resp) => resp.json())
      .then((coursesFromServer) => setCourses(coursesFromServer));
  }, []);
  console.log(courses);
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );
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
    
    <section className="courses" >
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
                <h4 className="courseName">{`${course.title.slice(0,55)}`}</h4>
                <p>...</p></div>
                <p className="courseDesc">{`${course.description.slice(0,100)} ${"..."}`}$</p>
                <h2 className="coursePrice">{course.price}$</h2>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <Footer/>
    </section>
   
  );
}