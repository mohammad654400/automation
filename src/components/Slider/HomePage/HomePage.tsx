
import { Route, Routes } from "react-router-dom";
import Example from "./Calendar/Calendar";
import DashBort from "./Dashboard/Dashboard";
import "./HomePage.css";
import MessageList from "./MessageList/MessageList";
import ItemProduct from "./itemProduct"
const HomePage = () => {

  return (
    <div className="ContainerHomePage">
      <div className="dashBortContainer">
        <DashBort />
      </div>
      <div className="sideContainer">
        <div className="calendarContainer">
          <Example />
        </div>

        <div className="noteContainer">
          <MessageList />
        </div>
      </div>
      <Routes>
        <Route path="message/:id" element={<ItemProduct />} /> {/* مسیر نسبی */}
      </Routes>
    </div>
  );
};
export default HomePage;
