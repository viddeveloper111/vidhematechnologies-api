const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port - ${process.env.PORT}`)
  );
}).catch(err => console.log(err));
