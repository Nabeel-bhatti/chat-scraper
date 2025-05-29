import { useEffect, useState } from 'react';
import { mockChatData, mockTeamData } from './mockData';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  IconButton,
  Button,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  AvatarGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  Select,
  MenuItem
} from '@mui/material';
import {
  Send as SendIcon,
  EmojiEmotions as EmojiIcon,
  FormatListBulleted as ListIcon,
  Person as PersonIcon,
  MoreVert as MoreIcon,
  AutoAwesome as AutoAwesomeIcon,
  RemoveCircleOutline
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatInput from '../components/ui/ChatInput.jsx';
import { random } from 'lodash-es';
import Popover from '@mui/material/Popover';
import { ProfileCard } from './ui/ProfileCard.jsx';
import { DeleteIcon } from 'lucide-react';
import ContributorsDialog from './ui/ContributorsDialog.jsx';
import { useRef } from 'react';
import axios from 'axios';
import echo from '../../echo.js';
import { api } from '../lib/apiRoute';
import { Skeleton } from '@mui/material';
import ChatEmptyState from './ui/chat-empty-state.jsx';
import { markAsRead } from '../services/AllServices.jsx';

const currentUserId = localStorage.getItem('user_id');

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '87vh',
  maxHeight: '900px',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper
}));

const ChatThread = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRight: `1px solid ${theme.palette.divider}`
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper
}));

const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: theme.palette.grey[50]
}));

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isUser'
})(({ theme, isUser }) => ({
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(1.5),
  fontSize: '14px',
  lineHeight: '1.25rem',
  borderRadius: 9,
  position: 'relative',
  backgroundColor: isUser ? '#2463EB' : '#F3F4F6',
  color: isUser ? 'white' : theme.palette.text.primary,
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  border: 'none',
  display: 'flex',
  flexDirection: 'row'
  //   boxShadow: theme.shadows[1],
}));

const MessageInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#F9FAFB',
  display: 'flex',
  alignItems: 'center'
}));

const SidePanel = styled(Box)(({ theme }) => ({
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper
}));

const StatusDot = styled('div')(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: '#10B981',
  marginRight: theme.spacing(1)
}));

const FileAttachment = styled(Paper)(({ theme }) => ({
  padding: '8px 10px',
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,
  backgroundColor: 'white',
  border: '1px solid #E5E7EB',
  maxWidth: '370px'
}));

const InternalNoteChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  marginLeft: theme.spacing(1)
}));

// Helper function for avatar styles
const getAvatarStyles = (message) => {
  if (message.sender_id == currentUserId) return { bgcolor: '#2463EB', color: 'white' };
  switch (message.sender.name) {
    case 'AI Assistant':
      return { bgcolor: '#3f51b5', color: 'white' };
    default:
      return { bgcolor: '#E5E7EB', color: '#666' };
  }
};

const HoverAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'opacity 0.25s ease',
  '&:hover': { opacity: 0.7 }
}));
// Contributor management dialog
const Transition = (props) => <Slide direction="up" {...props} />;

