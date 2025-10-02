<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'first_name' => 'Admin',
            'last_name'  => 'User',
            'email'      => 'admin@example.com',
            'birth_date' => '1990-01-01',
            'gender'     => 'male',
            'password'   => Hash::make('password'), // default password
        ]);

        User::create([
            'first_name' => 'Jane',
            'last_name'  => 'Doe',
            'email'      => 'jane@example.com',
            'birth_date' => '1992-05-15',
            'gender'     => 'female',
            'password'   => Hash::make('password123'),
        ]);

        User::create([
            'first_name' => 'Michael',
            'last_name'  => 'Smith',
            'email'      => 'michael@example.com',
            'birth_date' => '1988-07-20',
            'gender'     => 'male',
            'password'   => Hash::make('secret123'),
        ]);
    }
}
