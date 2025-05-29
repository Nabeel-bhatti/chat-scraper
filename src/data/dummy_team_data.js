import avatar1 from 'assets/images/users/avatar1.jpg';
import avatar2 from 'assets/images/users/avatar2.jpg';
import avatar3 from 'assets/images/users/avatar3.jpg';
import avatar4 from 'assets/images/users/avatar4.jpg';
import avatar5 from 'assets/images/users/avatar5.jpg';

export const mockTeamData = [
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    email: 'john@gmail.com',
    role: 'developer',
    imageUrl: ''
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    email: 'jane@gmail.com',
    role: 'designer',
    imageUrl: ''
  }
];
export const dummyUser = [
  {
    id: 1,
    name: 'Alex Johnson',
    initials: 'AJ',
    email: 'alex@example.com',
    role: 'Senior Developer',
    timeZone: 'GMT+1 (London)',
    imageUrl: '',
    experties: ['React Expert', 'TypeScript', 'Client Communication']
  }
];
export const integrations = [
  {
    id: 1,
    platform: 'Upwork',
    status: 'Active',
    last_synced: 'May 7, 2025, 12:00 PM'
  },
  {
    id: 2,
    platform: 'Fiverr',
    status: 'Active',
    last_synced: 'May 7, 2025, 12:00 PM'
  },
  {
    id: 3,
    platform: 'Slack',
    status: 'Active',
    last_synced: 'May 7, 2025, 12:00 PM'
  }
];
export const appChat = [
  {
    id: 1,
    name: 'Alcides Antonio',
    message: 'Hello, we spoke earlier on the phone',
    image: avatar1,
    time: '2 min ago'
  },
  {
    id: 2,
    name: 'Marcus Finn',
    message: 'Is the job still available?',
    image: avatar2,
    time: 'an hour ago'
  },
  {
    id: 3,
    name: 'Carson Darrin',
    message: "What is a screening task? I'd like to",
    image: avatar3,
    time: '3 hours ago'
  },
  {
    id: 4,
    name: 'Fran Perez',
    message: 'Still waiting for feedback',
    image: avatar4,
    time: '8 hours ago'
  },
  {
    id: 5,
    name: 'Jie Yan',
    message: 'Need more information about campaigns',
    image: avatar5,
    time: '10 hours ago'
  }
];
export const schedule = [
  {
    id: 1,
    day: 'Today',
    time: '2:00 PM',
    title: 'Client Discovery Call',
    client: 'Acme Corp',
    duration: '30 min'
  },
  {
    id: 2,
    day: 'Today',
    time: '4:30 PM',
    title: 'Design Review Meeting',
    client: 'TechStart Inc',
    duration: '1 hour'
  },
  {
    id: 3,
    day: 'Tomorrow',
    time: '10:00 AM',
    title: 'Weekly Team Sync',
    client: 'Internal',
    duration: '45 min'
  },
  {
    id: 1,
    day: 'Oct 24',
    time: '12:00 PM',
    title: 'Project Delivery',
    client: 'Global Solutions',
    duration: 'Deadline'
  }
];
