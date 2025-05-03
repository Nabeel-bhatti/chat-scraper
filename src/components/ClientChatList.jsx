import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  Paper,
  styled
} from '@mui/material';
import {
  FilterAltOutlined as FilterIcon,
  Add as AddIcon,
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { fontWeight } from '@mui/system';

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#2463EB',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    padding: '11px 11px',
    borderRadius: '12px'
  }
}));

const StatusDot = styled('div')(({ color }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: color,
  position: 'absolute',
  bottom: -7,
  right: 14,
  border: '2px solid white'
}));

const ConversationItem = styled(ListItem)(({ theme, selected }) => ({
  padding: '4px 16px',
  cursor: 'pointer',
  backgroundColor: selected ? '#ecf2fd' : 'transparent',
  '&:hover': {
    // backgroundColor: '#f5f7fa'
    backgroundColor: '#e5e5e54a'
  }
}));

// Main component
export const ClientChatList = () => {
  const conversations = [
    {
      id: 1,
      name: 'Sarah Miller',
      initials: 'SM',
      message: 'We need to review the desi...',
      time: '5m',
      unread: 2,
      status: 'online',
      avatarColor: '#ef4444',
      platform: 'Upwork',
      selected: true,
      hasArrow: true
    },
    {
      id: 2,
      name: 'David Roberts',
      initials: 'DR',
      message: 'Can you explain how the new f...',
      time: '25m',
      unread: 0,
      status: 'online',
      avatarColor: '#d1d5db',
      platform: 'Fiverr',
      hasDocument: true
    },
    {
      id: 3,
      name: 'Jennifer Clark',
      initials: 'JC',
      message: "I've just sent over the proje...",
      time: '1h',
      unread: 4,
      status: 'away',
      avatarColor: '#f59e0b',
      platform: 'Upwork'
    },
    {
      id: 4,
      name: 'Michael Johnson',
      initials: 'MJ',
      message: 'Let me know when you can hop ...',
      time: '3h',
      unread: 0,
      status: 'online',
      platform: 'Fiverr',
      avatarColor: '#d1d5db'
    },
    {
      id: 5,
      name: 'Amanda Garcia',
      initials: 'AG',
      message: "I've reviewed your proposal and ...",
      time: 'Yesterday',
      unread: 0,
      status: 'busy',
      avatarColor: '#10b981',
      platform: 'Direct'
    }
  ];
  const getPlatformStyles = (platform) => {
    switch (platform.toLowerCase()) {
      case 'upwork':
        return {
          color: '#15803d', // Upwork green
          border: '1px solid #bbf7d0',
          backgroundColor: '#f0fdf4',
        };
      case 'fiverr':
        return {
          color: '#047857', // Fiverr green
          border: '1px solid #a7f3d0',
          backgroundColor: '#ecfdf5',
        };
      case 'direct':
        return {
          color: '#1d4ed8', // Direct blue
          border: '1px solid #bfdbfe',
          backgroundColor: '#eff6ff',
        };
      default:
        return {
          color: '#09090B',
          border: '1px solid #D3D3D3',
        };
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'away':
        return '#3b82f6';
      case 'busy':
        return '#ef4444';
      default:
        return '#d1d5db';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ height: '87vh', borderRadius: 0, border: '1px solid #e5e7eb', borderLeft: '0', borderTop: '0', bgcolor: '#F9FAFB' }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <Typography variant="h5" component="h1" sx={{ fontSize: '18px', fontWeight: 600 }}>
          Conversations
        </Typography>
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <IconButton sx={{ bgcolor: 'white', border: '1px solid #e4e4e7', padding: '19px', color: 'black', fontWeight: '100' }}>
            <FilterOutlined />
          </IconButton>
          <IconButton sx={{ bgcolor: 'white', border: '1px solid #e4e4e7', padding: '19px', color: 'black', fontWeight: '100' }}>
            <PlusOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search conversations..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ marginRight: '0' }}>
                <SearchOutlined />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '6px',
              bgcolor: 'white',
              '& fieldset': { borderColor: '#e5e7eb' },
              '& input::placeholder': {
                color: 'black',
                opacity: '0.6',
                fontSize: '0.875rem',
                textAlign: 'left'
              }
            }
          }}
        />
      </Box>

      <List disablePadding>
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.id} selected={conversation.selected} divider>
            <ListItemAvatar>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  sx={{
                    bgcolor: '#e5e7eb',
                    color: 'black',
                    width: 36,
                    height: 36,
                    fontSize: '16px',
                    fontWeight: '500',
                    border: conversation.avatarColor !== '#d1d5db' ? '0px solid white' : 'none',
                    boxShadow: conversation.avatarColor !== '#d1d5db' ? '0 0 0 2px ' + conversation.avatarColor : 'none'
                  }}
                >
                  {conversation.initials}
                </Avatar>
                <StatusDot color={getStatusColor(conversation.status)} />
              </Box>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: '600', fontSize: '16px', color: '#09090B', mb: '-2px' }}>
                  {conversation.name}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mr: 1,
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '20px',
                      padding: '0px 7px',
                      height: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      ...getPlatformStyles(conversation.platform)
                    }}
                  >
                    {conversation.platform}
                  </Typography>
                  {conversation.hasDocument && <DescriptionIcon sx={{ fontSize: 16, mr: 0.5, color: '#6b7280' }} />}
                  <Typography
                    variant="body2"
                    // color="text.secondary"
                    color="#4b5563"
                    fontSize={'.875rem'}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px'
                    }}
                  >
                    {conversation.message}
                  </Typography>
                </Box>
              }
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                mr: 1,
                minWidth: 45,
                fontSize: '12px',
                marginBottom: '16px'
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {conversation.time}
              </Typography>

              {conversation.unread > 0 ? (
                <StyledBadge badgeContent={conversation.unread} />
              ) : conversation.hasArrow ? (
                <IconButton size="small" sx={{ p: 0, color: '#ef4444' }}>
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
              ) : null}
            </Box>
          </ConversationItem>
        ))}
      </List>
    </Paper>
  );
};
