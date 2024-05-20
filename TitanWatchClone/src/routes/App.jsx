import FetchItems from "../components/FetchItems";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeItem from "../components/HomeItem";
import { Outlet } from "react-router-dom";
function App(){
  
  return(
    <>
      <Header />
      <FetchItems />
      <Outlet />
    <Footer />
    </>
  )
}
export default App;