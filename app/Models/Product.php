<?php

namespace App\Models;

use App\Concerns\UniqueSluggifier;
use App\Gender;
use App\Season;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, SoftDeletes, UniqueSluggifier;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'brand_id',
        'stock',
        'gender',
        'article_type_id',
        'base_colour_id',
        'season',
        'year',
        'usage_id',
        'image',
    ];

    protected $with = [
        'baseColour',
        'usage'
    ];

    protected function casts(): array
    {
        return [
            'gender' => Gender::class,
            'season' => Season::class,
        ];
    }

    public function articleType(): BelongsTo
    {
        return $this->belongsTo(ArticleType::class);
    }

    public function baseColour(): BelongsTo
    {
        return $this->belongsTo(BaseColour::class);
    }

    public function usage(): BelongsTo
    {
        return $this->belongsTo(Usage::class);
    }

    public function imageUrl(): string
    {
        return Storage::url($this->image);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
}
