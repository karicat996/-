
import TopNav from "./TopNav/TopNav";
import SideNav from "./SideNav/SideNav";
import { Routes } from "react-router-dom";
export const Layouts: React.FC = () => {
  return (
        <div className="Layouts">
          <TopNav />
          <div className="main-content">    
            <SideNav /> 
            <div className="content">
            <Routes>
            {/* 可以在这里添加更多页面路由 */}
          </Routes>
            </div>  
          </div>
        </div>
  );
};

export default Layouts;