import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx"; // For Excel export
import { SiMicrosoftexcel } from "react-icons/si";
import IconButton from "@mui/material/IconButton";
import { FaFileCsv } from "react-icons/fa6";
import { MdPrint } from "react-icons/md";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Index = ({
  columns,
  rows,
  disableExcelExport,
  disableCsvExport,
  disablePrintExport,
  disableExport,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const tableRef = useRef();

  useEffect(() => {
    const filteredData = rows.filter((row) => {
      // Case-insensitive search across all columns
      return columns.some((column) => {
        const value = row[column.field]?.toString().toLowerCase(); // Handle missing values
        return value && value.includes(searchText.toLowerCase());
      });
    });
    setFilteredRows(filteredData);
  }, [searchText, rows]); // Update filteredRows on searchText or rows change

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleExportCSV = () => {
    const csvData = filteredRows.map((row) => {
      const rowObject = {};
      columns.forEach((col) => {
        let value = row[col.field];
        if (Array.isArray(value)) {
          value = value.join(", "); // Join array elements with a comma
        }
        rowObject[col.field] = value;
      });
      return rowObject;
    });

    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "table_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportExcel = () => {
    const excelData = filteredRows.map((row) => {
      const rowObject = {};
      columns.forEach((col) => {
        let value = row[col.field];
        if (Array.isArray(value)) {
          value = value.join(", "); // Join array elements with a comma
        }
        rowObject[col.field] = value;
      });
      return rowObject;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to reset the original state
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid
          item
          xs={12}
          sm={6}
          justifyContent={"flex-start"}
          display={"flex"}
        >
          <TextField
            variant="outlined"
            label="Search"
            value={searchText}
            onChange={handleSearchChange}
          />
        </Grid>
        {!(
          (disableExcelExport && disableCsvExport && disablePrintExport) ||
          disableExport
        ) && (
          <Grid
            item
            container
            xs={12}
            sm={6}
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" sx={{ mr: 2 }}>
              Export:
            </Typography>
            <Grid>
              {!disableExcelExport && (
                <IconButton
                  onClick={handleExportExcel}
                  color="primary"
                  aria-label="excelExport"
                >
                  <SiMicrosoftexcel />
                </IconButton>
              )}
            </Grid>
            <Grid>
              {!disableCsvExport && (
                <IconButton
                  onClick={handleExportCSV}
                  color="secondary"
                  aria-label="csvExport"
                >
                  <FaFileCsv />
                </IconButton>
              )}
            </Grid>
            <Grid>
              {!disablePrintExport && (
                <IconButton
                  onClick={handlePrint}
                  color="info"
                  aria-label="printExport"
                >
                  <MdPrint />
                </IconButton>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          id="printTable"
          ref={tableRef}
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20 , 50 , 100 , 500]}
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default Index;
