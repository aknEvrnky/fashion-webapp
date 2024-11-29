<?php

use App\Models\ArticleType;
use App\Models\SubCategory;

it('has many article types', function () {
    $subCategory = SubCategory::factory()->create();
    $articleType = ArticleType::factory()->create(['sub_category_id' => $subCategory->id]);

    expect($subCategory->articleTypes)->toHaveCount(1)
        ->and($subCategory->articleTypes->first()->id)->toBe($articleType->id);
});

it('belongs to a master category', function () {
    $subCategory = SubCategory::factory()->create();
    $masterCategory = $subCategory->masterCategory;

    expect($masterCategory->id)->toBe($subCategory->masterCategory->id);
});
