"use client"

import React from "react"
import { Box, Typography, Paper, Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

// Styled components
const EmptyStateContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  padding: theme.spacing(4),
  backgroundColor: "#f8f9fa",
  borderRadius: 16,
  boxShadow: "none",
  position: "relative",
  overflow: "hidden",
  paddingBottom: '25%',
}))

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#e3f2fd",
  borderRadius: "50%",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    background: "radial-gradient(circle, rgba(227,242,253,0.5) 0%, rgba(227,242,253,0) 70%)",
    zIndex: -1,
  },
}))

const StyledIcon = styled(ChatBubbleOutlineIcon)(({ theme }) => ({
  fontSize: 64,
  color: "#1677FF",
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: "#1e293b",
}))

const Description = styled(Typography)(({ theme }) => ({
  color: "#64748b",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  maxWidth: 450,
  fontSize: "1rem",
}))

const StartButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: '0.9rem',
  boxShadow: "0 4px 14px 0 rgba(33, 150, 243, 0.3)",
  backgroundColor: "#2463EB",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px 0 rgba(33, 150, 243, 0.4)",
    transform: "translateY(-2px)",
  },
}))

// Decorative elements
const Bubble = styled(Box)(({ size, top, left, delay }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
//   backgroundColor: "rgba(33, 150, 243, 0.1)",
  backgroundColor: "#E6F4FF",
  top,
  left,
  animation: `float 4s ease-in-out infinite ${delay}s`,
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(-30px)",
    },
  },
}))

const ChatEmptyState = () => {
  // Animation for the arrow
  const [arrowPosition, setArrowPosition] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setArrowPosition((prev) => (prev === 0 ? 5 : 0))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <EmptyStateContainer>
      {/* Decorative bubbles */}
      <Bubble size="170px" top="10%" left="10%" delay={0} />
      <Bubble size="180px" top="55%" left="80%" delay={1} />
      <Bubble size="120px" top="20%" left="85%" delay={2} />
      <Bubble size="120px" top="70%" left="15%" delay={1.5} />

      <IconContainer>
        <StyledIcon />
      </IconContainer>

      <Title variant="h2">No conversation selected</Title>

      <Description variant="body1">
        Select a conversation from the list to start messaging or create a new chat to connect with your clients.
      </Description>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ArrowBackIcon
          color="primary"
          sx={{
            transform: `translateX(${arrowPosition}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        />
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
          Select a chat
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <StartButton variant="contained" color="primary" startIcon={<ChatBubbleOutlineIcon />}>
          Start a new conversation
        </StartButton>
      </Box>
    </EmptyStateContainer>
  )
}

export default ChatEmptyState
