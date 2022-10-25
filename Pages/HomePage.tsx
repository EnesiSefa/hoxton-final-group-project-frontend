import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Course, Instructor, User } from "../src/type";
import { CoursesCard } from "../components/CoursesCard";

type Props = {
  currentUser: User | null;
  signOutUser: () => void;
  currentInstructor: Instructor | null;
};
export function HomePage({signOutUser,currentUser,currentInstructor}:Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch("http://localhost:4167/courses")
      .then((resp) => resp.json())
      //@ts-ignore
      .then((coursesFromServer) => setCourses(coursesFromServer));
  }, []);
  console.log(courses)
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
          {courses.map(course => (
            <CoursesCard key={course.id} course={course} />
          ))}
        </ul>
      </section>
  );
}
