import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'next-i18next';

import makeStyles from '@mui/styles/makeStyles';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import AccountDetails from './AccountDetails';
import ChangePassword from './ChangePassword';
import * as authState from 'atoms/auth';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    '& > div:nth-child(3) > div': {
      borderRadius: theme.spacing(3),
    },
  },
  mainForm: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(2),
  },
  mainFormBody: {
    backgroundColor: theme.palette.primary.extraLight,
    padding: theme.spacing(3),
    borderRadius: '16px',
    position: 'relative',
  },
  tab: {
    textTransform: 'none',
  },
  activeTab: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  tabTitle: {
    color: theme.palette.primary.dark,
    [theme.breakpoints.up('md')]: {
      paddingBottom: '25px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },
  },
  closeIcon: {
    position: 'absolute',
    top: '25px',
    right: '25px',
    color: theme.palette.primary.dark,
  },
  containedPrimary: {
    background: theme.palette.primary.dark,
    borderRadius: '2rem',
  },
  imageContainer: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    overflow: 'hidden',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transition: 'all 0.2s ease-in-out',
    '& > h6': {
      display: 'none',
      transition: 'all 0.2s ease-in-out',
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.4)',
      '& > h6': {
        display: 'block',
      },
      '& > input': {
        cursor: 'pointer',
      },
    },
  },
}));

const tabComponents = {
  ACCOUNT_DETAILS: 'Account Details',
  CHANGE_PASSWORD: 'Change Password',
  PRIVACY: 'PRIVACY',
};

