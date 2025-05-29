import React, { useEffect, useState } from 'react';
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
  styled,
  Skeleton
} from '@mui/material';
import {
  FilterAltOutlined as FilterIcon,
  Add as AddIcon,
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { api } from '../lib/apiRoute';
import echo from '../../echo.js';
const currentUserId = localStorage.getItem('user_id');
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
export const ClientChatList = ({ setSelectedChat, selectedChat, lastMessage, setLastMessage }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const channels = [];

    async function fetchAndSubscribe() {
      try {
        const response = await api.get('conversations');
        const data = response.data;
        setChats(data.data);
        setIsLoading(false);

        // Subscribe to all conversation channels
        data.data.forEach((chat) => {
          const channel = echo.private(`chat.${chat.conversation_id}`);
          // Inside the MessageSent listener
          channel.listen('MessageSent', (event) => {
            setLastMessage({
              conversation_id: event.conversation_id,
              last_message: event.message,
              updated_at: event.last_message_updated_at || new Date().toISOString()
            });

            if (event.sender_id !== currentUserId) {
              setChats((prev) =>
                prev.map((c) => {
                  if (c.conversation_id === event.conversation_id) {
                    // Only increment if not the active chat
                    const unread = selectedChat === event.conversation_id ? 0 : (c.unread || 0) + 1;
                    return { ...c, unread };
                  }
                  return c;
                })
              );
            }
          });

          // Inside the MessageRead listener
          channel.listen('MessageRead', (event) => {
            if (event.user_id === currentUserId) {
              setChats((prev) =>
                prev.map((chat) => (chat.conversation_id === event.conversation_id ? { ...chat, unread: event.unread_count } : chat))
              );
            }
          });
          channels.push(channel);
        });
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error('Error:', error);
      }
    }

    fetchAndSubscribe();

    return () => {
      channels.forEach((channel) => echo.leave(channel));
    };
  }, [setLastMessage, selectedChat]);

  // Update last message in chats
  useEffect(() => {
    if (lastMessage && lastMessage.conversation_id) {
      setChats((prev) =>
        prev.map((conv) =>
          conv.conversation_id === lastMessage.conversation_id
            ? {
                ...conv,
                last_message: lastMessage.last_message,
                updated_at: lastMessage.updated_at || conv.updated_at
              }
            : conv
        )
      );
    }
  }, [lastMessage]);
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

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
  function getInitials(name) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  }
  function timeAgo(dateString) {
    const now = new Date();
    const then = new Date(dateString);
    const secondsAgo = Math.floor((now - then) / 1000);

    if (secondsAgo < 60) return `${secondsAgo}s`;
    const minutes = Math.floor(secondsAgo / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
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
        {/* {isLoading && <Skeleton animation="pulse" variant="rectangular" width="100%" height={60} sx={{ margin: '16px 0' }} />} */}
        {chats.map((conversation) => {
          const [conversationUser] = conversation.users;
          const conversationStatus = conversationUser.status;
          const conversationName = conversationUser.name;
          const conversationId = conversation.conversation_id;
          const isSelected = selectedChat === conversationId;
          return (
            <ConversationItem key={conversation.id} selected={isSelected} divider onClick={() => handleChatSelect(conversationId)}>
              <ListItemAvatar>
                <Box sx={{ position: 'relative' }}>
                  {isLoading ? (
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                  ) : (
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
                      {getInitials(conversationName)}
                    </Avatar>
                  )}
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={12}
                      height={12}
                      sx={{ position: 'absolute', bottom: -7, right: 14 }}
                    />
                  ) : (
                    <StatusDot color={getStatusColor(conversationStatus)} />
                  )}
                </Box>
              </ListItemAvatar>

              <ListItemText
                primary={
                  isLoading ? (
                    <Skeleton animation="wave" width={80} />
                  ) : (
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ fontWeight: '600', fontSize: '16px', color: '#09090B', mb: '-2px' }}
                    >
                      {conversationName}
                    </Typography>
                  )
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                    {isLoading ? (
                      <Skeleton animation="wave" width={50} sx={{ marginRight: '10px' }} />
                    ) : (
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
                    )}

                    {!isLoading && conversation.hasDocument && <DescriptionIcon sx={{ fontSize: 16, mr: 0.5, color: '#6b7280' }} />}
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
                      {isLoading ? <Skeleton animation="wave" width={70} padding={2} /> : conversation.last_message}
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
                  {!isLoading && timeAgo(conversation.last_message_updated_at)}
                </Typography>

                {!isLoading && conversation.unread > 0 && <StyledBadge badgeContent={conversation.unread} />}
              </Box>
            </ConversationItem>
          );
        })}
      </List>
    </Paper>
  );
};
