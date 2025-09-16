// 主要路由文件
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "../pages/Home/HomePage";
import { Layouts }  from "../layouts/Layouts";
import  TestDemo  from "../pages/TestDemo";
import { NotFound } from "../pages/404";
import LoginPaged from './../pages/User/Login';
import { RegisterPage } from './../pages/User/Register';
import {PlanList} from '../pages/Plan/Plans';
import { CreatePlanPage } from "../pages/Plan/newPlan";
import { EditPlanPage } from "../pages/Plan/editPlan";


const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layouts />} />
        <Route path="/index" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<TestDemo />} />
        <Route path="/login" element={<LoginPaged />} />
        <Route path="/Register" element={<RegisterPage  />} />
        <Route path="/Plan" element={<PlanList />} />
        <Route path="/create-plan" element={<CreatePlanPage />} />
        <Route path="/edit-plan" element={<EditPlanPage />} />
    </Routes>
    </BrowserRouter>
  )
}


export default MainRouter
