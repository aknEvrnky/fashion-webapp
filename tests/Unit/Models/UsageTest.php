<?php

use App\Models\Usage;

it('can be created', function () {
    $usage = Usage::factory()->create();

    $this->assertDatabaseHas('usages', [
        'id' => $usage->id,
    ]);
});
