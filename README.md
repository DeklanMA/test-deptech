---

# 🚀 Laravel + Next.js + Docker

Proyek ini adalah **Fullstack Aplikasi** berbasis **Laravel (Backend API)** dan **Next.js (Frontend)** dengan integrasi **Docker Compose** untuk mempermudah setup development.

---

## 📂 Struktur Folder

```
project-root/
│── backend/            # Laravel backend (API)
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── Dockerfile
│   └── ...
│
│── frontend/           # Next.js frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── ...
│
│── nginx/              # Konfigurasi Nginx reverse proxy
│   └── default.conf
│
│── docker-compose.yml
│── README.md
```

---

## ⚡ Setup & Instalasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/DeklanMA/test-deptech.git
cd test-deptech
```

### 2️⃣ Build & Run Docker

```bash
docker compose up -d --build
```

### 3️⃣ Migrasi & Seeder (otomatis di Dockerfile)

Saat pertama kali build, Laravel akan otomatis menjalankan:

```bash
php artisan migrate --seed
```

Jadi database sudah langsung siap digunakan dengan user default.

### 4️⃣ Akses Aplikasi

* **Frontend (Next.js)** → [http://localhost](http://localhost)
* **Backend API (Laravel)** → [http://localhost:8000](http://localhost:8000)
* **PhpMyAdmin (opsional jika ditambahkan)** → [http://localhost:8080](http://localhost:8080)

---

## 🔑 Login Info (Seeder User)

Seeder `UserSeeder.php` sudah menambahkan beberapa user default:

| Nama          | Email                 | Password      |
| ------------- | --------------------- | ------------- |
| Admin User    | `admin@example.com`   | `password`    |
| Jane Doe      | `jane@example.com`    | `password123` |
| Michael Smith | `michael@example.com` | `secret123`   |

👉 Gunakan salah satu credential di atas untuk login ke aplikasi.

---

## 🛠️ Perintah Berguna

### Reset Database (drop + migrate + seed ulang)

```bash
docker compose exec backend php artisan migrate:fresh --seed
```

### Jalankan Artisan Command

```bash
docker compose exec backend php artisan route:list
```

### Masuk ke Tinker

```bash
docker compose exec backend php artisan tinker
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📌 Catatan

* Laravel berjalan di `php-fpm` + Nginx, dengan database MySQL.
* Next.js berjalan di container terpisah (`frontend`).
* Semua sudah terhubung via `docker-compose`.
* Pastikan **port 8000 dan 3000 tidak digunakan aplikasi lain**.

---
