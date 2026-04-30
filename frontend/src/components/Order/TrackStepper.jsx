import { Step, StepLabel, Stepper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDate } from '../../utils/functions';

const TrackStepper = ({ activeStep, orderOn, shippedAt, deliveredAt }) => {

    if (activeStep === -1) {
        return (
            <div className="text-red-500 font-medium text-center mt-4">
                Order Cancelled
            </div>
        );
    }

    const steps = [
        {
            status: "Ordered",
            dt: orderOn ? formatDate(orderOn) : null,
        },
        {
            status: "Shipped",
            dt: shippedAt ? formatDate(shippedAt) : null,
        },
        {
            status: "Delivered",
            dt: deliveredAt ? formatDate(deliveredAt) : null,
        },
    ];

    const completedIcon = (
        <span className="text-primary-green">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );

    const pendingIcon = (
        <span className="text-gray-400">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((item, index) => (
                <Step
                    key={index}
                    active={activeStep === index}
                    completed={activeStep >= index}
                >
                    <StepLabel
                        icon={activeStep >= index ? completedIcon : pendingIcon}
                    >
                        {activeStep >= index ? (
                            <div className="flex flex-col">
                                <span className="text-primary-green font-medium">
                                    {item.status}
                                </span>

                                
                                {item.dt && (
                                    <span className="text-primary-green font-medium">
                                        {item.dt}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <span className="text-gray-400 font-medium">
                                {item.status}
                            </span>
                        )}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default TrackStepper;