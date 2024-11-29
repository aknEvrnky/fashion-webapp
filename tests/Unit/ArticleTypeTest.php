<?php

use App\Models\ArticleType;
use App\Models\SubCategory;

it('has a sub category', function () {
    $subCategory = SubCategory::factory()->create();
    $articleType = ArticleType::factory()->create(['sub_category_id' => $subCategory->id]);

    expect($articleType->subCategory)->toBeInstanceOf(SubCategory::class);
});

it('can be soft deleted', function () {
    $articleType = ArticleType::factory()->create();

    $articleType->delete();

    expect($articleType->trashed())->toBeTrue();
});
