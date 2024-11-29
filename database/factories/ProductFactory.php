<?php

namespace Database\Factories;

use App\Gender;
use App\Models\ArticleType;
use App\Models\BaseColour;
use App\Models\Usage;
use App\Season;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'slug' => $this->faker->slug,
            'description' => $this->faker->text,
            'price' => $this->faker->randomNumber(4),
            'stock' => $this->faker->randomNumber(2),
            'gender' => $this->faker->randomElement(Gender::cases()),
            'article_type_id' => ArticleType::factory(),
            'base_colour_id' => BaseColour::factory(),
            'season' => $this->faker->randomElement(Season::cases()),
            'year' => $this->faker->year,
            'usage_id' => Usage::factory(),
            'display_name' => $this->faker->name,
            'image' => $this->faker->filePath(). '.jpg',
        ];
    }
}
