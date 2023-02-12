//EmiCalculator

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmiCalculatorTable from './EmiCalculatorTable';
import { Alert } from '@mui/material';
import { EmiListContext, HistoryContext } from '../../App';


const theme = createTheme();

export default function EmiCalculator() {
    const [emiDetails, setEmiDetails] = React.useState({})
    const [helpText, setHelpText] = React.useState({})
    const [error, setError] = React.useState(false)
    const [{emisHistory,setEmisHistory}] = React.useContext(HistoryContext)
    const[{emiList, seEmiList}] = React.useContext(EmiListContext)

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let principalAmount = data.get('principalAmount');
        let rateOfInterest = data.get("rateOfInterest");
        let duration = data.get("duration");

        if (!isNaN(principalAmount) && principalAmount <= 0) {
            setError(true)
            setHelpText({ helpTextForPrincipalAmount: 'Enter a valid Number' })

        }
        else if (!isNaN(rateOfInterest) && (rateOfInterest <= 0 || rateOfInterest >= 101)) {
            setError(true)
            setHelpText({ helpTextForRateOfInterest: 'Rate shoud be between 1 to 100' })

        }
        else if (!isNaN(duration) && (duration <= 0)) {
            setError(true)
            setHelpText({ helpTextForDuration: 'Duration should greater than or equal to 1' })

        } else {
            setError(false)
            setEmisHistory(
                {
                    principalAmount: parseInt(principalAmount),
                    rateOfInterest: parseFloat(rateOfInterest).toFixed(2),
                    duration: parseInt(duration)
                }
                
            );
            seEmiList([...emiList,
               {
                    principalAmount: parseInt(principalAmount),
                    rateOfInterest: parseFloat(rateOfInterest).toFixed(2),
                    duration: parseInt(duration)
                }]
            )
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {!error ? null : <Alert severity="error" >Invalid Inputs!</Alert>}
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        EMI CALCULATOR
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            type={'number'}
                            margin="normal"
                            required
                            fullWidth
                            helperText={helpText["helpTextForPrincipalAmount"]}
                            id="principalAmount"
                            label="Principal Amount"
                            name="principalAmount"
                            autoComplete="principalAmount"
                            autoFocus
                        />
                        <TextField
                            type={'number'}
                            margin="normal"
                            required
                            fullWidth
                            helperText={helpText["helpTextForRateOfInterest"]}
                            id="rateOfInterest"
                            label="Rate Of Interest"
                            name="rateOfInterest"
                        />
                        <TextField
                            margin="normal"
                            type={'number'}
                            required
                            fullWidth
                            helperText={helpText["helpTextForDuration"]}
                            id="duration"
                            label="Duration"
                            name="duration"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, float: 'right' }}
                        >
                            Check EMI
                        </Button>
                    </Box>
                </Box>

            </Container>
            <div style={{display: 'flex', justifyContent: 'center', marginTop:'3rem'}}>
            <EmiCalculatorTable emiDetails={emisHistory} />
            </div>
            
        </ThemeProvider>
    );
}