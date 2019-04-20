import React from 'react';
import Responsive from 'react-responsive';

export default {
    Desktop: props => <Responsive {...props} minWidth={992} />,
    Tablet: props => <Responsive {...props} minWidth={768} maxWidth={991} />,
    Mobile: props => <Responsive {...props} maxWidth={767} />,
    Default: props => <Responsive {...props} minWidth={768} />
}