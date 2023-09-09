import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Grid, Dialog, Typography } from '@mui/material';
import LeaveCallButton from './LeaveCallButton';
import { useRouter } from 'next/router';

const LeaveCallDialog = ({ open, setOpen, leaveCall }) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" className="p-5">
      <Grid className="p-5 flex flex-col align-items-center justify-items-center">
        <Typography variant="h4" component="h1" sx={{ color: 'primary.dark' }} className="font-bold my-4">
          Leaving so soon?
        </Typography>
        <p className="my-4">Double check you have completed all your todo items!</p>
        <div className="flex justify-end w-100">
          <LeaveCallButton fn={() => setOpen(false)} text="Cancel" fillBackground={false} />
          <LeaveCallButton
            fn={() => {
              router.push('/room');
              router.push(`/`);
              setTimeout(() => {
                window.location.reload();
                setTimeout(() => {
                  router.push(`/`);
                }, 4000);
              }, 2000);
            }}
            text="Leave Session"
            fillBackground={true}
          />
        </div>
      </Grid>
    </Dialog>
  );
};

LeaveCallDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  leaveCall: PropTypes.func.isRequired,
};

export default LeaveCallDialog;
