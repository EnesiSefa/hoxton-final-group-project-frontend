export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  balance: number | undefined;
  carts : CartItem[]
  reviews: Review[];
};

export type Instructor = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  courses: Course[];
};
export type Course = {
  id: number;
  title: string;
  category: Category;
  categoryId: number;
  instructor: Instructor;
  instructorId: number;
  reviews: Review[];
  image: string;
  description: string;
  price: number;
};

export type Category = {
  id: number;
  name: string;
  courses: Course[];
};
export type Review = {
  id: number;
  review: string;
  user: User;
  userId: number;
  course: Course;
  courseId: number;
};

export type CartItem = {
  id: number;
  user: User;
  course: Course;
  userId: number;
  courseId: number;
};

export type BoughtCourse = {
  id: number;
  user: User;
  course: Course;
  userId: number;
  courseId: number;
};
