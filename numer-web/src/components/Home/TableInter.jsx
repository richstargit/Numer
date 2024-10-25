import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { BlockMath } from 'react-katex';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { useEffect, useState } from "react";

// Column definitions
const columns = [
  { id: 'index', label: 'id', minWidth: 50, align: 'right' },
  { id: 'tablex', label: 'tableX', minWidth: 170 },
  {id: 'tabley',label: 'tableY',minWidth: 170,},
  { id: 'method', label: 'Method', minWidth: 100 },
  {id: 'resultx',label: 'X',minWidth: 170,},
  {id: 'result',label: 'Result',minWidth: 170,}
];

// Function to create data
function createData(index, tablex,tabley,method,result,n,xsize,resultx) {
  return { index, tablex,tabley,method,result,n,xsize,resultx,check:Array(n).fill(true)};
}

// Sample data
const rows = [
  createData(1, '[1,2,3,4,5]','[8,12,5,1,2]', 'newton_divided','[1,2,3,4,5]',5,2,'[1,2]'),
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export default function TableInter() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://numer-api.vercel.app/api/inter');
        const jsonData = await response.json();
        
        if (jsonData.request === 'success') {
          const apiRows = jsonData.data.map(item => 
            createData(
              item.id,
              item.tablex,
              item.tabley,
              item.mode,
              item.result,
              parseInt(item.n),
              parseInt(item.xsize),
              item.resultx
            )
          );
          setRows(apiRows);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    const queryParams = new URLSearchParams({
      mode : row.method,
      nsize:parseInt(row.n),
      xsize:parseInt(row.xsize),
      tablex : row.tablex,
      tabley : row.tabley,
      resultx : row.resultx,
      check:JSON.stringify(row.check)

    }).toString();
    navigate(`/interpolation?${queryParams}`);
    console.log(row);
  };

  const sortedRows = React.useMemo(() => {
    return stableSort(rows, getComparator(order, orderBy));
  }, [order, orderBy, rows]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.index}
                  onClick={() => handleRowClick(row)}
                  sx={{ cursor: 'pointer' }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    try {
                      return (
                        <TableCell key={column.id} align={column.align}>
                        {column.id === 'result'||column.id === 'tablex'||column.id === 'tabley'||column.id === 'resultx' ? (
                          <BlockMath
                            math={`\\begin{bmatrix}${JSON.parse(value).join('&')}\\end{bmatrix}`}
                          />
                        ) : column.id === 'method' ? (
                          value.replace(/_/g, ' ')
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                    } catch (error) {
                      
                    }
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}