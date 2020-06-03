import React from 'react';

import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundry.styles';

class ErrorBoundry extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        };
    }

    static getDerivedStateFromError(error) {
        //process the error
        return { hasErrored: true };
    } 

    componentDidCatch(error, info) {
        // send this error as notification or log it somewhere etc
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            // or any other UI/component to send with error
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png'/>
                    <ErrorImageText>Sorry this page is broken!</ErrorImageText>
                </ErrorImageOverlay>
            )
        } 
        return this.props.children;
    }
}

export default ErrorBoundry;