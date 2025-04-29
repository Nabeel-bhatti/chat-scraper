import {
    Box,
    Button,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    FormLabel,
    TextField,
    Autocomplete,
    Stack,
    IconButton,
    Avatar,
    ListItemAvatar,
    Paper,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockTeamData } from '../../data/dummy_team_data';
import { DeleteOutline, CloseOutlined } from '@mui/icons-material';
// import * as yup from "yup";

const team = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialog2Open, setDialog2Open] = useState(false);
    const [rows, setRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

  useEffect(() => {
    setRows(
      mockTeamData.map((data) => ({
        id: data.id,
        member: data.name,
        role: data.role,
        email: data.email,
        initials: data.initials
      }))
    );
  }, []);
  const Lable = styled(FormLabel)({
    marginBottom: '3px',
    color: '#09090b',
    fontSize: '14px',
    fontWeight: 500
  });

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialog2Close = () => {
        setDialog2Open(false);
    };


  const columns = [
    // { field: "id", headerName: "Sr#", flex: 0.5, filterable: false },
    {
      field: 'member',
      headerName: 'Member',
      flex: 2,
      renderCell: (params) => {
        const name = params.value;
        const getInitials = (name) => {
          const words = name.trim().split(' ');
          if (words.length === 1) return words[0][0].toUpperCase();
          return (words[0][0] + words[1][0]).toUpperCase();
        };

        return (
          <ListItemAvatar>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: '#f4f4f5',
                  color: 'black',
                  width: 31,
                  height: 31,
                  fontSize: '14px',
                  fontWeight: '400',
                  mr: 1
                }}
              >
                {getInitials(name)}
              </Avatar>
              {name}
            </Box>
          </ListItemAvatar>
        );
      }
    },

    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: (params) => {
        const role = params.value;
        const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
        return formattedRole;
      }
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 2
    },

        {
            field: "actions",
            headerName: "Actions",
            filterable: false,
            renderCell: (params) => (

                <IconButton
                    size='large'
                    onClick={() => setDialog2Open(true)}
                    sx={{

                        color: '#ef4444',
                        '&:hover': {
                            backgroundColor: "#ef44441a",

                        }
                    }}
                >
                    <DeleteOutline fontSize='inherit' />
                </IconButton>



            ),
        },
    ];
    return (
        <Box sx={{ p: { xs: 2, sm: 3, } }}>
            <Paper
                variant="outlined"
                sx={{
                    borderColor: '#e4e4e7',
                    borderRadius: '7px',
                    p: 2,
                }} >
                <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", }}>
                    <Button
                        onClick={() => setDialogOpen(true)}
                        sx={{ backgroundColor: "#2463EB", color: "#fff", fontSize: "14px", fontWeight: 500, borderRadius: "6px", px: "18px", "&:hover": { color: "#fff", backgroundColor: "#2463ebe6" } }}
                    >
                        +&nbsp;  Add Member
                    </Button>
                </Box>
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    columns={columns}
                    rows={rows}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    columnHeaderHeight={37}
                    density='comfortable'
                    pageSizeOptions={[3, 5, 10]}
                    sx={{
                        border: "1px solid #e0e0e0", mt: 1, maxHeight: 380, fontSize: "14px",
                        "& .MuiDataGrid-row": {
                            borderBottom: "1px solid #d1d5db",
                            fontSize: "14px",
                            color: "#09090b",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: "1px solid #e0e0e0",

                        },
                        "& .MuiDataGrid-columnHeader": {
                            // borderRight: "1px solid #f0f0f0",
                            fontSize: "14px",
                            color: "#71717a",
                            backgroundColor: "#fff",


                        },
                    }}
                />

                <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth={'xs'}
                    slotProps={{
                        backdrop: {
                            sx: {
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                            },
                        },
                    }} >
                    <DialogTitle component={"h4"} sx={{
                        paddingBottom: "0px",
                        color: "#09090b",
                        fontSize: "18px",
                        fontWeight: 600,
                    }}>Add Team Member</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => setDialogOpen(false)}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            cursor: "default",
                            color: theme.palette.grey[500],
                            "&:hover": {
                                backgroundColor: '#fff'
                            }
                        })}
                    >
                        <CloseOutlined sx={{
                            height: "16px",
                            cursor: "pointer",
                            width: "16px", "&:hover": {
                                color: "#09090b",
                                backgroundColor: '#fff'
                            }
                        }} />

                    </IconButton>
                    <DialogContent>

                        <FormControl sx={{ width: "100%" }}>
                            <Lable >Full Name *</Lable>
                            <TextField
                                size="small"
                                sx={{
                                    mb: 3, '& .MuiOutlinedInput-root': {
                                        borderRadius: '.4rem',
                                    }
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }}>
                            <Lable >Email *</Lable>
                            <TextField
                                size="small"
                                type='Email'
                                sx={{
                                    mb: 3, '& .MuiOutlinedInput-root': {
                                        borderRadius: '.4rem',
                                    }
                                }}
                                variant="outlined"
                            />
                        </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <Lable>Role *</Lable>
            <Stack>
              <Autocomplete
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '.4rem'
                  }
                }}
                options={['developer', 'designer']}
                renderInput={(params) => <TextField placeholder="Select a role" {...params} size="small" variant="outlined" />}
              />
            </Stack>
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            <Lable>Image URL (Optional)</Lable>
            <TextField
              size="small"
              type="url"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '.4rem'
                }
              }}
              variant="outlined"
              placeholder="https://example.com/image.png"
            />
          </FormControl>
        </DialogContent>

                    <DialogActions sx={{ pb: "24px", pr: "22px" }}>
                        <Button onClick={() => setDialogOpen(false)} color="primary" sx={{ backgroundColor: "#fff", color: "#09090b", border: " 1px solid #e4e4e7", fontSize: "14px", fontWeight: 500, borderRadius: "6px", px: "18px", "&:hover": { color: "#2463EB", backgroundColor: "#ecf2fd" } }}>
                            Cancel
                        </Button>
                        <Button onClick={() => setDialogOpen(false)} color="primary" sx={{ backgroundColor: "#2463EB", color: "#fff", fontSize: "14px", fontWeight: 500, borderRadius: "6px", px: "18px", "&:hover": { color: "#fff", backgroundColor: "#2463ebe6" } }}>
                            Add Member
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={dialog2Open} onClose={handleDialog2Close}
                    slotProps={{
                        backdrop: {
                            sx: {
                                pr: "24px",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                            },
                        },
                    }} >
                    <IconButton
                        aria-label="close"
                        onClick={() => setDialog2Open(false)}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            cursor: "default",
                            color: theme.palette.grey[500],
                            "&:hover": {
                                backgroundColor: '#fff'
                            }
                        })}
                    >
                        <CloseOutlined sx={{
                            height: "16px",
                            cursor: "pointer",
                            width: "16px", "&:hover": {
                                color: "#09090b",
                                backgroundColor: '#fff'
                            }
                        }} />

                    </IconButton>
                    <DialogContent>
                        <Typography sx={{
                            fontSize: "18px", fontWeight: 600, color: "#09090b", mb: "8px"
                        }}>Remove Team Member?</Typography>
                        < Typography sx={{ fontSize: "14px", color: "#71717a", whiteSpace: "pre-line" }}>Are you sure you want to remove Jane Smith? This action cannot be<br /> undone. </Typography>


                    </DialogContent>

                    <DialogActions sx={{ pb: "24px", pr: "22px" }}>
                        <Button onClick={() => setDialog2Open(false)} color="primary" sx={{ backgroundColor: "#fff", color: "#09090b", border: " 1px solid #e4e4e7", fontSize: "14px", fontWeight: 500, borderRadius: "6px", px: "18px", "&:hover": { color: "#2463EB", backgroundColor: "#ecf2fd" } }}>
                            Cancel
                        </Button>
                        <Button onClick={() => setDialog2Open(false)} color="primary" sx={{ backgroundColor: "#ef4444", color: "#fff", fontSize: "14px", fontWeight: 500, borderRadius: "6px", px: "18px", "&:hover": { color: "#fff", backgroundColor: "#ef4444e6" } }}>
                            Yes, Remove
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>

export default team;
