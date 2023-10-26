import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getBookingApprovalList } from 'redux/sales';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { GLOBAL_STATUS } from 'utils/constant';

const rowsPerPage = 10;

const BookingApprovalTable = ({ bookingApprovalList, project_id }) => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const navtoDetail = (unitid, bookingid) => {
    navigate('/bookingPreview', { state: { unitid, bookingid, project_id } });
  };

  return (
    <Box className="mx-4">
      <div className="my-3">
        <Typography variant="h4">Booking Approval</Typography>
      </div>
      <div className="d-flex align-items-center mb-4 ">
        <Box
          noValidate
          autoComplete="off"
          component="form"
          sx={{
            '& > :not(style)': { width: '80ch' },
          }}
        >
          <TextField
            hiddenLabel
            className="rounded"
            placeholder="Search Here"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
        <Button style={styles.searchButton}>Search</Button>

        <Button style={styles.searchButton} onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className="d-flex justify-content-center">
        <Box component={TableContainer}>
          <Paper component={TableContainer} style={styles.tablePaper}>
            <Table sx={{ mt: 3, mb: 3 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography align="center" style={{ color: '#949DB8', fontSize: '1.3em' }}>
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography style={styles.tableHeadings}>Unit Info</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography style={styles.tableHeadings}>Booking Date</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography style={styles.tableHeadings}>Booked By</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography style={styles.tableHeadings}>Evaluated By</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography style={styles.tableHeadings}>Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingApprovalList?.length ? (
                  bookingApprovalList
                    ?.filter(approvalListRow => {
                      if (!searchTerm) return true;
                      return (
                        approvalListRow.unit_info
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        approvalListRow.bookedby.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        approvalListRow.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        approvalListRow.evaluated_by
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      );
                    })
                    ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    ?.map(approvalListRow => {
                      const {
                        bookingid,
                        unitid,
                        unit_info,
                        unit_reserved_date,
                        bookedby,
                        evaluated_by,
                        status,
                      } = approvalListRow || {};
                      return (
                        <TableRow
                          key={`${unitid}-${bookingid}`}
                          sx={{
                            '&:last-child td, &:last-child th': { borderColor: 'transparent' },
                            cursor: 'pointer',
                            '&:hover': {
                              outline: '2px solid #4872f4',
                              background: ' rgba(72, 114, 244, 0.1)',
                              borderRadius: '5px',
                            },
                          }}
                          onClick={() => {
                            navtoDetail(unitid, bookingid);
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            <Typography>
                              <span
                                style={{
                                  backgroundColor: '#e5eafa',
                                  color: '#4872f4',
                                  padding: '10px',
                                  borderRadius: '5px',
                                }}
                              >
                                {bookingid}
                              </span>
                            </Typography>
                          </TableCell>
                          <TableCell align="left" sx={{ paddingBottom: '10px' }}>
                            <Typography style={styles.tableData}>{unit_info}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography style={styles.tableData}>{unit_reserved_date}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography style={styles.tableData}>{bookedby}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography style={styles.tableData}>{evaluated_by}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              style={{
                                ...styles.values,
                                color: GLOBAL_STATUS[status]?.color,
                              }}
                            >
                              {GLOBAL_STATUS[status]?.label}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    {' '}
                    <TableCell className="text-center" colSpan={6}>
                      No Data Avaialable
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
          <div className="d-flex justify-content-start align-items-center ml-3 my-3">
            <IconButton
              aria-label="previous page"
              disabled={page === 0}
              style={styles.navigationButton}
              onClick={() => handleChangePage(null, page - 1)}
            >
              <Typography
                style={{ color: '#4872f4', fontWeight: 'bold', fontSize: '0.7em' }}
                variant="body2"
              >
                &lt;
              </Typography>
            </IconButton>
            <Typography
              style={{ fontSize: '1.1em', margin: '0 5px', fontWeight: 'bold' }}
              variant="body1"
            >
              <span>{`${page * 10 + 1}-${Math.min(
                (page + 1) * 10,
                bookingApprovalList?.length || 0,
              )} of ${bookingApprovalList?.length || 0}`}</span>
            </Typography>
            <IconButton
              aria-label="next page"
              disabled={page >= Math.ceil(bookingApprovalList?.length / 5) - 1}
              style={styles.navigationButton}
              onClick={() => handleChangePage(null, page + 1)}
            >
              <Typography
                style={{ color: '#4872f4', fontWeight: 'bold', fontSize: '0.7em' }}
                variant="body2"
              >
                &gt;
              </Typography>
            </IconButton>
          </div>
        </Box>
      </div>
    </Box>
  );
};

const BookingApproval = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  // url params
  const project_id = searchParams.get('project_id');

  const { bookingApprovalList } = useAppSelector(s => s.sales);

  useEffect(() => {
    dispatch(
      getBookingApprovalList({
        project_id,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <BookingApprovalTable bookingApprovalList={bookingApprovalList} project_id={project_id} />;
};

export default BookingApproval;

const styles = {
  tablePaper: {
    borderRadius: 6,
    height: '100vh',
    maxHeight: 'calc(100vh - 300px)',
    overflow: 'auto',
  },
  navigationButton: {
    backgroundColor: '#e5eafa',
    padding: '2px 5px',
    borderRadius: '5px',
    marginRight: '5px',
  },
  tableHeadings: {
    color: '#949DB8',
    fontSize: '1.3em',
  },
  tableData: {
    fontSize: '1.1em',
  },
  searchButton: {
    backgroundColor: '#e5eafa',
    marginLeft: '20px',
    padding: '15px 10px',
    borderRadius: '8px',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#e5eafa',
    },
  },
  values: {
    color: '#23394F',
    fontWeight: '500',
    padding: 5,
  },
};
