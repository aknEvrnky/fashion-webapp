<?php

namespace App\Models;

use App\Concerns\UniqueSluggifier;
use App\Enums\Gender;
use App\Enums\Season;
use App\Events;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

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

    protected $dispatchesEvents = [
        'created' => Events\ProductCreated::class,
        'updated' => Events\ProductUpdated::class,
        'deleted' => Events\ProductDeleted::class,
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

    public function getLabels(): array
    {
        return [
            $this->brand->title,
            $this->season->value,
            $this->usage->name,
            $this->gender->value,
            $this->baseColour->name,
        ];
    }

    public function getCategories(): array
    {
        return [
            $this->articleType->subCategory->masterCategory->name,
            $this->articleType->subCategory->name,
            $this->articleType->name,
        ];
    }

    public function isHidden(): bool
    {
        // todo: update here
        return false;
    }

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn(int $value): float => $value / 100,
            set: fn(float $value): int => (int) ($value * 100),
        );
    }
}
