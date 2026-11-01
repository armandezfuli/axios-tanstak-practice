import { useQuery } from "@tanstack/react-query"
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material"
import { getUsers } from "./services/users.service"

function App() {
    const { data, isPending, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    })

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

                <Button sx={{ mt: 2 }} onClick={() => refetch()}>
                    Try again
                </Button>
            </Container>
        )
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Users Dashboard
            </Typography>

            <Typography>Total users: {data.total}</Typography>

            <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() => refetch()}
                disabled={isFetching}>
                {isFetching ? "Refreshing..." : "Refresh users"}
            </Button>

            <Box sx={{ mt: 3 }}>
                {data.users.map((user) => (
                    <Box
                        key={user.id}
                        sx={{
                            p: 2,
                            mb: 1,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}>
                        <Typography variant="h6">
                            {user.firstName} {user.lastName}
                        </Typography>

                        <Typography color="text.secondary">{user.email}</Typography>

                        <Typography>
                            Age: {user.age} | Company: {user.company.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    )
}

export default App
