import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import CoursesPage from './pages/CoursesPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import SelectedCoursesPage from './pages/SelectedCoursesPage';
import PreLoginNavbar from './components/PreLoginNavbar';
import PostLoginNavbar from './components/PostLoginNavbar';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';
import UserDetailsPage from './pages/UserDetailsPage';
import AddCoursePage from './pages/AddCoursePage';
import UpdateCoursePage from './pages/UpdateCoursePage';
import InstructorPage from './pages/InstructorPage';
import InstructorDashboard from './components/InstructorDashboard';
import MyCoursesPage from './pages/MyCoursesPage';
import ApproveOrDisapproveInstructors from './pages/ApproveOrDisapproveInstructors';
import EditUser from './components/EditUser';
import DeleteUsersPage from './pages/DeleteUsersPage';
import ViewAllUsersPage from './pages/ViewAllUsersPage';
import PaymentHistory from './components/PaymentHistory';
import EditInstructor from './components/EditInstructor';
import AllInstructorsPage from './pages/AllInstructorsPage';
import ProfilePage from './components/ProfilePage';  // Import the ProfilePage component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return (
    <Router>
      {user ? <PostLoginNavbar user={user} /> : <PreLoginNavbar />} {/* ProfileDropdown is already inside PostLoginNavbar */}
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/dashboard" element={<DashboardPage user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment/:courseId" element={<PaymentPage />} />
        <Route path="/selected-courses" element={<SelectedCoursesPage />} />
        <Route path="/enrolled-courses" element={<EnrolledCoursesPage />} />
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Corrected element usage for ProfilePage */}

        {/* Admin-specific routes */}
        {user?.role === 'admin' && (
          <>
            <Route path="/user-details" element={<UserDetailsPage />} />
            <Route path="/approve-instructors" element={<ApproveOrDisapproveInstructors />} />
            <Route path="/edit-user-details/:id" element={<EditUser />} />
            <Route path="/delete-users" element={<DeleteUsersPage />} />
            <Route path="/view-user/:id" element={<ViewAllUsersPage />} />
            <Route path="/view-payment-history" element={<PaymentHistory />} />
            <Route path="/edit-instructor-details/:id" element={<EditInstructor />} />
            <Route path="/view-instructors" element={<AllInstructorsPage />} />
          </>
        )}

        {/* Instructor-specific routes */}
        {user?.role === 'instructor' && (
          <>
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/update-course/:id" element={<UpdateCoursePage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
