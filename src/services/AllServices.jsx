import { api } from '../lib/apiRoute';

export const registration = (data) => {
  return api.post('register/', {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation
  });
};
export const login = (data) => {
  return api.post('login/', {
    email: data.email,
    password: data.password
  });
};
export const googleAuth = (credential) => {
  const result = api.post('google-login', { credential });
  return result;
};
export const sendMessage = (data) => {
  const result = api.post('send-message', { data });
  return result;
};
export const fetchConversations = () => {
  const result = api.get('conversations');
  return result;
}
export const fetchConversationDetails = (id) => {
  const result = api.get(`conversation/${id}`);
  return result;
};
export const markAsRead = (conversation_id) => {
  return api.post(`conversations/${conversation_id}/mark-read`);
}