# Shad

A mobile personal development application for Android and iOS that allow the user to motivate himself thanks to the proposed follow-up, as well as the impossibility of omitting a day.
## Functional Purpose
**🙋 The user...**
- can register and log in to our platform by entering their information.
- can set their own routines using templates or detailed checkboxes to be ticked each day (or completed in writing), modify them as they wish, and choose a deadline.
- can also set their own goals/rewards, as well as choose their deadline.
- has access to their own dashboard, reminding them of their goals/rewards and the time remaining before the routine expires.
- has access to their "Routine" page, where they will have to check off their list every day, as well as give their feelings about their day through emojis or text if they wish.
- can consult his profile which will give him some statistics, he will have access to all the days already passed. 
- can access a competitive league with other users.
## Tech Stack

**Client:** React-Native, Expo Go Managed CLI, TypeScript, Redux RTK + RTK Queries, Swagger UI

**Server:** Node, Express, TypeScript, MongoDB, DataGrip, Firebase Cloud Messaging

## Run Locally

Clone the project

```bash
  git clone git@github.com:fabgrd/shad-app.git
```

Go to the project directory

```bash
  cd shad/
```

Install and start the server

```bash
  cd server/
  docker-compose up --build
```

In another terminal, install de client dependencies

```bash
  cd client/
  npm install
```

Start the client

```bash
  npx expo start
```

Download ExpoGo on your appstore, scan the QR Code of the client terminal and enjoy !

## Demo

👀 *Coming soon*

