
# 📺 YouTube Clone MERN Project

A fully functional YouTube Clone built with the **MERN stack (MongoDB, Express, React, Node.js)**. This application replicates key YouTube features such as **video viewing, channel creation, subscriptions, comments, likes**, and more—providing a seamless user experience across desktop and mobile devices.

---

## 🚀 Live Features Overview

### 🔐 Authentication (JWT)
- **Login & SignUp** pages.
- JWT tokens are issued upon login/signup and stored in `localStorage`.
- Authenticated routes are protected using middleware in both frontend and backend.
- Persistent login across page refreshes.

### 👤 User Profile
- Users can view their profile name in the header.
- Dropdown menu on profile name gives access to:
  - My Channel
  - Subscriptions
  - Settings
  - Help
  - Logout

---

## 📺 Channels

### ➕ Create Channel
- Authenticated users can create a channel by providing:
  - Channel name
  - Uploading a profile picture
- Profile picture is uploaded to the server and displayed dynamically.

### 🖼 Channel UI
- Includes:
  - Banner section
  - Circular profile image
  - Channel name & handle
  - Subscriber count
- Channel page includes tabs like **Videos** (extendable to About, Playlists, etc.).
- Only channel owners see the **Add Video** and **Edit Video** buttons.

### 🛠 Channel Management
- **Add Video:** Opens a modal to select videos from the global video list.
- **Edit Channel:** Allows deletion of videos from the channel.

---

## 🎥 Videos

### 🔍 Home Page
- Displays all uploaded videos using a responsive video grid layout.
- Flexbox + media queries ensure YouTube-like layout.
- Lazy loads thumbnail previews with hover effects.

### 📹 Watch Page
- Clicking a video routes to `/watch/:id`.
- Loads video title, description, uploader, and video player.
- **Description Toggle:** Show more/less behavior (like YouTube).
- Auto fetches video data from backend via Axios.

### 🧠 Video Details
- Each video contains:
  - Title
  - Uploader's name
  - View count
  - Upload time
  - Description

---

## 💬 Comments

### 📝 Post & View Comments
- Authenticated users can post comments.
- Comments displayed under the video.
- Each comment includes:
  - Commenter's name
  - Timestamp
  - Text content

### ✏️ Edit & Delete
- Users can edit or delete their own comments.
- Changes reflected both in UI and backend.

---

## 📂 Sidebar (Responsive Overlay)

- Hamburger menu toggles a left sidebar.
- Sidebar slides **over** the page content instead of pushing it.
- Includes navigation links and categories.
- A translucent backdrop darkens the main content when sidebar is open.

---

## 🌐 Backend Structure (Express + MongoDB)

```bash
/backend
  /controllers
    - authController.js
    - videoController.js
    - commentController.js
    - channelController.js
  /routes
    - authRoute.js
    - videoRoutes.js
    - commentRoute.js
    - channelRoutes.js
  /models
    - User.js
    - Video.js
    - Comment.js
    - Channel.js
  /middleware
    - authMiddleware.js
  server.js
```

### 📡 APIs (REST)

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and get JWT
- `POST /channels` – Create a new channel
- `GET /channels/:id` – Get channel details
- `POST /videos` – Upload a new video
- `GET /videos` – Get all videos
- `GET /videos/:id` – Get single video by ID
- `PUT /channels/:channelId/videos/:videoId` – Add video to channel
- `DELETE /channels/:channelId/videos/:videoId` – Delete video from channel
- `POST /comments/:videoId` – Add comment to video
- `GET /comments/:videoId` – Get all comments on a video
- `PUT /comments/:id` – Edit comment
- `DELETE /comments/:id` – Delete comment

---

## 🧠 State Management (Redux Toolkit)

- Global Redux store for:
  - Authentication
  - Comments
- Async Thunks for API calls.
- Middleware handles state updates for login, logout, posting, and fetching data.

---

## 🛠 Technologies Used

| Tech              | Role                        |
|-------------------|-----------------------------|
| React             | Frontend UI                 |
| Redux Toolkit     | State Management            |
| React Router      | Page Navigation             |
| Axios             | HTTP Requests               |
| Express.js        | Backend REST API            |
| MongoDB + Mongoose| NoSQL Database              |
| JWT               | Authentication              |
| CSS3              | Custom Styling              |

---

## 📁 Folder Structure (Frontend)

```bash
/frontend
  /components
    - Header.jsx
    - Sidebar.jsx
    - VideoCard.jsx
    - UserMenu.jsx
  /pages
    - Home.jsx
    - LoginPage.jsx
    - SignInPage.jsx
    - VideoPlayer.jsx
    - ChannelPage.jsx
    - CreateChannel.jsx
  /redux
    - store.js
    - authSlice.js
    - commentSlice.js
  /assets
    - logo.svg
    - icons
  App.jsx
  main.jsx
  index.css
```

---

## 🧪 Future Enhancements

- Video uploads with actual file storage (e.g., Cloudinary or Firebase)
- Video likes/dislikes
- Subscriptions & notification logic
- Dark Mode toggle
- Real-time comment updates with sockets

---

## ✅ Getting Started Locally

### 📦 Prerequisites
- Node.js and npm
- MongoDB running locally or via MongoDB Atlas

### ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone

# Install server dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start backend
cd ../backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Contributions

Pull requests and feedback are welcome! For major changes, please open an issue first to discuss.

---

## 🧑‍💻 Developed by

**Your Name** – [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername)

---
