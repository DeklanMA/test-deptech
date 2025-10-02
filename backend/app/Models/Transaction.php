<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = ['type', 'date'];

    protected $appends = ['total_products']; 

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }

    // accessor total_products
    public function getTotalProductsAttribute()
    {
        return $this->items()->sum('qty');
    }
}
