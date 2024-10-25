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
  { id: 'name', label: 'Equation', minWidth: 170 },
  { id: 'method', label: 'Method', minWidth: 100 },
  { id: 'oh', label: 'Oh', minWidth: 170, },
  { id: 'x', label: 'x', minWidth: 170, },
  { id: 'h', label: 'h', minWidth: 170, },
  { id: 'result', label: 'Result', minWidth: 170, }
];

// Function to create data
function createData(index, name, method, oh, x, h, result) {
  return { index, name, method, oh, x, h, result };
}

// Sample data
const rows = [
  createData(1, 'x^2 - 7', 'forward', 'oh^1', 2, 1, 2.645751),
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

export default function TableDifference() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://numer-api.vercel.app/api/difference');
        const jsonData = await response.json();

        if (jsonData.request === 'success') {
          const apiRows = jsonData.data.map(item =>
            createData(
              item.id,
              item.equation,
              item.mode,
              item.oh,
              parseFloat(item.x),
              parseFloat(item.h),
              parseFloat(item.result)
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
      mode: row.method,
      sol: row.name,
      oh: row.oh,
      x: row.x,
      h: row.h

    }).toString();
    navigate(`/differentiation?${queryParams}`);
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
                          {column.id === 'name' ? (
                            <BlockMath math={value} />
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
