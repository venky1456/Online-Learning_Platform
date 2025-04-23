import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import for prop types validation
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import CoursesPage from "./pages/CoursesPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import SelectedCoursesPage from "./pages/SelectedCoursesPage";
import PreLoginNavbar from "./components/PreLoginNavbar";
import PostLoginNavbar from "./components/PostLoginNavbar";
import EnrolledCoursesPage from "./pages/EnrolledCoursesPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddCoursePage from "./pages/AddCoursePage";
import UpdateCoursePage from "./pages/UpdateCoursePage";
import InstructorPage from "./pages/InstructorPage";
import InstructorDashboard from "./components/InstructorDashboard";
import MyCoursesPage from "./pages/MyCoursesPage";
import ApproveOrDisapproveInstructors from "./pages/ApproveOrDisapproveInstructors";
import EditUser from "./components/EditUser";
import DeleteUsersPage from "./pages/DeleteUsersPage";
import ViewAllUsersPage from "./pages/ViewAllUsersPage";
import PaymentHistory from "./components/PaymentHistory";
import EditInstructor from "./components/EditInstructor";
import AllInstructorsPage from "./pages/AllInstructorsPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const ProtectedRoute = ({ element, roles }) => {
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/register" />;
    return element;
  };

  // Add prop types validation for ProtectedRoute
  ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  };

  return (
    <Router>
      {user ? <PostLoginNavbar user={user} /> : <PreLoginNavbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashboardPage user={user} />} />}
        />
        <Route
          path="/payment/:courseId"
          element={<ProtectedRoute element={<PaymentPage />} />}
        />
        <Route
          path="/selected-courses"
          element={<ProtectedRoute element={<SelectedCoursesPage />} />}
        />
        <Route
          path="/enrolled-courses"
          element={<ProtectedRoute element={<EnrolledCoursesPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />

        {/* Instructor Routes */}
        <Route
          path="/instructor"
          element={<ProtectedRoute element={<InstructorPage />} roles={["instructor"]} />}
        />
        <Route
          path="/my-courses"
          element={<ProtectedRoute element={<MyCoursesPage />} roles={["instructor"]} />}
        />
        <Route
          path="/add-course"
          element={<ProtectedRoute element={<AddCoursePage />} roles={["instructor"]} />}
        />
        <Route
          path="/update-course/:id"
          element={<ProtectedRoute element={<UpdateCoursePage />} roles={["instructor"]} />}
        />
        <Route
          path="/instructor-dashboard"
          element={<ProtectedRoute element={<InstructorDashboard />} roles={["instructor"]} />}
        />

        {/* Admin Routes */}
        <Route
          path="/user-details"
          element={<ProtectedRoute element={<UserDetailsPage />} roles={["admin"]} />}
        />
        <Route
          path="/approve-instructors"
          element={<ProtectedRoute element={<ApproveOrDisapproveInstructors />} roles={["admin"]} />}
        />
        <Route
          path="/edit-user-details/:id"
          element={<ProtectedRoute element={<EditUser />} roles={["admin"]} />}
        />
        <Route
          path="/delete-users"
          element={<ProtectedRoute element={<DeleteUsersPage />} roles={["admin"]} />}
        />
        <Route
          path="/view-user/:id"
          element={<ProtectedRoute element={<ViewAllUsersPage />} roles={["admin"]} />}
        />
        <Route
          path="/view-payment-history"
          element={<ProtectedRoute element={<PaymentHistory />} roles={["admin"]} />}
        />
        <Route
          path="/edit-instructor-details/:id"
          element={<ProtectedRoute element={<EditInstructor />} roles={["admin"]} />}
        />
        <Route
          path="/view-instructors"
          element={<ProtectedRoute element={<AllInstructorsPage />} roles={["admin"]} />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
