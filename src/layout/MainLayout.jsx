import { Outlet } from "react-router-dom";
import "../App.css"
const MainLayout = () => {
   return (
      <>
         <div className="App">
            <Outlet />
         </div>
      </>
   );
};

export default MainLayout;