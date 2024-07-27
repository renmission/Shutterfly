import React from "react";
import PropTypes from 'prop-types';

export default class ErrorBoundery extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    state = {
        error: null
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
    }

    render() {
        const { children } = this.props;
        const { error } = this.state;

        if (error) {
            return <h1>{error.message}</h1>
        }

        return <div>{children}</div>
    }

}
