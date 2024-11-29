<?php

use App\Models\Gender;

it('can be created', function () {
    $gender = Gender::factory()->create();
    expect($gender->id)->toBe(1);
});
