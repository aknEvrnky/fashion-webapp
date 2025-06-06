<?php

namespace App\Http\Requests\Feedback;

use App\Services\Feedback\FeedbackType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFeedbackRequest extends FormRequest
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
            'type' => ['required', 'string', Rule::enum(FeedbackType::class)],
            'product_id' => ['required', 'exists:products,id'],
            'comment' => ['nullable', 'string', 'max:255'],
        ];
    }
}