// Main component
export default function ChatInterface({ selectedChat }) {
  const [tabValue, setTabValue] = useState(0);
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contributors, setContributors] = useState(mockTeamData);
  const [isLoading, setIsLoading] = useState(true);
  const bottomRef = useRef(null);
  useEffect(() => {
    if (selectedChat) {
      fetchConversationData();
    } else {
      setMessages([]);
      setParticipant(null);
      setIsLoading(false);
    }
  }, [selectedChat]);

  const fetchConversationData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`conversations/${selectedChat}`);
      const data = response.data.data;
      setParticipant(data.participant);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  useEffect(() => {
    if (!selectedChat) return;

    const channel = echo.private(`chat.${selectedChat}`);

    const handleNewMessage = async (event) => {
      const incomingMessage = {
        id: event.id,
        conversation_id: event.conversation_id,
        sender_id: event.sender_id,
        message: event.message,
        message_type: event.message_type,
        created_at: event.created_at,
        updated_at: event.updated_at,
        is_read: event.is_read,
        sender: {
          id: event.sender?.id,
          name: event.sender?.name,
          email: event.sender?.email
        }
      };

      setMessages((prev) => [...prev, incomingMessage]);

      // Mark as read if current user is viewing the chat
      if (event.sender_id !== currentUserId && document.hasFocus()) {
        try {
          await markAsRead(selectedChat);
        } catch (error) {
          console.error('Error marking as read:', error);
        }
      }
    };

    channel.listen('MessageSent', handleNewMessage);

    return () => {
      channel.stopListening('MessageSent', handleNewMessage);
      echo.leave(`chat.${selectedChat}`);
    };
  }, [selectedChat]);

  // Document focus listener
  useEffect(() => {
    const handleFocus = async () => {
      if (selectedChat) {
        try {
          await markAsRead(selectedChat);
        } catch (error) {
          console.error('Error marking as read:', error);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [selectedChat]);

  const handleAvatarClick = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const sendMessageToBackend = async (message, files) => {
    if (!selectedChat) return;

    try {
      const formData = new FormData();
      formData.append('message', message);
      formData.append('receiver_id', participant.id);

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('attachments[]', file);
        });
      }

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/send-message', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const result = response.data.data;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleSidePanelOpen = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };
  function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };
  if (!selectedChat) {
    return (
      // <Box
      //   sx={{
      //     display: 'flex',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     height: '100%',
      //     backgroundColor: '#F9FAFB'
      //   }}
      // >
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, padding: '16px' }}>
          <ChatEmptyState />
        </div>
      </div>
      // </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2, borderRadius: '9px' }} />
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
              <Skeleton variant="rectangular" width="60%" height={60} sx={{ borderRadius: '9px' }} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
  return (
    <ChatContainer>
      <ChatThread>
        <ChatHeader>
          {participant && (
            <>
              <Avatar sx={{ bgcolor: '#E5E7EB', color: '#666', mr: 2, fontWeight: 600, fontSize: '18px' }}>
                {getInitials(participant.name)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium" sx={{ fontSize: '16px', fontWeight: '600', color: '#09090B' }}>
                  {participant.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StatusDot />
                  <Typography variant="body2" color="text.secondary">
                    {participant.last_seen_at ? `Last seen ${new Date(participant.last_seen_at).toLocaleTimeString()}` : 'Active now'}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
          <Box sx={{ ml: 'auto', display: 'flex' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AvatarGroup
                spacing="medium"
                max={4}
                sx={{
                  mr: 1,
                  '& .MuiAvatar-root': {
                    width: 27,
                    height: 27,
                    fontSize: '13px'
                  }
                }}
              >
                {contributors.map((member) => (
                  <HoverAvatar
                    key={member.id}
                    alt={member.name}
                    src={member.imageUrl ? member.imageUrl : ''}
                    onClick={handleAvatarClick}
                    sx={{
                      bgcolor: member.id == currentUserId ? '#2463EB' : '#E5E7EB',
                      color: member.id == currentUserId ? 'white' : '#666'
                    }}
                  >
                    {member.initials ? member.initials : getInitials(member.name)}
                  </HoverAvatar>
                ))}
              </AvatarGroup>
            </Box>
            <IconButton size="small" sx={{ mr: 1 }} onClick={handleSidePanelOpen}>
              <AutoAwesomeIcon fontSize="small" color="primary" />
            </IconButton>
            <IconButton size="small">
              <MoreIcon fontSize="small" />
            </IconButton>
          </Box>
        </ChatHeader>
        {/* <NotificationComponent/> */}
        <MessageList>
          {messages.map((message) => {
            const isMe = message.sender_id == currentUserId;
            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  width: '100%', // 1) full width
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  mb: 3
                }}
              >
                {/* 2) if not me, avatar first */}
                {!isMe && (
                  <Avatar
                    sx={{
                      ...getAvatarStyles(message),
                      mr: 1.5,
                      mt: 0.5,
                      width: 33,
                      height: 33,
                      fontSize: '14px',
                      fontWeight: '700'
                    }}
                  >
                    {message.initials ? message.initials : getInitials(message.sender.name)}
                  </Avatar>
                )}

                {/* 3) content + timestamp wrapper */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '70%'
                  }}
                >
                  {!isMe && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2">{message.sender.name}</Typography>
                      {/* {message.note && <InternalNoteChip label={message.note} size="small" />} */}
                    </Box>
                  )}

                  {/* 4) the bubble itself */}
                  <MessageBubble
                    isUser={isMe}
                    variant="outlined"
                    sx={{
                      flexShrink: 0,
                      // maxWidth: '60%',
                      p: 1.5
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        fontSize: '14px',
                        lineHeight: '1.25rem',
                        fontWeight: 500,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                        fontFamily: 'inherit'
                      }}
                    >
                      {message.message}
                    </Typography>
                  </MessageBubble>

                  {/* file attachments */}
                  {message.files?.map((file) => (
                    <FileAttachment key={file.id} variant="outlined" sx={{ mt: 1, mb: 1.3 }}>
                      <DescriptionOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600 }}>
                          {file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.size}
                        </Typography>
                      </Box>
                    </FileAttachment>
                  ))}

                  {/* timestamp */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: -0.8, color: '#6b7280', fontSize: '0.75rem', lineHeight: '1rem', fontWeight: 500 }}
                  >
                    {formatTime(message.updated_at)}
                  </Typography>
                </Box>

                {/* 2) if me, avatar after */}
                {isMe && (
                  <Avatar
                    sx={{
                      ...getAvatarStyles(message),
                      ml: 1.5,
                      mt: 0.5,
                      width: 33,
                      height: 33,
                      fontSize: '14px',
                      fontWeight: '700'
                    }}
                  >
                    {message.initials ? message.initials : getInitials(message.sender.name)}
                  </Avatar>
                )}
              </Box>
            );
          })}
          <div ref={bottomRef} />
        </MessageList>

        <MessageInputContainer>
          <ChatInput
            onSendMessage={(message, files) => {
              sendMessageToBackend(message, files);
            }}
          />
        </MessageInputContainer>
      </ChatThread>

      {/* {isSidePanelOpen && ( */}
      <Slide direction={'left'} in={isSidePanelOpen} timeout={400} mountOnEnter unmountOnExit>
        <SidePanel>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">AI Assistant</Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
              <Tab label="Summary" />
              <Tab label="Action Items" />
              <Tab label="Help" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Box sx={{ p: 2, overflowY: 'auto' }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                Key Points
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <CheckCircleOutlineOutlinedIcon color="success" fontSize="small" sx={{ color: '#22C55E' }} />
                  </ListItemIcon>
                  <ListItemText primary="E-commerce platform with product catalog" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem disableGutters sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <CheckCircleOutlineOutlinedIcon color="success" fontSize="small" sx={{ color: '#22C55E' }} />
                  </ListItemIcon>
                  <ListItemText primary="Multi-currency support needed" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem disableGutters sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <CheckCircleOutlineOutlinedIcon color="success" fontSize="small" sx={{ color: '#22C55E' }} />
                  </ListItemIcon>
                  <ListItemText primary="Integration with existing CRM system" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              </List>

              <Box sx={{ mt: 3, mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                  Client Sentiment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flex: 1, mr: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={80}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#F3F4F6',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#22C55E'
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="body2">Positive</Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                  Suggested Response
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="body2">
                    "I'd love to schedule a 30-min discovery call to dive deeper into your CRM integration needs. Would tomorrow at 2 PM
                    work for you?"
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button size="small" variant="text">
                      Use Suggestion
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}
        </SidePanel>
      </Slide>
      {/* )} */}
      <ContributorsDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        contributors={contributors}
        allMembers={mockTeamData}
        setContributors={setContributors}
      />
    </ChatContainer>
  );
}
