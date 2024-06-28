import express from 'express';
import bodyParser from 'body-parser';
import sql from './config/db.js'; 
import authRoutes from './routes/auth.js';
import tutorRoutes from './routes/tutors.js';
import studentRoutes from './routes/students.js';
import sessionRoutes from './routes/sessions.js';
import UserDB from "./routes/users.js"

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/user', UserDB);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
