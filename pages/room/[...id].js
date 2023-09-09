import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import addMilliseconds from 'date-fns/addMilliseconds';
import { useSetRecoilState } from 'recoil';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import { SpaceProvider } from '@/context/spaces';
import VideoStreams from '@/components/Spaces/VideoStreams';
import CallTabs from '@/components/Spaces/CallTabs';
import * as spotifyState from '@/atoms/spotify';

const CallOptions = dynamic(() => import('@/components/Spaces/VideoOptions/CallOptions'));

const GridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(5),
  position: 'relative',
  height: '100vh',
  // minHeight: '100vh',
  backgroundColor: 'rgba(249, 250, 251)',
  justifyContent: 'space-between',
}));

const Room = () => {
  const router = useRouter();
  const [showTabs, setShowTabs] = useState(false);
  // const roomId = router.query;

  // const initRecoilState = () => {
  //   if (router.query && router.query.data) {
  //     // redirected back to room and user clicked signed into Spotify in call tab.
  //     const expiresIn = spotifyData.expiresIn * 1000;
  //     const date = new Date();
  //     const expireDate = addMilliseconds(date, expiresIn);
  //     const refreshDate = addMilliseconds(date, expiresIn / 4);
  //     setSpotifyRefresh({ expiresIn, expireDate, refreshDate });
  //     // replaces url query to prevent user from copying/pasting space url to friends with unnecessary data
  //     router.replace('/room/[...id]', `/room/${roomId}`);
  //   }
  // };

  useEffect(() => {
    // initRecoilState();
  }, []);

  return (
    <SpaceProvider>
      <GridContainer container>
        <VideoStreams showTabs={showTabs} />
        <CallOptions />
        <CallTabs showTabs={showTabs} setShowTabs={setShowTabs} />
      </GridContainer>
    </SpaceProvider>
  );
};

// export const getStaticPaths = () => {
//   return {
//     paths: [{ params: { id: ['1'] } }],
//     fallback: true,
//   };
// };

/**
 * This causes the 12 second server render times. IDK why
 */
// export const getStaticProps = async ({ locale, params }) => {
//   return {
//     props: {
//       roomId: params.id[0],
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// };

Room.propTypes = {
  // roomId: PropTypes.string.isRequired,
  // spotifyAuthURL: PropTypes.string.isRequired,
};

export default Room;
