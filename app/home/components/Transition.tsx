'use client'
import { useState, useEffect, Fragment, ReactNode } from 'react';

interface TransitionProps {
    show: boolean;
    duration?: number;
    children: ReactNode;
}

const Transition = ({ show, duration = 400, children }: TransitionProps) => {
    const [isMounted, setIsMounted] = useState(show);

    useEffect(() => {
        if (show) {
            setIsMounted(true);
        } else {
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration]);

    return (
        <div
            className={`transition-all duration-${duration} ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            {isMounted && <Fragment>{children}</Fragment>}
        </div>
    );
};

export default Transition;
