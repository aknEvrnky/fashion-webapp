<?php

use App\Models\MasterCategory;
use App\Models\SubCategory;

it('has many sub categories', function () {
    $masterCategory = MasterCategory::factory()->create();
    $subCategory = SubCategory::factory()->create(['master_category_id' => $masterCategory->id]);

    expect($masterCategory->subCategories)->toHaveCount(1)
        ->and($masterCategory->subCategories->first()->id)->toBe($subCategory->id);
});
