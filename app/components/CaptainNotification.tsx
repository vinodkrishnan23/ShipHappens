"use client";

import { useEffect, useState } from "react";


interface Notification{
    sensor_data: object;
    _id: Object;
}


export default function CaptainNotification({ user_email }: { user_email: string }) {
    const [captainnotification, setCaptainNotification] = useState<Notification[]>([]);
  
    useEffect(() => {
        async function fetchCaptainNotifications() {
          const res = await fetch("/api/captain-notifications", { headers: { user_email: user_email } });
          const data = await res.json();
          
          setCaptainNotification(data.alerts);
        }
        fetchCaptainNotifications();
      }, [user_email]);
  
      return (
        <div style={{ maxHeight: '400px', overflowY: 'scroll', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {captainnotification.map((notification, index) => (
                    <li key={index} style={{ margin: '10px 0', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', width: '300px', textAlign: 'right' }}>
                        <strong>{notification.sensor_data.ship_name}</strong>: {notification.sensor_data.status} at {notification.sensor_data.timestamp} (Sensor: {notification.sensor_data.sensor})
                    </li>
                ))}
            </ul>
        </div>
    );
  }