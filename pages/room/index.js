import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { Button, Paper, Typography, TextField, CircularProgress } from '@mui/material';
import { useMutation, gql } from '@apollo/client';

import { initializeApollo } from '@/utils/apollo/client';
import { GET_USER } from '@/utils/apollo/templates/User';
import * as userState from 'atoms/user';

const CREATE_SPACE = gql`
  mutation CreateSpaceMutation($spaceInput: CreateSpaceInput!) {
    createSpace(input: $spaceInput) {
      name
      description
    }
  }
`;

const CreateRoom = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [roomIsLoading, setRoomIsLoading] = useState(false);
  // const setUser = useSetRecoilState(userState.user);

  const [createSpace] = useMutation(CREATE_SPACE);

  const createNewSpace = async () => {
    setRoomIsLoading(true);
    const spaceId = uuid();
    // setUser(user);

    const spaceInput = {
      // Sample data
      name: 'Pair Programming Session',
      description: '16X 🚀🚀🚀🚀',
      userId: 0,
      username: 'James',
      spaceId,
    };

    try {
      // const result = await createSpace({ variables: { spaceInput } });

      console.debug('Joining Space:', result);
      router.push(`/room/${spaceId}`);
    } catch (err) {
      console.warn('Unable to join space:', err);
    }
    router.push(`/room/${spaceId}`);
  };

  return (
    <div className="h-screen w-screen grid place-items-center">
      <Paper className="w-96 p-4">
        <Typography component="h1" variant="h5">
          JOIN A SPACE
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button disabled fullWidth variant="contained" color="primary" onClick={() => router.push(`/room/${roomId}`)}>
            JOIN
          </Button>
          <Typography component="h2" variant="h5" className="pt-5 mt-5 text-md">
            OR CREATE ONE
          </Typography>
          <Button fullWidth variant="contained" color="primary" className="my-2" onClick={createNewSpace}>
            CREATE
          </Button>
          {roomIsLoading && <CircularProgress />}
        </div>
      </Paper>
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   const [name, email] = ['james', 'james@gmail.com'];

//   const apolloClient = initializeApollo();
//   const { data } = await apolloClient.query({
//     query: GET_USER,
//     variables: { name, email },
//   });

//   const user = { ...session.user, ...data.user };
//   console.debug('User:', user);

//   return {
//     props: {
//       user: JSON.parse(JSON.stringify(user)),
//       initialApolloState: apolloClient.cacheextr
//     },
//   };
// };

// export const getServerSideProps = async ({ locale }) => ({
//   props: {
//       ...(await serverSideTranslations(locale, ['common']))
//   }
// });

CreateRoom.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CreateRoom;
