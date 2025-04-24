"use client"

import { useState } from "react"
import { mockChatData } from "./mockData"
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
} from "@mui/material"
import {
  Send as SendIcon,
  EmojiEmotions as EmojiIcon,
  FormatListBulleted as ListIcon,
  Person as PersonIcon,
  MoreVert as MoreIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "87vh",
  maxHeight: "900px",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}))

const ChatThread = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRight: `1px solid ${theme.palette.divider}`,
}))

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}))

const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: "auto",
  backgroundColor: theme.palette.grey[50],
}))

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isUser",
})(({ theme, isUser }) => ({
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(1.5),
  maxWidth: "80%",
  fontSize: '14px',
  lineHeight: '1.25rem',
  borderRadius: 9,
  position: "relative",
  backgroundColor: isUser ? '#2463EB' : '#F3F4F6',
  color: isUser ? 'white' : theme.palette.text.primary,
  alignSelf: isUser ? "flex-end" : "flex-start",
  border: 'none'
//   boxShadow: theme.shadows[1],
}))

const MessageInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
}))

const SidePanel = styled(Box)(({ theme }) => ({
  width: 320,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
}))

const StatusDot = styled("div")(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: '#10B981',
  marginRight: theme.spacing(1),
}))

const FileAttachment = styled(Paper)(({ theme }) => ({
  padding: '8px 10px',
  marginTop: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  borderRadius: 8,
  backgroundColor: 'white',
  border: '1px solid #E5E7EB',
  maxWidth: '370px'
}))

const InternalNoteChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  marginLeft: theme.spacing(1),
}))

// Helper function for avatar styles
const getAvatarStyles = (message) => {
    if (message.isCurrentUser) return { bgcolor: "#3f51b5", color: "white" }
    switch(message.sender) {
      case "AI Assistant": return { bgcolor: "#3f51b5", color: "white" }
      case "Jessica": return { bgcolor: "#9c27b0", color: "white" }
      default: return { bgcolor: "#f0f0f0", color: "#666" }
    }
  }

// Main component
export default function ChatInterface() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <ChatContainer>
      <ChatThread>
        {/* Keep ChatHeader static as per original design */}
        <ChatHeader>
          <Avatar sx={{ bgcolor: "#f0f0f0", color: "#666", mr: 2 }}>SM</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" sx={{fontSize: '16px', fontWeight: '600', color: '#09090B', lineHeight: '27px'}}> 
              Sarah Miller
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{mr: 1, fontSize: '12px', fontWeight: '600', color: '#09090B', border: '1px solid #D3D3D3', borderRadius: '20px', padding: '0px 8px'}}>
                Upwork
              </Typography>
              {/* <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} /> */}
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1, fontSize: '12px', fontWeight: '600', color: '#09090B', border: '1px solid #D3D3D3', borderRadius: '20px', padding: '0px 8px'}}>
                Web Design
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StatusDot />
                <Typography variant="body2" color="text.secondary">
                  Active now
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ ml: "auto", display: "flex" }}>
            <IconButton size="small" sx={{ mr: 1 }}>
              <AutoAwesomeIcon fontSize="small" color="primary" />
            </IconButton>
            <IconButton size="small" sx={{ mr: 1 }}>
              <PersonIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <MoreIcon fontSize="small" />
            </IconButton>
          </Box>
        </ChatHeader>

        <MessageList>
          {mockChatData.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                mb: 3,
                // alignItems: "flex-start",
                justifyContent: message.isCurrentUser ? "flex-end" : "flex-start"
              }}
            >
              {!message.isCurrentUser && (
                <Avatar sx={{ 
                  ...getAvatarStyles(message),
                  mr: 1.5,
                  mt: 0.5
                }}>
                  {message.initials}
                </Avatar>
              )}
              
              <Box>
                {!message.isCurrentUser && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle2">{message.sender}</Typography>
                    {message.note && (
                      <InternalNoteChip label={message.note} size="small" />
                    )}
                  </Box>
                )}
                
                <MessageBubble isUser={message.isCurrentUser} variant="outlined">
                  <Typography variant="body2" sx={{fontSize: '14px', lineHeight: '1.25rem', fontWeight: '500'}}>{message.content}</Typography>
                </MessageBubble>
                  {message.files?.map((file) => (
                    <FileAttachment key={file.id} variant='outlined'>
                      <DescriptionOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'gray' }} />
                      <Box sx={{display: 'flex', gap: 1}}>
                        <Typography variant="body2" sx={{color: '#09090B', fontSize: '14px', fontWeight: '600'}}>{file.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.size}
                        </Typography>
                      </Box>
                    </FileAttachment>
                  ))}
                
                <Typography variant="caption" color="text.secondary">
                  {message.timestamp}
                </Typography>
              </Box>

              {message.isCurrentUser && (
                <Avatar sx={{ 
                  ...getAvatarStyles(message),
                  ml: -10,
                  mt: 0.5
                }}>
                  {message.initials}
                </Avatar>
              )}
            </Box>
          ))}

          {/* System message (uncomment in mockData to use) */}
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#f5f9ff",
              border: "1px solid #e3f2fd",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton size="small" sx={{ mr: 1, p: 0.5, bgcolor: "#e3f2fd" }}>
              <AutoAwesomeIcon fontSize="small" color="primary" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Based on the conversation, the client needs: 1) Product catalog management, 2) Multi-currency
            </Typography>
          </Paper>
        </MessageList>

        {/* Keep MessageInputContainer the same */}
        <MessageInputContainer>
          <IconButton size="small" sx={{ mr: 1 }}>
            <DescriptionOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ mr: 1 }}>
            <EmojiIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ mr: 1 }}>
            <ListIcon fontSize="small" />
          </IconButton>
          <TextField fullWidth variant="outlined" placeholder="Type a message..." size="small" sx={{ mx: 1 }} />
          <Button variant="contained" endIcon={<SendIcon />} sx={{ borderRadius: 2 }}>
            Send
          </Button>
        </MessageInputContainer>
      </ChatThread>

      <SidePanel>
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">AI Assistant</Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ "& .MuiTab-root": { textTransform: "none" } }}
          >
            <Tab label="Summary" />
            <Tab label="Action Items" />
            <Tab label="Help" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box sx={{ p: 2, overflowY: "auto" }}>
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
              Key Points
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters sx={{ mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CheckCircleOutlineOutlinedIcon color="success" fontSize="small" sx={{color: '#22C55E'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="E-commerce platform with product catalog"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CheckCircleOutlineOutlinedIcon color="success" fontSize="small" sx={{color: '#22C55E'}}/>
                </ListItemIcon>
                <ListItemText primary="Multi-currency support needed" primaryTypographyProps={{ variant: "body2" }} />
              </ListItem>
              <ListItem disableGutters sx={{ mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CheckCircleOutlineOutlinedIcon color="success" fontSize="small" sx={{color: '#22C55E'}}/>
                </ListItemIcon>
                <ListItemText
                  primary="Integration with existing CRM system"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                Client Sentiment
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#F3F4F6",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#22C55E",
                      },
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
                  "I'd love to schedule a 30-min discovery call to dive deeper into your CRM integration needs. Would
                  tomorrow at 2 PM work for you?"
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                  <Button size="small" variant="text">
                    Use Suggestion
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
      </SidePanel>
    </ChatContainer>
  )
}
