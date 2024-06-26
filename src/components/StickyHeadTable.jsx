import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable({
  rows,
  columns,
  handleDeleteClick,
  handleEditClick,
  handleExportClick,
  maxHeight,
  handelDoubleClick,
  tablePagination,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: maxHeight?maxHeight:440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={(e) => {
                      console.log(e.detail);
                      if(e.detail==2){
                        handelDoubleClick(row)
                      }
                    }}
                    sx={{
                      
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} >
                          {column.format && typeof column.format === "function"
                            ? column.format(
                              value,
                              row,
                              handleDeleteClick,
                              handleEditClick,
                              handleExportClick
                            )
                            : column.id == "teacherId"
                              ? index + 1
                              : column.id == "id" ? index + 1 : column.id == 'createdOn' ? value.slice(0, 10) : column.id == "selectedYears" ?
                                value.reduce((acc, data, currentIndex) => {
                                  if (currentIndex == value.length) {
                                    return acc + data;
                                  }
                                  return acc + ", " + data
                                })
                                : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {!tablePagination&&<TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
    </Paper>
  );
}
