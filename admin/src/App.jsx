import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Hello 
// Pages
import Sign_in from "./auth/sign_in";
import UserPage from "./pages/user/userPage";
import Layout from "./layout/layout";
import Dashboard from "./dashboard/dashboard";
import Profile_info from "./pages/user/profile/profile_infos";
import DSR_List from "./pages/dsrListReport/DSR_List";
import Dsr_Add from "./pages/dsrListReport/Dsr_Add";
import AttendanceSheet from "./pages/attendanceSheet/AttendanceSheet";
import Daily_Attendance from "./pages/attendanceSheet/Daily_Attendance";
import HolidayCalender from "./pages/holidayCalender/HolidayCalender";
import AddEmpReference from "./pages/empReference/AddEmpReference ";
import EmpReferenceListing from "./pages/empReference/EmpReferenceListing";
import AddResign from "./pages/resign/AddResign";
import ResignList from "./pages/resign/ResignList";
import AddLeave from "./pages/leave/AddLeave";
import LeaveList from "./pages/leave/LeaveList";
import AddUserPage from "./pages/user/AddUserPage";
import AddUserForm from "./pages/user/AddUserForm";
import Role from "../src/pages/user/role/role";
import AddDSRForm from "./pages/dsrListReport/Dsr_Add";
import HrDashboard from "./dashboard/HrDashboard";
import HRM from "./hr/hrm";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EditEmpReference from "./pages/empReference/EditEmpReference";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Sign_in />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/add-user" element={<AddUserForm />} />
                    <Route path="/user/:id?" element={<AddUserPage />} />
                    <Route path="/add-user" element={<AddUserPage />} />
                    <Route path="/add-user/:id" element={<AddUserPage />} />
                    <Route path="/holidayCalender"element={<HolidayCalender />}/>
                    <Route path="/dsr/add" element={<Dsr_Add />} />
                    <Route path="/dsr/edit/:id" element={<Dsr_Add />} />
                    <Route path="/dsr_list" element={<DSR_List />} />
                    <Route path="/add_Dsr_Report" element={<Dsr_Add />} />
                    <Route path="/attendanceSheet" element={<AttendanceSheet />}/>
                    <Route path="/daily_Attendance" element={<Daily_Attendance />}/>
                    <Route path="/addResign" element={<AddResign />} />
                    <Route path="/resignList" element={<ResignList />} />
                    <Route path="/info" element={<Profile_info />} />
                    <Route path="/addLeave" element={<AddLeave />} />
                    <Route path="/leaveList" element={<LeaveList />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/hrm" element={<HRM />} />
                    <Route path="/ManagerDashboard" element={<ManagerDashboard/>} />

                    <Route path="/addEmpReference" element={<AddEmpReference />}/>
                    <Route path="/empReferenceListing" element={<EmpReferenceListing />}/>
                      <Route path="/edit/ref/:id" element={<AddEmpReference  />} />

                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
