import React, {useEffect, useState} from "react";

const Countdown = () => {
    const formatWithLeadingZero = (value: any) => (value < 10 ? `0${value}` : value);
    const [timeLeft, setTimeLeft] = useState({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: "0.00"
    });
    useEffect(() => {
        const targetDate = new Date('January 19, 2024 17:00:00 EST');
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44)); // Average month length
            const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = (Math.floor((distance % (1000 * 60)) / 1000) + (distance % 1000) / 1000).toFixed(0);

            setTimeLeft({ months, days, hours, minutes, seconds });
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({
                    months: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: "0.00"
                });
            }
        }, 1);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex items-center space-x-2 text-lg font-medium w-72">
                <div><span className="text-2xl pr-2">{timeLeft.months}</span><span>M</span></div>
                <div><span className="text-2xl pr-2">{formatWithLeadingZero(timeLeft.days)}</span><span>D</span></div>
                <div><span className="text-2xl pr-2">{formatWithLeadingZero(timeLeft.hours)}</span><span>H</span></div>
                <div><span className="text-2xl pr-2">{formatWithLeadingZero(timeLeft.minutes)}</span><span>MIN</span></div>
                <div className="flex items-baseline">
                    <span className="text-2xl w-10 text-left">{formatWithLeadingZero(timeLeft.seconds)}</span>
                    <span>S</span>
                </div>
            </div>
            <div className="flex items-center space-x-4 text-md font-medium justify-center pr-6">
                <span className="whitespace-nowrap">until the game jam</span>
            </div>
        </>
    )
}

export default Countdown;
