<?php

namespace App\Models;

use App\Concerns\UniqueSluggifier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArticleType extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleTypeFactory> */
    use HasFactory, SoftDeletes, UniqueSluggifier;

    protected $fillable = ['sub_category_id', 'name', 'slug', 'description'];

    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function url(): string
    {
        return route('article-types.show', [
            $this->subCategory->masterCategory,
            $this->subCategory,
            $this
        ]);
    }
}
