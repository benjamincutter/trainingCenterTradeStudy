import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { City, WEIGHTED_FIELDS } from '../models/cityFactory';
import { NormalizedCity2 } from '../hooks/useNormalizeField';

interface RawDataTableProps {
    data: NormalizedCity2[];
    useNormalized: boolean;
}

const RawDataTable = ({ data, useNormalized }: RawDataTableProps) => {
    const dataColumns = WEIGHTED_FIELDS.map((name) => {
        return {
            field: name.field,
            headerName: name.prettyName,
            width: 150,
            // @ts-ignore
            valueGetter: ({ row }) =>
                useNormalized
                    ? row[name.field].normalized
                    : row[name.field].value,
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
