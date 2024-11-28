"use client";

import { useEffect, useState } from "react";

interface Alert{
    ship_name : string;
    status : string;
    system : string;
    timestamp : string;
    unit: number;
    value: number; 
}

interface Notification{
    alerts: Alert;
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
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
                
                {captainnotification.map((notification, index) => (
                    <li key={index}>
                        <strong>{notification.alerts.ship_name}</strong>: {notification.alerts.status} at {notification.alerts.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
  }