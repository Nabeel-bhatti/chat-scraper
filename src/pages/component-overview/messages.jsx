import React, { useState } from 'react';
import { Grid } from '@mui/system';
import { ClientChatList } from '../../components/ClientChatList';
import ChatConversation from '../../components/ChatConversation';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [lastMessage, setLastMessage] = useState({ conversation_id: '', last_message: '', updated_at: '' });
  return (
    <Grid container sx={{ p: 0, m: 0 }}>
      <Grid size={2.5} sx={{ p: 0, m: 0 }}>
        <ClientChatList
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          lastMessage={lastMessage}
          setLastMessage={setLastMessage}
        />
      </Grid>
      <Grid size={9.5} sx={{ p: 0, m: 0, xs: 12, sm: 6, md: 4, maxHeight: '837px' }}>
        <ChatConversation selectedChat={selectedChat} setLastMessage={setLastMessage} />
      </Grid>
    </Grid>
  );
};

export default Messages;
