import Pfp from "../../Assets/Pfp.jpg";
import "../SideBar/SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={Pfp} alt="profile_picture" className="sidebar__avatar" />
      <p className="sidebar__username">Alex Sturm</p>
    </div>
  );
}

export default SideBar;