const ProfileDialog = ({ user, isOpen, handleClose, tabs }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const username = useRecoilValue(authState.username);
  const phoneNumber = useRecoilValue(authState.phoneNumber);
  const validUsername = useRecoilValue(authState.validUsername);
  const validPhoneNumber = useRecoilValue(authState.validPhoneNumber);
  const validEmail = useRecoilValue(authState.validEmail);
  const validNewPassword = useRecoilValue(authState.validNewPassword);
  const newPasswordsMatch = useRecoilValue(authState.newPasswordsMatch);

  const renderTabComponent = (component) => {
    switch (component) {
      case tabComponents.ACCOUNT_DETAILS:
        return (
          <AccountDetails
            user={user}
            editMode={editMode}
            saveChanges={saveChanges}
            setSaveChanges={setSaveChanges}
            setEditMode={setEditMode}
          />
        );
      case tabComponents.CHANGE_PASSWORD:
        return (
          <ChangePassword user={user} editMode={editMode} saveChanges={saveChanges} setSaveChanges={setSaveChanges} />
        );
      case tabComponents.PRIVACY:
        return <h1>{t('LABEL_PRIVACY')}</h1>;
      default:
        return <h1>{t('LABEL_ACCOUNT_DETAILS')}</h1>;
    }
  };

  const toggleSaveMode = () => {
    if (editMode) {
      setSaveChanges(true);
    }
    setEditMode((prev) => !prev);
  };

  const isEditButtonDisabled = () => {
    if (
      tabIndex === 0 &&
      editMode &&
      (!validEmail || (!validUsername && username !== '') || (!validPhoneNumber && phoneNumber !== ''))
    ) {
      return true;
    }
    if (tabIndex === 1 && editMode && !validNewPassword && !newPasswordsMatch) {
      return true;
    }
    return false;
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      className={classes.dialogRoot}
      aria-labelledby="Edit Profile Dialog"
      aria-describedby="Dialog to Edit Profile"
    >
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <Grid container direction="row" className="pt-4">
          {/* Left sidebar for md+ */}
          <Hidden mdDown>
            <Grid container item xs={12} md={3} className="p-4">
              <TabList className="w-full">
                {tabs.map((tab, index) => (
                  <Tab key={tab.tabName} className="pl-2">
                    <Button
                      fullWidth
                      disableRipple
                      className={classNames([
                        'justify-start',
                        'pb-2',
                        'pl-4',
                        classes.tab,
                        index === tabIndex && classes.activeTab,
                      ])}
                    >
                      {tab.tabName}
                    </Button>
                  </Tab>
                ))}
              </TabList>
              <Grid container direction="column" alignItems="baseline" justifyContent="flex-end">
                {/* <Button>{t('LABEL_PRIVACY')}</Button>} */}
                <Button>{t('LABEL_LOGOUT')}</Button>
              </Grid>
            </Grid>
          </Hidden>

          {/* TITLE */}
          <Grid container item direction="row" xs={12} md={9} className={classes.mainForm}>
            {tabs.map((tab, index) => (
              <TabPanel key={index} className="w-full">
                {/* Settings Nav for Small Screens */}
                {showSettings ? (
                  <Hidden mdUp>
                    <Grid container alignItems="middle" item xs={12} md={3} className="p-4">
                      <Grid item xs={12} sm={12}>
                        <Typography align="left" variant="h3" className={classes.title}>
                          <Button>{t('LABEL_SETTINGS')}</Button>
                        </Typography>
                        <IconButton onClick={handleClose} className={classes.closeIcon} size="large">
                          <CloseIcon />
                        </IconButton>
                        <Grid container item sm={12} justifyContent="center" alignItems="center">
                          <div className={classes.imageContainer}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt={t('LABEL_ALT_PROFILE_PIC')}
                              src={null ?? user?.image}
                              className={classes.largeAvatar}
                            />
                          </div>
                        </Grid>
                        <Typography align="center" variant="h5" className={classes.title}>
                          {user?.name}
                        </Typography>

                        {/* Tabs */}
                        <TabList>
                          {tabs.map((tab, index) => (
                            <Tab key={tab.tabName} className="pl-2">
                              <Button
                                fullWidth
                                disableRipple
                                onClick={toggleSettings}
                                endIcon={<ArrowForwardIosIcon />}
                                className={classNames([
                                  'pb-2',
                                  'pl-4',
                                  classes.tab,
                                  index === tabIndex && classes.activeTab,
                                ])}
                              >
                                {tab.tabName}
                              </Button>
                            </Tab>
                          ))}
                        </TabList>
                      </Grid>
                      <Hidden mdUp>
                        <Grid container direction="column" justifyContent="middle">
                          {/* <Button>{t('LABEL_PRIVACY')}</Button>} */}
                          <Button>{t('LABEL_LOGOUT')}</Button>
                        </Grid>
                      </Hidden>
                      <Hidden mdDown>
                        <Grid container direction="column" alignItems="baseline" justifyContent="flex-end">
                          {/* <Button>{t('LABEL_PRIVACY')}</Button>} */}
                          <Button>{t('LABEL_LOGOUT')}</Button>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Hidden>
                ) : (
                  /* GREY AREA */
                  <Grid container item direction="row" xs={12} className="p-4">
                    <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                      <Hidden mdUp>
                        <Grid item xs={3}>
                          <ArrowBackIosIcon onClick={toggleSettings}></ArrowBackIosIcon>
                        </Grid>
                      </Hidden>
                      <Grid item xs={8}>
                        <Typography variant="h3" className={classes.tabTitle}>
                          {tab.title}
                        </Typography>
                      </Grid>
                      <Hidden mdDown>
                        <Grid item>
                          <IconButton onClick={handleClose} className={classes.closeIcon} size="large">
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Hidden>
                    </Grid>
                    <Grid item xs={12} className={classes.mainFormBody}>
                      {renderTabComponent(tab.component)}
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
            ))}
            {!showSettings && (
              <Grid container item justifyContent="flex-end" className="p-4">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.containedPrimary}
                  startIcon={editMode ? <CheckIcon /> : <EditIcon />}
                  onClick={toggleSaveMode}
                  disabled={isEditButtonDisabled()}
                >
                  {editMode ? t('LABEL_SAVE') : t('LABEL_EDIT_PROFILE')}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Tabs>
    </Dialog>
  );
};

ProfileDialog.propTypes = {
  user: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.string,
  allowMultipleFiles: PropTypes.bool,
  tabs: PropTypes.array,
};

ProfileDialog.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
  tabs: [
    {
      tabName: 'Account Details',
      title: 'Account Details',
      component: tabComponents.ACCOUNT_DETAILS,
    },
    {
      tabName: 'Change Password',
      title: 'Change Your Password',
      component: tabComponents.CHANGE_PASSWORD,
    },
    /*
    {
      tabName: 'Privacy',
      title: 'Edit Privacy Settings',
      component: tabComponents.PRIVACY,
    },
    */
  ],
};

export default ProfileDialog;
