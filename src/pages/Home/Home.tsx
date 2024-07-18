import { Outlet } from "react-router-dom";
import Menu from "../../components/Slider/Menu";
import "./Home.css";

const Home = () => {
  return (
    <div className="Container">
      <div className="menuHomeContainer">
        <Menu />
        <div className="ContainerViewItemMenu"></div>
      </div>

      <div
        style={{
          width: "80%",
          display: "flex",
          marginRight: "2%",
          marginLeft: "2%",
          height: "96%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
