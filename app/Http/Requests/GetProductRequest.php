<?php

namespace App\Http\Requests;

use App\Enums\Gender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetProductRequest extends FormRequest
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
            'gender' => ['nullable', Rule::enum(Gender::class)],
            'colors' => ['nullable', 'array'],
            'colors.*' => ['string', 'exists:base_colours,id'],
            'master_category' => ['nullable', 'string', 'exists:master_categories,id'],
        ];
    }
}
