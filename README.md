---

# 📖 README – Manual Setup Laravel (Backend) + Next.js (Frontend)

## 🔧 1. Prasyarat

Pastikan software berikut sudah terinstall di komputer kamu:

* [PHP 8.1+](https://www.php.net/downloads) (disarankan 8.2)
* [Composer](https://getcomposer.org/download/)
* [MySQL 8](https://dev.mysql.com/downloads/mysql/)
* [Node.js 18+](https://nodejs.org/en/download/)
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Git](https://git-scm.com/downloads)

---

## 🗄 2. Setup Database MySQL

1. start MySQL:
    ```sh
    # Jika di Windows, bisa pakai XAMPP atau Laragon
    # Jika di Linux, bisa pakai:
    sudo service mysql start
    ```
2. Login ke MySQL:
    ```sh
    mysql -u root -p
    ```
3. Buat database baru:
    ```sql
    CREATE DATABASE test_deptech;
    ```

---

## ⚙️ 3. Setup Backend (Laravel)

Masuk ke folder backend:

```sh
cd backend
```

### 3.1 Install dependency Laravel

```sh
composer install
```

### 3.2 Copy konfigurasi environment

```sh
cp .env.example .env
```

### 3.3 Konfigurasi file `.env`

Edit `.env` sesuai database MySQL yang sudah dibuat:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=test_deptech
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://localhost:3000
```

### 3.4 Generate APP_KEY

```sh
php artisan key:generate
```

### 3.5 Migrasi + seeding database

```sh
php artisan migrate:fresh --seed
```

Seeder otomatis akan membuat akun admin default.

📌 **Akun login default:**

```
Email    : admin@example.com
Password : password
```

### 3.6 Jalankan server backend

```sh
php artisan serve --host=127.0.0.1 --port=8000
```

Backend Laravel akan jalan di:
👉 [http://localhost:8000](http://localhost:8000)

---

## ⚛️ 4. Setup Frontend (Next.js)

Masuk ke folder frontend:

```sh
cd frontend-next
```

### 4.1 Install dependency

```sh
npm install
```

### 4.2 Copy environment

```sh
cp .env.example .env.local
```

Isi `.env.local` seperti ini:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 4.3 Jalankan frontend

```sh
npm run dev
```

Frontend akan jalan di:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 5. Login ke Aplikasi

1. Buka browser → [http://localhost:3000](http://localhost:3000)
2. Klik menu **Login**
3. Masukkan akun default:

   ```
   Email    : admin@example.com
   Password : password
   ```
4. Jika berhasil, user diarahkan ke **Dashboard**.

---

## 🛠 6. Troubleshooting

* **CORS Error**
  Pastikan `config/cors.php` di Laravel sudah seperti ini:

  ```php
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
  'supports_credentials' => true,
  ```

* **Database error**
  Cek apakah service MySQL jalan:

  ```sh
  mysql -u laravel -p
  ```

  Pastikan bisa login dan database `test_deptech` ada.

* **Frontend tidak bisa konek ke backend**
  Periksa apakah `.env.local` sudah sesuai:

  ```env
  NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
  ```

