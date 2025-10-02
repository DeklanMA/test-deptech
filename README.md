---

# 📖 README – Manual Setup Laravel + Next.js

## 🔧 1. Prasyarat

Pastikan sudah install di komputer:

* [PHP 8.2+](https://www.php.net/downloads)
* [Composer](https://getcomposer.org/download/)
* [Node.js 18+](https://nodejs.org/en/download/)
* [MySQL 8](https://dev.mysql.com/downloads/mysql/)
* [Git](https://git-scm.com/downloads)

---

## ⚙️ 2. Setup Backend (Laravel)

Masuk ke folder backend:

```sh
cd backend
```

### 2.1 Install dependency

```sh
composer install
```

### 2.2 Copy konfigurasi environment

```sh
cp .env.example .env
```

### 2.3 Konfigurasi `.env`

Ubah bagian database sesuai lokal MySQL:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

Tambahkan juga frontend URL (supaya CORS & Sanctum jalan):

```env
FRONTEND_URL=http://localhost:3000
```

### 2.4 Generate APP_KEY

```sh
php artisan key:generate
```

### 2.5 Migrasi database + seeding

```sh
php artisan migrate --seed
```

Seeder akan otomatis membuat akun default.

📌 **Akun default login:**

```
Email   : admin@example.com
Password: password
```

### 2.6 Jalankan backend

```sh
php artisan serve --host=127.0.0.1 --port=8000
```

Backend Laravel sekarang jalan di:
👉 [http://localhost:8000](http://localhost:8000)

---

## ⚛️ 3. Setup Frontend (Next.js)

Masuk ke folder frontend:

```sh
cd frontend-next
```

### 3.1 Install dependency

```sh
npm install
```

### 3.2 Copy environment

```sh
cp .env.example .env.local
```

Isi file `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 3.3 Jalankan frontend

```sh
npm run dev
```

Frontend akan jalan di:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 4. Login

Setelah kedua service jalan:

1. Buka frontend [http://localhost:3000](http://localhost:3000)
2. Klik **Login**
3. Masukkan akun default:

   ```
   Email   : admin@example.com
   Password: password
   ```
4. Jika berhasil, user akan diarahkan ke dashboard.

---

## 🛠 5. Troubleshooting

* Kalau CORS error → pastikan di `config/cors.php` Laravel sudah:

  ```php
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
  'supports_credentials' => true,
  ```
* Kalau database error → pastikan service MySQL jalan & kredensial di `.env` sesuai.
* Jika frontend tidak konek → cek apakah `NEXT_PUBLIC_BACKEND_URL` sesuai dengan URL backend (`http://localhost:8000`).

---

