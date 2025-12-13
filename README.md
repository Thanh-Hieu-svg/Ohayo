# 🚀 HƯỚNG DẪN CHẠY DỰ ÁN FRONTEND & BACKEND

Tài liệu này hướng dẫn **từng bước** cách chạy **Frontend (React + Vite)** và **Backend (Node.js)** cho dự án.

---

## 📦 YÊU CẦU MÔI TRƯỜNG

Trước khi bắt đầu, đảm bảo máy bạn đã cài:

- **Node.js** >= 18.x
  Kiểm tra:

  ```bash
  node -v
  npm -v
  ```

- **Git**

  ```bash
  git --version
  ```

---

## 📁 CẤU TRÚC THƯ MỤC (THAM KHẢO)

```bash
Ohayo/
├── frontend/        # React + Vite
└── backend/         # Node.js + Express
```

---

# 🖥️ PHẦN 1: CHẠY FRONTEND (REACT + VITE)

## BƯỚC 1: DI CHUYỂN VÀO THƯ MỤC FRONTEND

```bash
cd frontend
```

---

## BƯỚC 2: CÀI ĐẶT THƯ VIỆN

```bash
npm install
```

⏳ Chờ npm cài xong `node_modules`

---

## BƯỚC 3: CẤU HÌNH BIẾN MÔI TRƯỜNG (NẾU CÓ)

Tạo file **.env** trong thư mục `frontend`:

```env
VITE_API_URL=http://localhost:5000
```

---

## BƯỚC 4: CHẠY FRONTEND

```bash
npm run dev
```

✅ Thành công khi thấy:

```
Local: http://localhost:5173/
```

👉 Mở trình duyệt truy cập: **[http://localhost:5173](http://localhost:5173)**

---

# ⚙️ PHẦN 2: CHẠY BACKEND (NODE.JS)

## BƯỚC 1: MỞ TERMINAL MỚI & VÀO THƯ MỤC BACKEND

```bash
cd backend
```

---

## BƯỚC 2: CÀI ĐẶT THƯ VIỆN BACKEND

```bash
npm install
```

---

## BƯỚC 3: CẤU HÌNH BIẾN MÔI TRƯỜNG

Tạo file **.env** trong thư mục `backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ohayo
JWT_SECRET=your_secret_key
```

⚠️ Thay giá trị cho phù hợp với máy bạn.

---

## BƯỚC 4: CHẠY BACKEND

### 🔹 Chạy thường

```bash
npm start
```

### 🔹 Chạy với nodemon (dev)

```bash
npm run dev
```

✅ Thành công khi thấy:

```
Server running at http://localhost:5000
```

---

## 🔍 KIỂM TRA BACKEND

- API gốc:

  ```
  http://localhost:5000
  ```

- Swagger (nếu có):

  ```
  http://localhost:5000/api-docs
  ```

---

# 🔗 KẾT NỐI FRONTEND & BACKEND

Frontend gọi API thông qua biến môi trường:

```js
import.meta.env.VITE_API_URL;
```

Ví dụ:

```js
axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
```

---

## ❗ CÁC LỖI THƯỜNG GẶP

### 1️⃣ Frontend không gọi được API

- Backend chưa chạy
- Sai `VITE_API_URL`
- Sai cổng PORT

---

### 2️⃣ Backend không kết nối được database

- MongoDB chưa chạy
- Sai `MONGODB_URI`

---

### 3️⃣ Lỗi CORS

Kiểm tra backend đã bật CORS:

```js
const cors = require("cors");
app.use(cors());
```

---

## ✅ GHI CHÚ

- Luôn chạy **Backend trước**, sau đó chạy **Frontend**
- Mỗi phần chạy ở **terminal riêng**
- Không push thư mục `node_modules`

---

🎉 **Hoàn tất! Chúc bạn chạy dự án thành công 🚀**
