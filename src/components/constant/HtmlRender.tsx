import React from 'react';

const HtmlRenderer = ({ htmlContent }:{htmlContent: any}) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default HtmlRenderer;
