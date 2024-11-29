<?php


use App\Models\BaseColour;

it('can be created', function () {
    $baseColour = BaseColour::factory()->create();
    $this->assertDatabaseHas('base_colours', $baseColour->toArray());
});
