import { Box, Typography, TextField, Button } from '@mui/material';

const Contact: React.FC = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Contact
            </Typography>
            <TextField label="Name" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Message" fullWidth margin="normal" multiline rows={4} />
            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                Send
            </Button>
        </Box>
    );
};

export default Contact;
