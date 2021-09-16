import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import { getSession } from 'next-auth/client';
import classNames from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery, gql } from '@apollo/client';

import { Grid, Hidden, Drawer, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import PaletteIcon from '@material-ui/icons/Palette';
import GroupIcon from '@material-ui/icons/Group';

import Sidebar from 'components/Dashboard/Sidebar';
import DashboardContainer from 'components/Dashboard/DashboardContainer';
import ChartCard from 'components/Dashboard/Cards/ChartCard';
import VerticalBar from 'components/Dashboard/Charts/VerticalBar';
import LineChart from 'components/Dashboard/Charts/LineChart';
import ProfileDialog from 'components/Dashboard/Modals/ProfileDialog';
import CollapsableDrawer from 'components/Dashboard/CollapsableDrawer';
import * as userState from 'atoms/user';
import { initializeApollo } from 'utils/apollo/client';
import { chartData } from '../../data/chartData';
import getUser from '@/utils/getUser';

const GET_SESSION_USER = gql`
  query ($name: String!, $email: String!) {
    user(name: $name, email: $email) {
      _id
      friends
    }
  }
`;
const GET_SPACES = gql`
  query Query($spacesSpaceIds: [ID]) {
    spaces(spaceIds: $spacesSpaceIds) {
      name
      participants {
        _id
        name
        email
        username
        image
      }
      description
      spaceId
      isActive
      music
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  fabDrawer: {
    borderRadius: '0px 1rem 1rem 0px',
    overflow: 'hidden',
    width: '40vw',
  },
  dashboardBackground: {
    background: theme.palette.secondary.dashboardGradient,
    minHeight: '100vh',
  },
  rightSettingsBar: {
    background: theme.palette.background.paper,
  },
  settingsIcons: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const Dashboard = ({ user, friendData, spaceCardData }) => {
  const classes = useStyles();
  const { peakStudyTimes, studyTimes } = chartData;
  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const setUser = useSetRecoilState(userState.user);

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <Grid container direction="row" className={classes.dashboardBackground}>
      {/* Fab Drawer on Smaller Screens */}
      <Hidden mdUp>
        <Fab onClick={() => setOpen(!open)} color="primary" className="fixed bottom-4 right-4 z-40">
          <MenuIcon />
        </Fab>
        <Grid item xs={1}>
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)} classes={{ paper: classes.fabDrawer }}>
            <Sidebar
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              friendData={friendData}
              isSmallScreen={true}
            />
          </Drawer>
        </Grid>
      </Hidden>

      {/* Collapsable Drawer on Medium and Up */}
      <Hidden smDown>
        <Grid item md={open ? 2 : 1}>
          <CollapsableDrawer open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
            <Sidebar
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              friendData={friendData}
              isSmallScreen={false}
            />
          </CollapsableDrawer>
        </Grid>
      </Hidden>

      {/* Dashboard Body */}
      <Grid item xs={12} md={open ? 10 : 11} container direction="row">
        <Grid container item xs={11} direction="row" justifyContent="center">
          <Grid item xs={12} className="mb-4">
            <DashboardContainer spaceCardData={spaceCardData} />
          </Grid>
          <Grid item container spacing={2} className="mt-2">
            <Grid item xs={12} md={6}>
              <ChartCard
                title={peakStudyTimes.title}
                date={peakStudyTimes.date}
                chart={<VerticalBar options={peakStudyTimes.options} data={peakStudyTimes.data} />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartCard
                title={studyTimes.title}
                date={studyTimes.date}
                chart={<LineChart options={studyTimes.options} data={studyTimes.data} />}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className="h-4" />
        </Grid>

        {/* Right Settings Bar MOVE INTO DRAWER? TAKE OUT XS IF SO*/}
        <Grid item xs={1} md={1}>
          {user && (
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignItems="center"
              className={classNames(['rounded-br-2xl', classes.rightSettingsBar])}>
              <IconButton onClick={() => setProfileOpen((prev) => !prev)}>
                <SettingsIcon className={classes.settingsIcons} />
              </IconButton>
              <IconButton aria-label="theme">
                <PaletteIcon className={classes.settingsIcons} />
              </IconButton>
              <IconButton aria-label="friends">
                <GroupIcon className={classes.settingsIcons} />
              </IconButton>
              <ProfileDialog user={user} isOpen={profileOpen} handleClose={() => setProfileOpen(false)} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const redirectToHome = {
  redirect: {
    permanent: false,
    destination: '/',
  },
};

export const getServerSideProps = async ({ req, res, locale }) => {
  const user = await getUser(req);
  if (!user) {
    console.debug('Log in first!');
    return redirectToHome;
  }
  const apolloClient = initializeApollo();

  let spaces = {};
  try {
    const { data } = await apolloClient.query({ query: GET_SPACES, variables: { spacesSpaceIds: [] } });
    spaces = data.spaces;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)), // otherwise nextjs throws error - can't serialize data
      spaceCardData: JSON.parse(JSON.stringify(spaces)),
      ...(await serverSideTranslations(locale, ['common'])),
      initialApolloState: apolloClient.cache.extract(),
      friendData: [
        {
          name: 'Yi Nan Zhang',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Charles Liu',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Jimmy Yang',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Mabel Kwok',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Eden Chan',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
      ],
    },
  };
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  friendData: PropTypes.array.isRequired,
  spaceCardData: PropTypes.array.isRequired,
};

export default Dashboard;
