import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#272829",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(Iteration,Xi,Yi,Error) {
  return { Iteration,Xi,Yi,Error };
}

export default function CustomizedTables(props) {
  const result = props.result
  let sortedResult=null;
  if(result.result){
    sortedResult = result.result.sort((a, b) => a.iter - b.iter);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell style={{width : "150px"}}>Iteration</StyledTableCell>
            <StyledTableCell style={{minWidth : "100px", width : "300px"}}>Xi</StyledTableCell>
            <StyledTableCell style={{minWidth : "100px", width : "500px"}}>Yi</StyledTableCell>
            <StyledTableCell>Error</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedResult!=null? result.result.map((row) => (
            <StyledTableRow key={row.iter}>
              <StyledTableCell component="th" scope="row">
                {row.iter}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.x}
              </StyledTableCell>
              <StyledTableCell>{row.y}</StyledTableCell>
              <StyledTableCell>{row.error}</StyledTableCell>
            </StyledTableRow>
          )) : <StyledTableRow></StyledTableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
