\# AI Resume Screening Tool


## Live Demo
🔗 [View Live App](https://ai-resume-builder-indol-xi.vercel.app)

## Backend API
🔗 [Backend Server](https://ai-resume-builder-qp6i.onrender.com)


A full-stack MERN application that uses AI to compare a candidate's resume against a job description and generates a match score along with detailed feedback. Built to help job seekers understand how well their resume aligns with a specific role before applying.



\## Overview



Recruiters and applicants often struggle to quickly judge how well a resume fits a job description. This tool solves that problem by letting a user upload their resume (PDF) and paste a job description, after which an AI model analyzes both and returns a percentage match score with a written explanation of strengths and gaps. Users can sign in with Google, track their past analyses in a history page, and admins can view submissions from all users in a dedicated panel.



\## Features



\- \*\*Google Authentication\*\* — Secure sign-in using Firebase Authentication, no manual signup required

\- \*\*Resume Upload\*\* — Upload resumes in PDF format directly from the browser

\- \*\*AI-Powered Analysis\*\* — Resume text is extracted and compared against the job description using Cohere's Command language model, returning a 0–100 match score with reasoning

\- \*\*History Tracking\*\* — Every analysis is saved to the database and displayed on a personal history page

\- \*\*Admin Dashboard\*\* — A separate panel lets admins view every user's submitted resumes, scores, and feedback

\- \*\*Responsive UI\*\* — Clean, card-based interface built with React and Material UI components



\## Tech Stack



| Layer | Technology |

|---|---|

| Frontend | React (Vite), React Router, Material UI |

| Backend | Node.js, Express |

| Database | MongoDB (Mongoose) |

| Authentication | Firebase (Google Sign-In) |

| AI / NLP | Cohere AI — Chat API (Command model) |

| File Handling | Multer (uploads), pdf-parse (text extraction) |



\## How It Works



1\. User signs in with their Google account via Firebase.

2\. On the Dashboard, the user uploads a resume PDF and pastes the job description into a text box.

3\. On clicking \*\*Analyze\*\*, the file and job description are sent to the backend.

4\. The backend extracts text from the PDF using `pdf-parse`, builds a prompt, and sends it to Cohere's Chat API.

5\. Cohere's model returns a match score and a short explanation of how well the resume fits the role.

6\. The result is saved to MongoDB and displayed instantly on the screen.

7\. Past results are available anytime under the \*\*History\*\* tab, and admins can see all users' results under \*\*Admin\*\*.



\## Project Structure



public\_ai\_resume\_mern/

├── backend\_ai/              # Express backend

│   ├── Controllers/         # Route logic (user, resume)

│   ├── Models/              # Mongoose schemas (user, resume)

│   ├── Routes/               # API route definitions

│   ├── utils/                # Multer file upload config

│   ├── uploads/              # Temporary storage for uploaded PDFs

│   ├── conn.js                # MongoDB connection

│   └── index.js                # Server entry point

│

└── mern\_ai/                  # React frontend

└── src/

├── component/

│   ├── Login/         # Google sign-in page

│   ├── Dashboard/     # Resume upload + analysis

│   ├── History/       # Past analyses for the logged-in user

│   ├── Admin/          # All users' analyses (admin view)

│   └── SideBar/         # Navigation sidebar

├── utils/

│   ├── firebase.jsx     # Firebase config

│   ├── axios.js          # Axios instance with backend base URL

│   └── AuthContext.jsx     # Global auth state

└── App.jsx



\## Getting Started



\### Prerequisites

\- Node.js installed

\- A MongoDB connection (local or MongoDB Atlas)

\- A free Cohere API key from \[cohere.com](https://cohere.com)

\- A Firebase project for Google authentication



\### Backend Setup



```bash

cd backend\_ai

npm install

```



Create a `.env` file inside `backend\_ai`:

MONGODB\_URI=your\_mongodb\_connection\_string

PORT=4000

JWT\_SECRET=your\_secret\_key

COHERE\_API\_KEY=your\_cohere\_api\_key



Start the server:



```bash

node index.js

```



\### Frontend Setup



```bash

cd mern\_ai

npm install

npm run dev

```



The app will be available at `http://localhost:5173`.



\## API Endpoints



| Method | Endpoint | Description |

|---|---|---|

| POST | `/api/user` | Register or log in a user via Google profile data |

| POST | `/api/resume/addResume` | Upload a resume + job description for AI analysis |

| GET | `/api/resume/get/:user` | Get analysis history for a specific user |

| GET | `/api/resume/get` | Get all resume analyses (admin only) |



\## Future Improvements



\- Allow downloading the analysis report as a PDF

\- Support multiple resume formats (DOCX)

\- Add role-based access control for the admin panel

\- Deploy with a production-ready MongoDB Atlas cluster and cloud hosting



\## Author



Sakshi Tripathi

