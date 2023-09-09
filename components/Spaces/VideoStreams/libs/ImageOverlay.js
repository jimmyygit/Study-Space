import Image from 'next/image';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const DisplayImageContainer = styled(Box)({
  position: 'absolute',
  height: '18rem',
  width: '32rem',
  top: 0,
  left: 0,
  backgroundColor: 'black',
  display: 'grid',
  placeItems: 'center',
  zIndex: 10,
});

const ImageOverlay = () => {
  return (
    <DisplayImageContainer>
      <Box sx={{ height: '6rem', width: '6rem', overflow: 'hidden', borderRadius: '9999px', position: 'relative' }}>
        <div className='w-100 h-100'>
          Camera Off
        </div>
      </Box>
    </DisplayImageContainer>
  );
};

export default ImageOverlay;
