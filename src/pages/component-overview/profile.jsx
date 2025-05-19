
import { Box, Button, Card, InputLabel, OutlinedInput, Paper, Stack, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { dummyUser, integrations } from '../../data/dummy_team_data';
import { CalendarOutlined, ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function profile() {

    const [rows, setRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5
    });
    useEffect(() => {
        setRows(
            integrations.map((data) => ({
                id: data.id,
                platform: data.platform,
                status: data.status,
                last_synced: data.last_synced,
            }))
        );
    }, []);



    const getInitials = (name) => {
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    };

    const C = styled(Card)({
        padding: '24px',
        width: "100%",
        border: '1px solid #e4e4e7',
        borderRadius: '.5rem',
        backgroundColor: 'inherit',
        marginBottom: "24px"

    });

    const columns = [
        {
            field: 'platform',
            headerName: 'Platform',
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (<Button
                sx={{
                    backgroundColor: '#2463eb',
                    color: "#fff",
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    border: "1px solid #e4e4e7",
                    padding: '2px 10px',
                    boxShadow: 'none',
                    '&:hover': {
                        color: '#fff',
                        backgroundColor: '#2463ebcc'
                    },
                }}
            >
                {params.value}

            </Button>)

        },
        {
            field: 'last_synced',
            headerName: 'Last Synced',
            flex: 1
        },
    ]

    return (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>

            {dummyUser.map((user) => {
                const initials = getInitials(user.name);
                return (
                    <>

                        <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center", mb: "2rem", flexWrap: "wrap" }}>
                            <Box sx={{ display: "flex", gap: "1rem" }}>

                                <Box sx={{ borderRadius: "50px", alignItems: 'center', justifyContent: "center", bgcolor: "#2463eb", color: "#fff", height: "5rem", width: "5rem", display: { xs: "none", sm: "flex" } }}>
                                    <Typography sx={{ fontSize: "20px" }}>
                                        {initials}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "#09090B" }}>
                                            {user.name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: '1rem', mt: "4px" }}>
                                        <Typography sx={{ fontSize: "16px", color: "#4b5563" }}><span style={{ marginRight: "4px" }}> <UserOutlined /></span>{user.role}</Typography>
                                        <Typography sx={{ fontSize: "16px", color: "#4b5563" }}><span style={{ marginRight: "4px" }}> <MailOutlined /></span>{user.email}</Typography>
                                        <Typography sx={{ fontSize: "16px", color: "#4b5563" }}><span style={{ marginRight: "4px" }}> <ClockCircleOutlined /></span>{user.timeZone}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex", gap: ".5rem", mt: {
                                    xs: "24px", sm: "24px", md: 0,
                                },
                            }}>

                                <Box>

                                    <Button
                                        sx={{

                                            backgroundColor: '#fff',
                                            color: "#09090b",
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            borderRadius: '6px',
                                            border: "1px solid #e4e4e7",
                                            p: '8px 16px',
                                            '&:hover': { color: '#2463eb' }
                                        }}
                                    >
                                        Message
                                    </Button>
                                </Box>
                                <Box>

                                    <Button
                                        sx={{
                                            backgroundColor: '#2463EB',
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            borderRadius: '6px',
                                            p: '8px 16px',
                                            '&:hover': { color: '#fff', backgroundColor: '#2463ebe6' }
                                        }}
                                    >
                                        Edit Profile
                                    </Button>
                                </Box>
                            </Box>
                        </Box >
                        <Box sx={{ display: "flex", gap: "12px", mb: "32px" }}>
                            {user.experties.map((data) => (
                                <Typography sx={{ fontSize: "12px", fontWeight: 600, background: "#e4e4e7", borderRadius: "9999px", px: "10px", py: "2px" }}>{data}</Typography>
                            ))}
                        </Box>
                        <Grid container size={12} >
                            <C variant="outlined" >

                                <Box sx={{ mb: "24px", display: 'flex', flexDirection: 'column', gap: '6px' }}>

                                    <Typography sx={{ fontSize: "24px", fontWeight: 600, lineHeight: 1, color: "#09090B" }}>Basic Information</Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#71717a", lineHeight: 1 }}>Personal and contact information</Typography>
                                </Box>
                                <form>
                                    <Grid container spacing={"24px"} >

                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <InputLabel sx={{ fontSize: "14px", fontWeight: 500, color: "#09090B", }} htmlFor="name">Full Name</InputLabel>
                                            <OutlinedInput
                                                sx={{ bgcolor: "#fff" }}
                                                id="name"
                                                name="name"
                                                value={user.name}
                                                placeholder="Enter email address"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <InputLabel sx={{ fontSize: "14px", fontWeight: 500, color: "#09090B", }} htmlFor="email">Email</InputLabel>
                                            <OutlinedInput
                                                sx={{ bgcolor: "#fff" }}
                                                id="email"
                                                name="email"
                                                value={user.email}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <InputLabel sx={{ fontSize: "14px", fontWeight: 500, color: "#09090B", }} htmlFor="role">Role</InputLabel>
                                            <OutlinedInput
                                                sx={{ bgcolor: "#fff" }}
                                                id="role"
                                                name="role"
                                                value={user.role}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <InputLabel sx={{ fontSize: "14px", fontWeight: 500, color: "#09090B", }} htmlFor="timezone">Timezone</InputLabel>
                                            <OutlinedInput
                                                sx={{ bgcolor: "#fff" }}
                                                id="timezone"
                                                name="timezone"
                                                value={user.timeZone}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                </form>
                            </C>

                        </Grid>
                        <Box >
                            <Paper variant="outlined"
                                sx={{
                                    position: "relative",
                                    border: '1px solid #e4e4e7',
                                    borderRadius: '.5rem',
                                    backgroundColor: 'inherit',
                                    marginBottom: "24px",
                                    padding: '24px',

                                }}>

                                <Box sx={{ mb: "24px", display: 'flex', flexDirection: 'column', gap: '6px' }}>

                                    <Typography sx={{ fontSize: "24px", fontWeight: 600, lineHeight: 1, color: "#09090B" }}>Connected Platforms</Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#71717a", lineHeight: 1 }}>Platform connections and sync status</Typography>
                                </Box>

                                <DataGrid
                                    columns={columns}
                                    rows={rows}
                                    paginationModel={paginationModel}
                                    onPaginationModelChange={setPaginationModel}
                                    columnHeaderHeight={37}
                                    disableRowSelectionOnClick
                                    density="comfortable"
                                    pageSizeOptions={[3, 5, 10]}
                                    sx={{
                                        border: 'none',
                                        mt: 1,
                                        maxHeight: 380,
                                        fontSize: '14px',
                                        '& .MuiDataGrid-row': {
                                            borderTop: '1px solid #e4e4e7',
                                            borderBottom: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            fontSize: '14px',
                                            color: '#09090b',
                                            '&:first-of-type': {
                                                borderTop: '1px solid #e4e4e7',
                                            },
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            borderBottom: 'none',
                                        },
                                        '& .MuiDataGrid-columnHeader': {
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: '#71717a',
                                        }
                                    }}
                                />

                                <Button
                                    sx={{
                                        position: "absolute",
                                        left: "24px",
                                        bottom: "24px",
                                        zIndex: 2,
                                        backgroundColor: '#fff',
                                        color: "#09090b",
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        borderRadius: '6px',
                                        border: "1px solid #e4e4e7",
                                        padding: '5px 12px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            color: '#2463eb',
                                            backgroundColor: '#f9f9f9'
                                        }
                                    }}
                                >
                                    Add Integration
                                </Button>

                            </Paper>
                        </Box>
                        <Grid container size={12} >
                            <C variant="outlined" >

                                <Box sx={{ mb: "36px", display: 'flex', flexDirection: 'column', gap: '6px' }}>

                                    <Typography sx={{ fontSize: "24px", fontWeight: 600, lineHeight: 1, color: "#09090B" }}>Security Status</Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#71717a", lineHeight: 1 }}>Account security information</Typography>
                                </Box>
                                <Grid container spacing={"16px"} sx={{ mb: "36px" }} >

                                    <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex', justifyContent: 'space-between', px: "12px" }}>
                                        {/* <Box sx={{ display: 'flex', gap: ".5rem" }}><KeyOutlined style={{ color: "#4b5563", fontSize: "20px", rotate: "180deg" }} /><Typography sx={{ fontSize: "16px" }}>Two-Factor Authentication</Typography>
                                        </Box> */}
                                        <Box sx={{display:"flex",alignItems:'center', gap: ".5rem" }}><VpnKeyOutlinedIcon style={{ color: "#4b5563", fontSize: "20px", rotate: "-45deg" }} /><Typography sx={{ fontSize: "16px" }}>Two-Factor Authentication</Typography>
                                        </Box>
                                        <Box>
                                            <Button
                                                sx={{
                                                    backgroundColor: '#2463eb',
                                                    color: "#fff",
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    borderRadius: '9999px',
                                                    border: "1px solid #e4e4e7",
                                                    padding: '2px 10px',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        color: '#fff',
                                                        backgroundColor: '#2463ebcc'
                                                    },
                                                }}
                                            >
                                                Enabled
                                            </Button>

                                        </Box>

                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex', justifyContent: 'space-between', px: "12px" }}>
                                        <Box sx={{ display: 'flex', gap: ".5rem", }}><CalendarOutlined style={{ color: "#4b5563", fontSize: "20px", }} /><Typography sx={{ fontSize: "16px" }}>Last Password Change</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: "14px", color: "#09090b" }}>3/1/2025</Typography>

                                        </Box>

                                    </Grid>
                                </Grid>
                                <Box sx={{ display: "flex", gap: ".5rem" }}>
                                    <Box>

                                        <Button
                                            sx={{
                                                backgroundColor: '#fff',
                                                color: "#09090b",
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                borderRadius: '6px',
                                                border: "1px solid #e4e4e7",
                                                padding: '6px 16px',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    color: '#2463eb',
                                                    backgroundColor: '#f9f9f9'
                                                }
                                            }}
                                        >
                                            Reset Password
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button
                                            sx={{
                                                backgroundColor: '#ef4444',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                borderRadius: '6px',
                                                padding: '7px 16px',
                                                '&:hover': { color: '#fff', backgroundColor: '#ef4444e6' }
                                            }}
                                        >
                                            Deactivate Account
                                        </Button>

                                    </Box>

                                </Box>
                            </C>
                        </Grid>
                    </>
                );
            })}
        </Box >
    );
}


