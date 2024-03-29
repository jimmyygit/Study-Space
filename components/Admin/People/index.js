import { Fragment } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ROLES from '@/context/libs/roles';
import { useSocketContext } from '@/context/admin/SocketContext';

const People = () => {
  const { selectedUser, setSelectedUser, users, userConversations } = useSocketContext();

  return (
    <List sx={{ height: '100%', overflowY: 'auto', width: '100%', bgcolor: 'background.paper' }}>
      {users.map((user) => {
        const conversation = userConversations.find((obj) => obj.socketId == user.socketId)?.conversation ?? [];

        return (
          <Fragment key={user.socketId}>
            <ListItem
              alignItems="flex-start"
              onClick={() => setSelectedUser(user)}
              sx={{
                bgcolor: selectedUser.socketId == user.socketId ? 'primary.main' : 'background.paper',
                '&:hover': {
                  bgcolor: !selectedUser.socketId == user.socketId ? 'primary.light' : null,
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={user.username} />
              </ListItemAvatar>
              <ListItemText
                sx={{ textOverflow: 'ellipsis' }}
                primary={user.role == ROLES.TEACHER.value ? `${user.username} (Teacher)` : `${user.username}`}
                secondary={
                  <>
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                      {conversation.at(-1)?.fromMe ? 'You: ' : ''}
                      {conversation.at(-1)?.text}
                    </Typography>
                    {/* {conversation.at(-1)?.text} */}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
  );
};

export default People;
