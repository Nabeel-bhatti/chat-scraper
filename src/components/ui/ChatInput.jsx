import { useState, useRef } from 'react';
import { Box, TextField, IconButton, Paper, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import './ChatInput.css';
import CloseIcon from '@mui/icons-material/Close';

const sendIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-send h-4 w-4"
  >
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
    <path d="m21.854 2.147-10.94 10.939"></path>
  </svg>
);
const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        id: Math.random().toString(36).substring(2),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId) => {
    setAttachedFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== fileId);
      // Revoke object URLs to avoid memory leaks
      const removedFile = prev.find((file) => file.id === fileId);
      if (removedFile && removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return updatedFiles;
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎬';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('zip') || fileType.includes('compressed')) return '🗜️';
    return '📎';
  };

  const handleSendMessage = () => {
    if (message.trim() || attachedFiles.length > 0) {
      onSendMessage(
        message,
        attachedFiles.map((f) => f.file)
      );
      setMessage('');
      // Clean up object URLs
      attachedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
      setAttachedFiles([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Paper elevation={0} className="chat-input-container">
      {attachedFiles.length > 0 && (
        <Box className="file-preview-container">
          {attachedFiles.map((fileObj) => (
            <Box key={fileObj.id} className="file-preview-item">
              {fileObj.preview ? (
                <img src={fileObj.preview || '/placeholder.svg'} alt="Preview" className="file-preview-image" />
              ) : (
                <Box className="file-icon">{getFileIcon(fileObj.file.type)}</Box>
              )}
              <Box className="file-info">
                <Box className="file-name">{fileObj.file.name}</Box>
                <Box className="file-size">{(fileObj.file.size / 1024).toFixed(1)} KB</Box>
              </Box>
              <IconButton className="remove-file-button" size="small" onClick={() => removeFile(fileObj.id)}>
                ✕
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <TextField
        fullWidth
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          className: 'message-input'
        }}
        multiline
        rows={4}
      />

      <Box className="chat-toolbar">
        <Box className="left-actions">
          <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <IconButton onClick={handleAttachmentClick} className="toolbar-button" sx={{ fontSize: '1.275rem' }}>
            <AttachFileIcon fontSize="0.875rem" />
          </IconButton>

          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="toolbar-button" sx={{ fontSize: '1.275rem' }}>
            <SentimentSatisfiedAltIcon fontSize="0.875rem" />
          </IconButton>

          <IconButton className="toolbar-button" sx={{ fontSize: '1.275rem' }}>
            <MenuIcon fontSize="0.875rem" />
          </IconButton>

          <IconButton className="toolbar-button" sx={{ fontSize: '1.275rem' }}>
            <PeopleAltOutlinedIcon fontSize="0.875rem" />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={sendIconSvg}
          onClick={handleSendMessage}
          className="send-button"
          disabled={!message.trim()}
        >
          Send
        </Button>
      </Box>

      {showEmojiPicker && (
        <Box className="emoji-picker-container" sx={{ position: 'relative' }}>
          <IconButton
            size="small"
            onClick={() => setShowEmojiPicker(false)}
            sx={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: '25px',
              height: '25px',
              zIndex: 1,
              color: '#666',
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <CloseIcon fontSize="4px" />
          </IconButton>
          <Picker onEmojiClick={handleEmojiClick} theme='light' suggestedEmojisMode={'recent'} />
        </Box>
      )}
    </Paper>
  );
};

export default ChatInput;
