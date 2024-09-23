import MatrixResult from "./MatrixResult"
import TableMatrix from "./TableMatrix"

function Matrixmath(){

    return(
        <div className="home-text">
            <div style={{fontSize:"32px",marginBottom:"16px"}}>Linear Algebraic Equations</div>
            <TableMatrix/>
            <MatrixResult/>
        </div>
    )
}

export default Matrixmath