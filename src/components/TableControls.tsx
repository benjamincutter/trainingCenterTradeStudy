import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControlLabel,
    FormGroup,
    Slider,
    Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { roundToTwoDecimals } from '../hooks/useNormalizeField';

interface SliderConfig {
    name: string;
    value: number;
    setValue: (value: number) => void;
}

interface TableControlsProps {
    showNormalizedScore: boolean;
    setShowNormalizedScore: (show: boolean) => void;
    sliders: SliderConfig[];
}

const TableControls = ({
    showNormalizedScore,
    setShowNormalizedScore,
    sliders,
}: TableControlsProps) => {
    const totalWeight = sliders.reduce((acc, curr) => acc + curr.value, 0);
    return (
        <Box margin="2%" width={'50%'}>
            <Typography>TableControls</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="show-weights-scales"
                >
                    <Typography>Adjust Weights</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        align="left"
                        color={totalWeight === 1 ? 'green' : 'red'}
                    >
                        Total weight: {roundToTwoDecimals(totalWeight)}
                    </Typography>
                    {sliders.map((slider) => (
                        <FormGroup key={slider.name}>
                            <Typography>
                                {slider.name} (
                                {roundToTwoDecimals(slider.value)})
                            </Typography>
                            <Slider
                                value={slider.value}
                                // @ts-ignore
                                onChange={(e, value) => slider.setValue(value)}
                                step={0.01}
                                min={0}
                                max={1}
                            />
                        </FormGroup>
                    ))}
                </AccordionDetails>
            </Accordion>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            checked={showNormalizedScore}
                            onChange={() =>
                                setShowNormalizedScore(!showNormalizedScore)
                            }
                        />
                    }
                    label="Show Normalized Values"
                />
            </FormGroup>
        </Box>
    );
};

export default TableControls;
