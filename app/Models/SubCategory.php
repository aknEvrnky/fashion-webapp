<?php

namespace App\Models;

use App\Concerns\UniqueSluggifier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubCategory extends Model
{
    /** @use HasFactory<\Database\Factories\SubCategoryFactory> */
    use HasFactory, SoftDeletes, UniqueSluggifier;

    protected $fillable = ['master_category_id', 'name', 'slug', 'description'];

    public function masterCategory(): BelongsTo
    {
        return $this->belongsTo(MasterCategory::class);
    }

    public function articleTypes(): HasMany
    {
        return $this->hasMany(ArticleType::class);
    }
}
