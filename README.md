# GigFlow – Gig Bidding Platform

**GigFlow** is a web application where clients can post gigs, freelancers can place bids, and clients can accept or reject bids. It’s built using **React.js**, **Node.js**, **Express**, and **MongoDB** with **Tailwind CSS** for styling.

---

## Features

* User registration and login (JWT authentication)
* Post new gigs with title, description, budget, and deadline
* Browse and search available gigs
* Place bids on gigs as a freelancer
* Accept or reject bids as a client
* Dashboard showing posted gigs, bids, and statuses
* Responsive design for desktop and mobile

---

## Technologies Used

* **Frontend:** React.js, Tailwind CSS, React Router, Axios
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Notifications:** React Toast
* **Icons:** Lucide React

---

## Project Structure

```
frontend/
  src/
    components/      # Reusable components (GigCard, BidCard, Navbar)
    pages/           # Pages (Dashboard, PostGig, MyGigs, BidPage)
    context/         # Global state management
backend/
  models/            # MongoDB schemas (User, Gig, Bid)
  routes/            # Express routes
  controllers/       # Route logic
  middleware/        # Auth & error handling
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rajpal-singh-code/GigFlow.git
```

2. Install dependencies:

```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Set environment variables in `.env` (backend):

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

4. Run the project:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

5. Open in browser: `http://localhost:3000`

---

## Usage

1. Register or login as a user
2. Clients can post gigs
3. Freelancers can browse gigs and place bids
4. Clients can accept/reject bids
5. Check dashboard for stats and recent activity

---

## Future Improvements

* Real-time chat between clients and freelancers
* Ratings and reviews for completed gigs
* Analytics for gig trends and top freelancers

---

## Author

**Rajpal Kumar**