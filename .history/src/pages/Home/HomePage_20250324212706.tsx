
import CalendarComponent from '../Calendar/CalendarPage'
import WishCard from '../Calendar/WishCard'
import './HomePage.less'
export const Home = () => {
  return (
    <>
    <div className="container">

    <div className="header-container">
    顶部
    </div>
    <div className="core-container">
    <div className="left-container">
      <WishCard />
    </div>

    <div className="middle-container">

    <div className="middle-on-container">
       
    </div>
    <div className="middle-under-container">
      <CalendarComponent/>
      
    </div>
    </div>

    <div className="right-container">
      右边
    </div>
    </div>

    <div className="footer-container">
    底部
    </div>

    </div>
   
  </>
  
  )
}

export default Home