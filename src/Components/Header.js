import './Header.css';
import logo from "../images/hackernewslogo.png";


export default function Header() {
    return (
      <div className="header-div">
        <p className="heading"><img src={logo} className="pic"/><b>Hacker News </b>  new | past | comments | ask | show | jobs | submit</p>
       
      </div>
    );
  }
  