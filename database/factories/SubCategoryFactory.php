<?php

namespace Database\Factories;

use App\Models\MasterCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubCategory>
 */
class SubCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'master_category_id' => MasterCategory::factory(),
            'name' => $this->faker->word,
            'slug' => $this->faker->slug,
            'description' => $this->faker->sentence,
        ];
    }
}
