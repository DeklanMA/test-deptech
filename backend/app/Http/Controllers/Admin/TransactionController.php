<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    //

    public function index()
    {
        return Transaction::with('items.product')->get();
    }

    public function store(StoreTransactionRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $transaction = Transaction::create([
                'type' => $request->type,
                'date' => now(),
            ]);

            foreach ($request->products as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($request->type === 'stock_out' && $product->stock < $item['qty']) {
                    abort(422, "Stok produk {$product->name} tidak cukup!");
                }

                if ($request->type === 'stock_in') {
                    $product->increment('stock', $item['qty']);
                } else {
                    $product->decrement('stock', $item['qty']);
                }

                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item['product_id'],
                    'qty' => $item['qty'],
                ]);
            }

            return response()->json($transaction->load('items.product'), 201);
        });
    }
}
