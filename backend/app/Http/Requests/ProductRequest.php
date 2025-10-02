<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'stock'       => 'required|integer|min:0',
        ];

        if ($this->isMethod('POST')) {
            $rules['image'] = 'required|image|mimes:jpg,jpeg,png,gif|max:2048';
        } else {
            $rules['image'] = 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048';
        }
    }
}
