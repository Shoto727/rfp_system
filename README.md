# RFP System

A full-stack web application for managing Request for Proposals (RFPs), vendors, and proposals. This system enables organizations to create RFPs, send them to vendors, collect proposals, and compare vendor responses.

## Features

- **RFP Management**: Create, view, and manage Requests for Proposals
- **Vendor Management**: Add vendors and manage vendor information
- **Email Integration**: Send RFPs directly to vendors via email using Nodemailer
- **Proposal Collection**: Vendors can submit proposals in response to RFPs
- **Proposal Comparison**: Compare proposals from different vendors side-by-side
- **AI-Powered Insights**: Integration with OpenAI for analysis
- **Responsive UI**: Modern React-based frontend with Vite build tooling

## Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **Nodemailer** for email services
- **OpenAI API** for intelligent features
- **CORS** enabled for frontend communication

### Frontend
- **React 19** with functional components
- **Vite** for fast development and optimized builds
- **Axios** for HTTP requests
- **CSS** for styling

## Project Structure

```
RFPSystem/
├── backend/                    # Node.js Express backend
│   ├── controllers/           # Request handlers
│   │   ├── proposalController.js
│   │   ├── rfpController.js
│   │   ├── sendRfpController.js
│   │   └── vendorController.js
│   ├── models/                # MongoDB schemas
│   │   ├── Proposal.js
│   │   ├── RFP.js
│   │   └── Vendor.js
│   ├── routes/                # API route definitions
│   │   ├── proposalRoutes.js
│   │   ├── rfpRoutes.js
│   │   ├── sendRfpRoutes.js
│   │   └── vendorRoutes.js
│   ├── services/              # Business logic & external integrations
│   │   ├── emailService.js    # Nodemailer configuration
│   │   └── openaiService.js   # OpenAI API integration
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ProposalComparison.jsx
│   │   │   ├── RfpForm.jsx
│   │   │   ├── SendRfp.jsx
│   │   │   ├── VendorEmailInbox.jsx
│   │   │   └── VendorForm.jsx
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── public/                # Static assets
│
└── README.md                  # This file
```

## API Endpoints

### RFPs
- `GET /api/rfp` - Retrieve all RFPs
- `POST /api/rfp` - Create a new RFP
- `GET /api/rfp/:id` - Get specific RFP
- `PUT /api/rfp/:id` - Update RFP
- `DELETE /api/rfp/:id` - Delete RFP

### Vendors
- `GET /api/vendors` - Retrieve all vendors
- `POST /api/vendors` - Create a new vendor
- `GET /api/vendors/:id` - Get specific vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Send RFP
- `POST /api/rfp/send` - Send RFP to vendors via email

### Proposals
- `GET /api/proposals` - Retrieve all proposals
- `POST /api/proposals` - Create a new proposal
- `GET /api/proposals/:id` - Get specific proposal
- `PUT /api/proposals/:id` - Update proposal
- `DELETE /api/proposals/:id` - Delete proposal

## Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Environment variables** (see .env setup below)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rfp_system
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_generative_ai_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3000` (or configured port)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Environment Variables

### Backend (.env)
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rfp_system

# AI Services
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server Port (optional)
PORT=3000
```

## Key Components

### RfpForm
- Component for creating and managing RFPs
- Form submission to backend API

### VendorForm
- Add and manage vendor information
- Store vendor email addresses and details

### SendRfp
- Send RFPs to selected vendors via email
- Uses Nodemailer for email delivery

### ProposalComparison
- Compare proposals from multiple vendors
- Side-by-side view of vendor responses

### VendorEmailInbox
- Paste and process vendor emails manually
- OpenAI analysis on vendor email content

## Email Configuration

The system uses **Nodemailer** for sending RFPs to vendors. For Gmail:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in the `.env` file's `EMAIL_PASSWORD`

## Scripts

### Backend
- `npm start` - Start the Express server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Models

### RFP
```javascript
{
  title: String,
  description: String,
  deadline: Date,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Vendor
```javascript
{
  name: String,
  email: String,
  contact: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Proposal
```javascript
{
  rfpId: ObjectId,
  vendorId: ObjectId,
  content: String,
  price: Number,
  submittedAt: Date,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend's `app.js` has the correct frontend origin:
```javascript
origin: "http://localhost:5173"
```

### MongoDB Connection
- Ensure MongoDB is running locally or your connection string is correct in `.env`
- Verify the database name matches your setup

### Email Not Sending
- Check that 2FA is enabled on your Gmail account
- Verify you're using an App Password, not your regular password
- Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are correctly set in `.env`

### Port Already in Use
- Backend default: 3000 (change in `server.js` if needed)
- Frontend default: 5173 (Vite will auto-increment if in use)

## Future Enhancements

- User authentication and authorization
- Advanced proposal analysis with AI
- Real-time notifications
- Proposal templates
- Document upload support
- Reporting and analytics dashboard
- Mobile app support

## License

ISC

## Support

For issues or questions, please contact the development team or open an issue in the repository.
