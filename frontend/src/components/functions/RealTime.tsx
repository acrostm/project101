import React, { useState, useEffect } from 'react';

function RealTimeClock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showColon, setShowColon] = useState(true);

    useEffect(() => {
        // 设置定时器，每隔一秒更新时间并切换冒号的可见性
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
            setShowColon((prevShowColon) => !prevShowColon);
        }, 1000);

        // 组件卸载时清除定时器
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // 如果分钟小于10，添加前导零
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // 根据 showColon 的状态决定是否显示冒号
    const colon = showColon ? ':' : ' ';

    return (
        <div>
            <h1>{hours}{colon}{formattedMinutes}</h1>
        </div>
    );
}

export default RealTimeClock;
