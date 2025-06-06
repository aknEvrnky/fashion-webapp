<?php

namespace App\Models;

use App\Concerns\UniqueSluggifier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasterCategory extends Model
{
    /** @use HasFactory<\Database\Factories\MasterCategoryFactory> */
    use HasFactory, SoftDeletes, UniqueSluggifier;

    protected $fillable = ['name', 'slug', 'description'];

    public function subCategories(): HasMany
    {
        return $this->hasMany(SubCategory::class);
    }

    public function url(): string
    {
        return route('master-categories.show', $this);
    }
}
