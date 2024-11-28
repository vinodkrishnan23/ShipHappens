
# Details

**Project** : _ShipHappens - IoT-Powered Maritime Platform_  
**Team Number** : 8  
**Team Name** : _India SA 3 (May ShipHappens with You)_  
**Demonstration Video** : _[ShipHappens](https://ship-happens-sa-ind-blr.sa-demo.staging.corp.mongodb.com)_ 

# Overview

ShipHappens is an intelligent maritime operations platform leveraging IoT sensors, real-time data processing, and AI-driven insights to ensure efficient ship management, container bookings, and operational risk mitigation.

# Justification

The app, _ShipHappens_, addresses several key challenges in the maritime and shipping industry by leveraging IoT, real-time data processing, and AI. Here’s an overview of the challenges it solves:

## Challenges

- **Operational Safety Risks** - Ship captains and operators often lack real-time visibility into critical systems, making it difficult to address safety risks proactively. Delayed responses to anomalies can lead to accidents or equipment failures.
- **Inefficient Risk Management** - Traditional approaches to risk mitigation rely on static rules or manual assessments, which are slow and less effective in dynamic conditions.
- **Limited Data-Driven Decision Making** - Operators and managers lack the ability to leverage historical and real-time data for insights into operational trends or performance optimization.
- **Complex Container Booking Processes** - Traditional container booking systems are cumbersome, lacking real-time inventory visibility, and often lead to overbookings or inefficiencies.

## How did we solve it (with MongoDB, Duh!)
- Real-time IoT sensor monitoring detects anomalies in ship systems (e.g., temperature, pressure, vibrations).
- Alerts and AI-driven recommendations allow captains to take immediate action, mitigating potential risks. Notifications improve awareness and enable proactive decision-making.
- Continuous data streaming and processing identify violations as they occur.
- AI-powered recommendations provide actionable insights tailored to the situation.
- Faster risk identification and mitigation reduce operational downtimes and enhance safety.
- The platform consolidates and persists data in a TimeSeries database and MongoDB collections.
- A streamlined container booking system(ACID Transactions, bruh!) with Full-Text Search (FTS) on ship inventories ensures real-time availability updates.

## MongoDB Competitive Differentiators
MongoDB Document Model \
Developer Productivity  
Unified Development Approach \
Seamless Scalability \
Best in Class Security \
OOTB Analytics and Dashboards \
Rich Querying and Indexing _(Whoa Whoa! with FTS and Vector Search)_


# Detailed Application Overview

## High Level Architecture
![HighLevelArch](https://github.com/vinodkrishnan23/shiphappens/blob/main/screenshot/ShipHappensArch.png)

## MongoDB Components
- Atlas Search
- Atlas Vector Search (RAG)
- Time-Series Collections
- Azure OpenAI (gpt-4o+text-embedding-3-large)
- Atlas Stream Processing
- ACID Transactions
- Atlas Analytics Nodes
- Atlas Charts
- Atlas Triggers
- Security SSO

## Application Functionality

The Captain plays a pivotal role in a ship's journey.
Data from Ship's IoT sensors would be processed via Atlas Stream Processing and ingested in MongoDB **Time Series collections**. 
This sensor data would be visible on the Captain's portal for **real-time** maritime functionality. 

Also, the data processed from **Atlas Streams** would help in identifying anomalies, if any.
If an anomaly or violation is detected in one of the sensorts, the app would trigger an event notification using **Atlas Triggers**.
The notifications are sent out to Azure OpenAI to further build a polished RAG pipeline and are finally sent to the Captain.

Apart from Captain, Customers have a distinct role on _ShipHappens_.
Customers will authenticate on the app via **SSO(Single Sign On)**, look through the ship inventory data using **Atlas Search** & book a container for shipping using **ACID Transactions**. Once the booking is successful, the data would be persisted in a MongoDB Collection.
Furthermore, a user can **search** on the historical bookings and track a ship throughout its journey.

# Roles and Responsibilities

## Team Members 

**Vinod Krishnan:** App Design, Kanopy deployment, RAG Pipelines \
**Nitish Joshi & Nishit Rao:** UI Development & Full Text Search \
**Debjyoti Biswas:** UI Development, Backend Development \
**Sandhya Dev:**  Data Generation, Analytics & ReadMe \
**Sai Teja Boddapati:** Streaming, Analytics & Vector Search \
**Aravind AR:** Streaming & Time-Series Backend \
**Vinay Agarwal:** Data Gen & Vector Search


# Demonstration Script

* Setup:
  _[ShipHappens](https://ship-happens-sa-ind-blr.sa-demo.staging.corp.mongodb.com)_
  This app is deployed on Kanopy & can be used from the link above directly

## App Screenshots
![ShipHappensSSO](https://github.com/vinodkrishnan23/shiphappens/blob/main/screenshot/ShipHappensLandingSSO.png)
![BookAShipContainer](https://github.com/vinodkrishnan23/shiphappens/blob/main/screenshot/BookAShipContainer.png)
![HistoricalShipTracking](https://github.com/vinodkrishnan23/shiphappens/blob/main/screenshot/HistoricalShipTracking.png)


## For local Deployments

- GIT Clone "ShipHappens"
- ```npm install```
- ```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
