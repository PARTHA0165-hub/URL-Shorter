### How to Run the Project

###  Frontend
1. Open another terminal:
bash
cd frontend
npm install
npm run dev

Runs at: `http://localhost:5173`



##  API Endpoints

| Method | Endpoint                        | Description              |
|--------|----------------------------------|--------------------------|
| POST   | /shorturls                      | Create new short URL     |
| GET    | /shorturls/:code                | Redirect to original     |
| GET    | /shorturls/stats/:code          | View analytics           |



##  Technologies Used

- **Frontend**: React + MUI + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **API Test**: Postman



##  Features

- Create short links with optional custom code
- Auto-expiry (default: 30 mins)
- Redirect + click analytics
- Logger middleware



##  Author

PARTHASARATHY S  
[LinkedIn](https://www.linkedin.com/in/parthasarathy-s-597398264)

---

🗓️ Updated: June 27, 2025
