require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Tạo thư mục uploads nếu chưa tồn tại
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(uploadPath));


// router
const authRoutes = require("./src/routes/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const blogRoutes = require("./src/routes/blog");
const userRoutes = require("./src/routes/user");
const orderRoutes = require("./src/routes/order");
const vnpayRoutes = require("./src/routes/vnpay");
const contactRoutes = require("./src/routes/contact");
const dashboardRoutes = require("./src/routes/dashboard");
const chatbotRoutes = require("./src/routes/chatbot");
const swaggerDocs = require("./src/swagger/swagger");
swaggerDocs(app);

app.use('/api/auth', authRoutes);        
app.use('/api/categories', categoryRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vnpay', vnpayRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chatbot', chatbotRoutes);

const MongoDB = process.env.MONGODB_URI;
console.log('MongoDB URI:', MongoDB); 
mongoose.connect(MongoDB)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server đang chạy: http://localhost:${PORT}`);
      console.log(`📄 Swagger API Docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
