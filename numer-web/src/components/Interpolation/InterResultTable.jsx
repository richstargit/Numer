import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BlockMath } from 'react-katex';
import { create, all, mode } from 'mathjs';

const math = create(all);

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

function InterResult(props) {
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
          <StyledTableCell style={{width : "150px"}}>i</StyledTableCell>
            <StyledTableCell style={{minWidth : "100px"}}>X</StyledTableCell>
            <StyledTableCell style={{minWidth : "100px"}}>Y</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedResult!=null? result.result.map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.x}</StyledTableCell >
              <StyledTableCell component="th" scope="row">{row.y?row.y:""}</StyledTableCell>
            </StyledTableRow>
          )) : <StyledTableRow></StyledTableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default InterResult
