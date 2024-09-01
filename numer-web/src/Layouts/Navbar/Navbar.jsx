import { useEffect, useState } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import axios from "axios";


function Navbar(){
    const [sidebar,setsidebar] = useState(false);
    const [sidename,setsidename] = useState(false);
    const data = [
        {
          "id": 1,
          "name": "Home",
          "path": "/",
          "cname": "sidetext"
        },
        {
          "id": 2,
          "name": "Root of equations",
          "path": "/root_of_equations",
          "cname": "sidetext"
        }
      ];

    function clickmenu(){
        setsidebar(!sidebar)
    }
    function onname(){
        setsidename(!sidename)
    }

    var result;
    try{
        result = data.map((item,index)=>{
            return(
                <li key={index}>
                   <Link to={item.path} className={item.cname}>{item.name}</Link>
                </li>
            )
        });
    }catch{

    }
    return(
        <>
        <nav>
            <div className="header">
                <div className="image" onClick={clickmenu}><img src="menu-icon.svg" alt="" /></div>
                <div className="names" onMouseEnter={onname} onMouseLeave={onname}>
                <Link className="nav-link" to="/">
                <p className={sidename? "title active" : "title"}>
                    {sidename? <>
                    <span className="name">S</span>I<span className="name">W</span>A<span className="name">K</span>ORN
                    </>
                    :<>
                        <span className="name">SWK</span>
                        </>
                    }
                </p>
                </Link>
                </div>
            </div>
            <p className="sub">Numerical Method</p>
        </nav>
        <div className={sidebar? "sidebar active" : "sidebar"}>
            <ul>
                {result}
            </ul>
        </div>
        </>
    )
}

export default Navbar