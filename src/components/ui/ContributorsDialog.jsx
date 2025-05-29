'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  InputAdornment,
  Divider,
  styled,
  Menu,
  MenuItem
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { mockTeamData as members } from '../mockData';
// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: 600,
    // backgroundColor: '#1e1e1e',
    backgroundColor: 'white',
    color: '#09090B',
    borderRadius: 8
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 16px',
  '& .MuiIconButton-root': {
    color: '#09090B'
  }
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    color: '#9e9e9e',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 500,
    minWidth: 'auto',
    padding: '12px 16px',
    '&.Mui-selected': {
      color: '#09090B'
    }
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'white'
  }
}));

const UpgradeBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#3a2f1a',
  padding: '12px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#e6c07b'
}));

const UpgradeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#e6c07b',
  color: '#000',
  textTransform: 'none',
  fontWeight: 500,
  padding: '8px 24px',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#d4af65'
  }
}));

const InviteSection = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: 'white'
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    padding: '7px',
    '& input': {
      padding: '8px 12px',
      paddingLeft: '10px'
    },
    color: '#09090B',
    '& fieldset': {
      borderColor: 'transparent'
    },
    '&:hover fieldset': {
      borderColor: 'transparent'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent'
    }
  },
  '& .MuiInputAdornment-root': {
    color: '#9e9e9e'
  }
}));

const MemberRoleButton = styled(Button)(({ theme }) => ({
  color: '#9e9e9e',
  textTransform: 'none',
  padding: '4px 8px',
  justifyContent: 'space-between',
  width: 120,
  borderRadius: 4,
  '&:hover': {
    // backgroundColor: 'rgba(255, 255, 255, 0.05)'
    backgroundColor: 'white'
  }
}));

const GuestChip = styled(Box)(({ theme }) => ({
  backgroundColor: '#F3F4F6',
  color: '#9e9e9e',
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: 12,
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 8,
  marginBottom: 1
}));

function ContributorsDialog({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(1); // 1 is for Members tab
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenMenu = (event, memberId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMemberId(memberId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMemberId(null);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
      }}
    >
      <StyledDialogTitle>
        <Typography variant="h5" component="div" fontWeight={500} fontSize={'24px'}>
          Chat settings
        </Typography>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      <StyledTabs value={activeTab} onChange={handleTabChange}>
        <Tab label="General" value={0} />
        <Tab label="Members" value={1} />
        <Tab label="Advanced" value={2} />
      </StyledTabs>

      <DialogContent sx={{ padding: 0, backgroundColor: 'white' }}>
        {activeTab === 1 && (
          <>
            <UpgradeBar>
              <Typography variant="body1" component="div">
                8 of 15 members invited. <span style={{ textDecoration: 'underline' }}>Upgrade to add more members.</span>
              </Typography>
              <UpgradeButton>Upgrade</UpgradeButton>
            </UpgradeBar>

            <InviteSection>
              <Typography variant="h6" component="div" sx={{ mb: 2, fontSize: '20px', fontWeight: 500 }}>
                Invite to chat
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add team members by name or email..."
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      padding: '6px',
                      borderRadius: 4,
                      color: '#09090B',
                      '& fieldset': {
                        border: '1px solid #e4e4e4'
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 0 0 2px dodgerblue'
                      }
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: '#09090B',
                    backgroundColor: 'none',
                    border: '1px solid #e4e4e4',
                    '&:hover': {
                      border: '1px solid #e4e4e4',
                      backgroundColor: '#2463eb2e'
                    },
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: 4,
                    px: 3
                  }}
                >
                  Invite
                </Button>
              </Box>
            </InviteSection>

            <Box sx={{ p: 3 }}>
              <Typography variant="h6" component="div" sx={{ mb: 2, fontSize: '20px', fontWeight: 500 }}>
                Members
              </Typography>
              <SearchField
                fullWidth
                placeholder="Find a member..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 2 }}
              />

              <List sx={{ pt: 0 }}>
                {filteredMembers.map((member) => (
                  <ListItem
                    key={member.id}
                    sx={{
                      py: 1.5,
                      borderBottom: '1px solid #F3F4F6',
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={member.imageUrl}
                        alt={member.name}
                        sx={{ bgcolor: '#E5E7EB', color: '#666', mr: 2, fontWeight: 500, fontSize: '16px' }}
                      >
                        {member.initials}
                      </Avatar>
                    </ListItemAvatar>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" component="div">
                          {member.name}
                        </Typography>
                        {member.isGuest && <GuestChip>Guest</GuestChip>}
                      </Box>
                      <Typography variant="body2" component="div" sx={{ color: '#9e9e9e' }}>
                        {member.email}
                      </Typography>
                    </Box>
                    <MemberRoleButton endIcon={<ExpandMoreIcon />} onClick={(e) => handleOpenMenu(e, member.id)}>
                      {member.role}
                    </MemberRoleButton>
                  </ListItem>
                ))}
              </List>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  sx: {
                    backgroundColor: 'white',
                    color: '#09090B',
                    width: 180,
                    '& .MuiMenuItem-root': {
                      fontSize: 14
                    }
                  }
                }}
              >
                <MenuItem onClick={handleCloseMenu}>Member</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Admin</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Owner</MenuItem>
                <Divider sx={{ backgroundColor: '#444' }} />
                <MenuItem onClick={handleCloseMenu} sx={{ color: '#f44336' }}>
                  Remove
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </DialogContent>
    </StyledDialog>
  );
}
export default ContributorsDialog;
