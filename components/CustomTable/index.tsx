
import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TablePagination, TableSortLabel } from '@material-ui/core'
import { stableSort } from '../../utils/stableSort'
import { Repository } from '../../interfaces'
import StarIcon from '@material-ui/icons/Star'

type PageProps = {
    data: Repository[],
}

type Order = 'asc' | 'desc';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: 'inherit',
      fontWeight: 'bold',
      '& .table-head': {
        display: 'flex',
        alignItems: 'center',
      }
    },
    head: {
      backgroundColor: '#82C2DA',
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14,
      position: 'relative',
    }
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '& .update-icon': {
        position: 'absolute',
        top: '3px',
        right: '3px'
      },
      '& .video-icon': {
        color: '#000'
      }
    },
  }),
)(TableRow)

const useStyles = makeStyles({
  paper: {
    position: 'relative',
    width: '100%'
  },
  table: {
    minWidth: 690
  },
  pagination: {
    backgroundColor: '#82C2DA'
  }
})

const CustomTable: FunctionComponent<PageProps> = ({data}) => {
    
  const classes = useStyles()
  
  const [orderBy, setorderBy] = React.useState<string>('name')
  const [order, setOrder] = React.useState<Order>('asc')
  const [page, setPage] = React.useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5)

  const router = useRouter()

  const handleSort = (key: string) => (_event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === key && order === 'asc'

      setorderBy(key)
      setOrder(isAsc ? 'desc' : 'asc');
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const redirectToGit = (url: string) => {
    router.push(url)
  }

  function _descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function _getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => _descendingComparator(a, b, orderBy)
      : (a, b) => -_descendingComparator(a, b, orderBy);
  }

  return (

    <Paper className={classes.paper}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>

              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'desc'}
                  onClick={handleSort('name')}>
                  <div className="table-head">Repositories</div>
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div className="table-head">Description</div>
              </StyledTableCell>

              <StyledTableCell>
                    <div className="table-head">Stars</div>
            </StyledTableCell>

            <StyledTableCell>
                    <div className="table-head">Forks</div>
            </StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, _getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                <StyledTableRow key={index}>
    
                  <StyledTableCell style={{cursor: 'pointer'}} align="left" onClick={() => redirectToGit(row.url)}>{row.name}</StyledTableCell>

                  <StyledTableCell align="left">{row.description}</StyledTableCell>

                  <StyledTableCell align="left">
                    { row.stargazers.totalCount > 0 ? <StarIcon/> : '' }
                  </StyledTableCell>

                  <StyledTableCell align="left">{row.forks.totalCount}</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}>
      </TablePagination>
    </Paper>

  )
}

export default CustomTable
