import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import City from '../models/city';
import { NormalizedCity2 } from '../hooks/useNormalizeField';

interface RawDataTableProps {
    data: NormalizedCity2[];
    useNormalized: boolean;
}

const dataColumnNames = [
    { data: 'sunnyDays', headerName: 'Sunny Days' },
    { data: 'comfortIndex', headerName: 'Comfort Index' },
    { data: 'commuteTime', headerName: 'Commute Time' },
];

const RawDataTable = ({ data, useNormalized }: RawDataTableProps) => {
    const dataColumns = dataColumnNames.map((name) => {
        return {
            field: name.data,
            headerName: name.headerName,
            width: 150,
            // @ts-ignore
            valueGetter: ({ row }) =>
                useNormalized
                    ? row[name.data].normalized
                    : row[name.data].value,
        };
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'City', width: 150 },
        { field: 'weightedScore', headerName: 'Weighted Score', width: 150 },
        ...dataColumns,
    ];

    return (
        <Box sx={{ width: '90%', height: '700px', backgroundColor: 'white' }}>
            <DataGrid rows={data} columns={columns} />
        </Box>
    );
};

export default RawDataTable;
