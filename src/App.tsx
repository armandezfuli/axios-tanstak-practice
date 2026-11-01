import { useState } from "react"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"

import { getUsers } from "./services/users.service"

const USERS_PER_PAGE = 10

function App() {
    const [page, setPage] = useState(1)

    const skip = (page - 1) * USERS_PER_PAGE

    const { data, isPending, isError, error, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["users", page, USERS_PER_PAGE],
        queryFn: () => getUsers(USERS_PER_PAGE, skip),
        placeholderData: keepPreviousData,
    })

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
    }

    if (isPending) {
        return (
            <Container sx={{ py: 5, textAlign: "center" }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading users...</Typography>
            </Container>
        )
    }

    if (isError) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="error">Failed to load users: {error.message}</Alert>
            </Container>
        )
    }

    const totalPages = Math.ceil(data.total / USERS_PER_PAGE)

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Users Dashboard
                    </Typography>

                    <Typography color="text.secondary">
                        Total users: {data.total}
                    </Typography>
                </Box>

                {isFetching && <CircularProgress size={24} />}
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Company</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.id}</TableCell>

                                <TableCell>
                                    {user.firstName} {user.lastName}
                                </TableCell>

                                <TableCell>{user.email}</TableCell>

                                <TableCell>{user.age}</TableCell>

                                <TableCell>{user.company.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    disabled={isPlaceholderData}
                />
            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mt: 2,
                    textAlign: "center",
                }}>
                Page {page} of {totalPages}
            </Typography>
        </Container>
    )
}

export default App
