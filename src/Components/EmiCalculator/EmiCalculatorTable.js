import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { HistoryContext } from '../../App';

const columns = [
    { field: 'S No.', type: 'number' },
    { field: 'Beginning Balance', width: 150, type: 'number' },
    { field: 'Interest Amount', width: 150, type: 'number' },
    { field: 'EMI', width: 100, type: 'number' },
    { field: 'Ending Balance', width: 150, type: 'number' },

];
const createMonthRow = (sNo, currentPrincipalAmount, endingPrincipalAmount, emi, interestAmount) => {

    return {
        'id': sNo,
        'S No.': sNo,
        'Beginning Balance': currentPrincipalAmount,
        'Interest Amount':interestAmount,
        'EMI': emi,
        'Ending Balance': endingPrincipalAmount
    };
};

const EmiCalculatorTable = ({ emiDetails }) => {

    const { principalAmount, rateOfInterest, duration } = emiDetails;
    let p = principalAmount
    let r = rateOfInterest / (12* 100)
    let n = duration
    let emi = ((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(2);
  



    const totalMonthTable = () => {
        let monthTable = [];
        let sNo = 1;
        let currentPrincipalAmount = p;
        let endingPrincipalAmount = p - emi;
        let interestAmount = n*emi;
        while (endingPrincipalAmount >= 0) {
            monthTable.push(createMonthRow(sNo, currentPrincipalAmount, endingPrincipalAmount, emi, interestAmount));

            currentPrincipalAmount = endingPrincipalAmount;
            interestAmount -=emi
            endingPrincipalAmount -= emi;
            sNo++;
        }
        if (endingPrincipalAmount > 0) {
            monthTable.push(createMonthRow(sNo, currentPrincipalAmount, 0, (emi + endingPrincipalAmount),interestAmount))
            sNo++;
        }
        while(interestAmount >0)
        {
            monthTable.push(createMonthRow(sNo, 0, 0, emi,interestAmount))
            sNo++;
            interestAmount-=emi;
        }
        return monthTable


    }
    let rows =  totalMonthTable();
    React.useEffect(() => {
        rows =  totalMonthTable();
    }, [{ emiDetails }])

    return (
        <Box sx={{ width: '80%' }}>
            <Stack direction="row" spacing={1}>
            </Stack>
            <Box sx={{ height: 400, mt: 1 }}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Box>
    );
}

export default EmiCalculatorTable