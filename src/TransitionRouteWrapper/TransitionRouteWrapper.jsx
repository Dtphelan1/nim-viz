import React from 'react';
import './TransitionRouteWrapper.css';

export default function TransitionRouteWrapper(WrappedComponent) {
    function ExtendedComponent(props) { 
        return (
            <div className="route">
                <WrappedComponent location={props.location}>
                    {props.children}
                </WrappedComponent>
            </div>
        );
    }
    return ExtendedComponent;
}