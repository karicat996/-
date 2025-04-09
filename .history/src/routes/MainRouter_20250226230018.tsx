// 主要路由文件
import { BrowserRouter, Route, Routes,Link} from "react-router-dom";
import { Home } from "../pages/Home/HomePage";
import { Layouts }  from "../layouts/Layouts";
import  TestDemo  from "../pages/TestDemo";
import { NotFound } from "../pages/404";
import LoginPage from './../pages/User/Login';


const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layouts />} />
        <Route path="/index" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<TestDemo />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
  )
}


export default MainRouter
