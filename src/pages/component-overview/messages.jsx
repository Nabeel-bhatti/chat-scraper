import React from 'react';
import { Grid } from '@mui/system';
import { ClientChatList } from '../../components/ClientChatList';
import ChatConversation from '../../components/ChatConversation';

const messages = () => {
  return (
    <Grid container sx={{ p: 0, m: 0 }}>
      <Grid size={2.5} sx={{ p: 0, m: 0}}>
        <ClientChatList />
      </Grid>
      <Grid size={9.5} sx={{ p: 0, m: 0, xs: 12, sm: 6, md: 4, maxHeight: '837px' }}>
        <ChatConversation/>
      </Grid>
    </Grid>
  );
};

export default messages;
