"use client";

import { useEffect, useState } from "react";
import CaptainSensorPopover from "@/app/components/CaptainSensorPopover"


interface SensorData {
    ship_name: string;
    status: string;
    timestamp: string;
    sensor: string;
    action: string;
}

interface Notification {
    sensor_data: SensorData; // Updated type
    _id: object;
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
        <div style={{ maxHeight: '700px', overflowY: 'scroll', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {captainnotification.map((notification, index) => (
                    <li key={index} style={{ margin: '10px 0', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', width: '300px', textAlign: 'left' }}>
                        <strong>{notification.sensor_data.ship_name}</strong>: {notification.sensor_data.status} <br></br> 
                        <strong>Time</strong>: {notification.sensor_data.timestamp} <br></br> 
                        <strong>Sensor</strong>: {notification.sensor_data.sensor} <br></br> 
                        <span><CaptainSensorPopover alerts={notification}></CaptainSensorPopover> </span>
                    </li>
                ))}
            </ul>
        </div>
    );
  }