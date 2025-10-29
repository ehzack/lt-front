import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import image from "../../assets/images/NotFound.png";

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  height: '80vh',
  maxWidth: '50%',
  padding: '7.4rem 0 0 0',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden'
}));

// ----------------------------------------------------------------------

export default function NotFound() {
  return (
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={image}
            sx={{ width: 500,margin:'0 auto',height:'400px' }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink} >
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
  );
}
