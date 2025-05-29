import * as React from 'react';
import {
  ArrowRightOutlined,
  BarChartOutlined,
  // BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  MessageOutlined,
  MoreOutlined,
  RiseOutlined,
  UserOutlined,
  WechatWorkOutlined,
} from '@ant-design/icons';
import { Avatar, Box, Button, Card, IconButton, Stack, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { appChat, schedule } from '../../data/dummy_team_data';
import { fontSize } from '@mui/system';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const userName = localStorage.getItem('user_name');
  const navigate = useNavigate();
  const ColoredLinearProgress = ({
    value,
    color = '#22C55E',
    height = 7,
    borderRadius = 5,
    backgroundColor = '#E5E7EB',
    sx = {},
    ...props
  }) => (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height,
        borderRadius: 5,
        backgroundColor: '#f3f4f6',
        [`& .${linearProgressClasses.bar}`]: {
          backgroundColor: color,
          borderRadius
        },
        ...sx
      }}
      {...props}
    />
  );

  const C = styled(Card)({
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    borderColor: '#e4e4e7',
    borderRadius: '7px'
  });
  const C2 = styled(Card)({
    height: '100%',
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    padding: '15px',
    borderColor: '#e4e4e7',
    borderRadius: '7px'
  });
  const C3 = styled(Card)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    borderColor: '#e4e4e7',
    borderRadius: '7px'
  });

  const MainG = styled(Grid)({
    paddingTop: '20px'
  });

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack size={12} bgcolor={'#2463EB'} color={'#fff'} sx={{ padding: '1.5rem', boxShadow: "0 4px 6px -1px rgb(36 99 235 / 0.1), 0 2px 4px -2px rgb(36 99 235 / 0.1)", }} borderRadius={2}>
        <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: '700' }}>
          Welcome back, {userName}!
        </Typography>
        <Typography sx={{ fontSize: '16px', mb: '12px' }}>You have 5 unread messages and 3 tasks requiring attention today.</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            endIcon={<ArrowRightOutlined />}
            sx={{
              padding: '8px 16px',
              backgroundColor: '#fff',
              color: '#2463EB',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#2463EB'
              }
            }}
          >
            View Messages
          </Button>
          <Button
            sx={{
              backgroundColor: '#fff',
              padding: '8px 16px',
              color: '#2463EB',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#2463EB'
              }
            }}
          >
            Manage Task
          </Button>
        </Stack>
      </Stack>
      <MainG container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <C variant="outlined">
            <Box>
              <Typography variant="h5" sx={{ pb: 1, fontSize: '14px' }}>
                Active Clients
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700 }}>
                12
              </Typography>
              <Box sx={{ display: 'flex', gap: '5px', color: '#22C55E' }}>
                <Typography sx={{ fontSize: '12px' }}>
                  <RiseOutlined />
                </Typography>
                <Typography sx={{ fontSize: '12px' }}>+2 this month</Typography>
              </Box>
            </Box>
            <Box>
              <UserOutlined />
            </Box>
          </C>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <C variant="outlined">
            <Box>
              <Typography variant="h5" sx={{ pb: 1, fontSize: '14px' }}>
                Open Conversations
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700 }}>
                23
              </Typography>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Typography sx={{ fontSize: '12px' }}>5</Typography>
                <Typography sx={{ fontSize: '12px' }}>requiring responses</Typography>
              </Box>
            </Box>
            <Box>
              <WechatWorkOutlined />
            </Box>
          </C>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <C2 variant="outlined" sx={{ pb: '24px' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ pb: 1, fontSize: '14px' }}>
                  Completed Tasks
                </Typography>
                <Box>
                  <CheckCircleOutlined />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700, mb: '3px' }}>
                78%
              </Typography>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <ColoredLinearProgress value={78} color="#22C55E" />
                </Stack>
              </Box>
            </Box>
          </C2>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <C variant="outlined">
            <Box>
              <Typography variant="h5" sx={{ pb: 1, fontSize: '14px' }}>
                Response Time
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700 }}>
                12 hrs
              </Typography>
              <Box sx={{ display: 'flex', gap: '5px', color: '#22C55E' }}>
                <Typography sx={{ fontSize: '12px' }}>15%</Typography>
                <Typography sx={{ fontSize: '12px' }}>faster than average</Typography>
              </Box>
            </Box>
            <Box>
              <FieldTimeOutlined />
            </Box>
          </C>
        </Grid>
      </MainG>

      <MainG container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <C2 variant="outlined">
            <Box>
              <Box sx={{ mb: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton
                    sx={{
                      color: '#000', borderRadius: '50px', bgcolor: '#fff', boxShadow: '0px 3px 14px rgba(0,0,0,0.08)', p: '6px', pl: '10px', pr: '10px', mr: '16px', textAlign: 'center ', cursor: 'default', "&:hover": { color: '#000', bgcolor: '#fff', }
                    }}
                  >
                    <MessageOutlined style={{ fontSize: "1.5rem" }} />
                  </IconButton>

                  <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>App chat</Typography>
                </Box>
                <IconButton
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#000',
                    '&:hover': {
                      color: '#2463EB',
                    }
                  }}
                >

                  <MoreOutlined style={{

                    rotate: "90deg",
                    fontSize: "24px",
                  }} />
                </IconButton>
              </Box>
              <Box>
                {
                  appChat.map((user) => (
                    <Box onClick={() => navigate('/messages')} sx={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '8px 8px', borderRadius: "8px", cursor: "pointer", "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)"
                      },
                    }}>

                      <Box sx={{ display: 'flex', columnGap: '12px', alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'center ' }}>
                          <Avatar alt="profile user" src={user.image} size="sm" />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: "#212636" }}>{user.name}</Typography>
                          <Typography sx={{ fontSize: '14px', color: '#667085' }}>{user.message}</Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: '12px', color: '#667085' }}>{user.time}</Typography>
                    </Box>

                  ))
                }

              </Box>
              <hr style={{
                color: "#dcdfe4", border: "solid", borderWidth: "0px 0px thin", marginTop: "8px", marginLeft: "-16px",
                marginRight: "-16px"
              }} />
              <Button
                onClick={() => navigate('/messages')}
                endIcon={<ArrowRightOutlined />}
                sx={{
                  mt: 2,
                  borderRadius: "8px",
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#000',
                  '&:hover': {
                    color: '#2463EB'
                  }
                }}
              >
                Go to chat
              </Button>
            </Box>
          </C2>
        </Grid>
        {/* <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <C2 variant="outlined" sx={{ height: '100%' }}>
            <Box>
              <Box sx={{ mb: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Recent Activity</Typography>
                <IconButton
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#000',
                    '&:hover': {
                      color: '#2463EB'
                    }
                  }}
                >
                  <BellOutlined />
                </IconButton>
              </Box>
              <Box sx={{ pl: '6px' }}>
                <Box sx={{ display: 'flex', columnGap: '12px', alignItems: 'center' }}>
                  <Box sx={{ borderRadius: '50px', bgcolor: '#F3F4F6', p: '4px', pl: '8px', pr: '8px', textAlign: 'center ' }}>
                    <WechatWorkOutlined />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '14px' }}>Sarah Miller sent you a message</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>5 minutes ago</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      mt: '-18px',
                      bgcolor: '#FEF2F2',
                      fontSize: '12px',
                      lineHeight: '16px',
                      '&:hover': { bgcolor: '#fef2f2', color: '#ef4444', borderColor: '#ef4444' }
                    }}
                  >
                    High Priority
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', columnGap: '12px', alignItems: 'center', mt: '10px' }}>
                  <Box sx={{ borderRadius: '50px', bgcolor: '#F3F4F6', p: '4px', pl: '8px', pr: '8px', textAlign: 'center ' }}>
                    <FileTextOutlined />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '14px' }}>Project proposal for XYZ Company was approved</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>2 hours ago</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', columnGap: '12px', alignItems: 'center', mt: '10px' }}>
                  <Box sx={{ borderRadius: '50px', bgcolor: '#F3F4F6', p: '4px', pl: '8px', pr: '8px', textAlign: 'center ' }}>
                    <UserOutlined />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '14px' }}>Jessica assigned you to the Marketing Campaign project</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Yesterday</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', columnGap: '12px', alignItems: 'center', mt: '10px' }}>
                  <Box sx={{ borderRadius: '50px', bgcolor: '#F3F4F6', p: '4px', pl: '8px', pr: '8px', textAlign: 'center ' }}>
                    <CheckCircleOutlined />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '14px' }}>Task 'Design Homepage Mockup' was completed</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Yesterday</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Button
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                mt: 4,
                color: '#000',
                '&:hover': {
                  color: '#2463EB'
                }
              }}
              fullWidth
            >
              View All Activity
            </Button>
          </C2>
        </Grid> */}
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <C2 variant="outlined">
            <Box>
              <Box sx={{ mb: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Upcoming Schedule</Typography>
                <IconButton
                  sx={{
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#000',
                    '&:hover': {
                      color: '#2463EB'
                    }
                  }}
                >
                  <CalendarOutlined />
                </IconButton>
              </Box>
              {schedule.map((data) => (

                <C3 variant="outlined" sx={{ p: '9.6px', mt: '12px' }}>
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <Box>
                      <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>{data.day}</Typography>
                      <Typography sx={{ fontSize: '12px' }}>{data.time}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>{data.title}</Typography>
                      <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>{data.client}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <Typography sx={{ color: '#6b7280', fontSize: '12px' }}>{data.duration}</Typography>
                  </Box>
                </C3>
              ))}
            </Box>
            <Button
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                mt: 2,
                color: '#000',
                '&:hover': {
                  color: '#2463EB'
                }
              }}
              fullWidth
            >
              View Full Calendar
            </Button>
          </C2>
        </Grid>
      </MainG>
      <C2 sx={{ mt: '20px' }} variant="outlined">
        <Grid container>
          <Grid size={12}>
            <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Platform Activity</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: '24px' }} spacing={2}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Grid container>
              <Grid size={1}>
                <Box sx={{ bgcolor: '#28af60', height: '40px', width: '8px', borderRadius: '4px' }}></Box>
              </Grid>
              <Grid size={11}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Upwork</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>23 messages</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'start' }}>
                      <Typography sx={{ color: '#22c55e', fontSize: '16px' }}>+12%</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '5px' }}>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <ColoredLinearProgress value={100} color="#28af60" height={6} />
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Grid container>
              <Grid size={1}>
                <Box sx={{ bgcolor: '#1aa87d', height: '40px', width: '8px', borderRadius: '4px' }}></Box>
              </Grid>
              <Grid size={11}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Fiverr</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>14 messages</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'start' }}>
                      <Typography sx={{ color: '#22c55e', fontSize: '16px' }}>+5%</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '5px' }}>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <ColoredLinearProgress value={60} color="#1aa87d" height={6} />
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Grid container>
              <Grid size={1}>
                <Box sx={{ bgcolor: '#0b7dda', height: '40px', width: '8px', borderRadius: '4px' }}></Box>
              </Grid>
              <Grid size={11}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Freelancer</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>9 messages</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'start' }}>
                      <Typography sx={{ color: '#ef4444', fontSize: '16px' }}>-3%</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '5px' }}>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <ColoredLinearProgress value={40} color="#0b7dda" height={6} />
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Grid container>
              <Grid size={1}>
                <Box sx={{ bgcolor: '#e86417', height: '40px', width: '8px', borderRadius: '4px' }}></Box>
              </Grid>
              <Grid size={11}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                      <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Custom</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>7 messages</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'start' }}>
                      <Typography sx={{ color: '#22c55e', fontSize: '16px' }}>+2%</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '5px' }}>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <ColoredLinearProgress value={30} color="#e86417" height={6} />
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          sx={{
            borderColor: '#e4e4e7',
            mt: '24px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#000',
            '&:hover': {
              color: '#2463EB',
              borderColor: '#ecf2fd'
            }
          }}
          startIcon={<BarChartOutlined />}
          variant="outlined"
        >
          View Detailed Analytics
        </Button>
      </C2>
    </Box >
  );
}
