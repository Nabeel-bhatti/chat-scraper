export const ProfileCard = ({ user }) => {
  // Add safety checks
  if (!user) {
    console.error('ProfileCard received null user');
    return null;
  }

  console.log('Rendering ProfileCard for:', user);

  return (
    <Paper elevation={3} sx={{ p: 2, display: 'flex', minWidth: 240 }}>
      <Avatar src={user?.imageUrl} sx={{ width: 48, height: 48, mr: 2 }}>
        {user?.initials || '??'}
      </Avatar>

      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {user?.name || 'Unknown User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || 'No email provided'}
        </Typography>
      </Box>
    </Paper>
  );
};
