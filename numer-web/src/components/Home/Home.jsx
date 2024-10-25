import "./Home.css"
import TableDifference from "./TableDifference"
import TableIntegration from "./TableIntegration"
import TableInter from "./TableInter"
import TableLeast from "./Tableleast"
import TalbeLinear from "./TableLinear"
import StickyHeadTable from "./TableRoot"

function Home(){
    return(
        <div className="home-text">
            <div>
                <h1><b>NUMERICAL METHOD</b></h1>
            </div>
            <div style={{ marginTop: "35px", fontSize: "36px" }}>Root of equations</div>
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                <StickyHeadTable></StickyHeadTable>
            </div>
            <div style={{ marginTop: "35px", fontSize: "36px" }}>Linear Algebraic</div>
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                <TalbeLinear></TalbeLinear>
            </div>
            <div style={{ marginTop: "35px", fontSize: "36px" }}>Interpolation</div>
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                <TableInter></TableInter>
            </div>
            <div style={{ marginTop: "35px", fontSize: "36px" }}>Leastsquares</div>
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                <TableLeast></TableLeast>
            </div>
            <div style={{ marginTop: "35px", fontSize: "36px" }}>Integration</div>
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                <TableIntegration></TableIntegration>
            </div>
            <div style={{ marginTop: "35px", fontSize: "36px" }}>difference</div>
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                <TableDifference></TableDifference>
            </div>
        </div>
    )
}

export default Home