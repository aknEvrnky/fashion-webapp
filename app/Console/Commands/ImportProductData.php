<?php

namespace App\Console\Commands;

use App\Gender;
use App\Models\ArticleType;
use App\Models\BaseColour;
use App\Models\MasterCategory;
use App\Models\Product;
use App\Models\Usage;
use App\Season;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ImportProductData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-product-data {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports product data from a CSV file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = $this->argument('file');

        $this->info("Importing product data from {$file}");

        $data = $this->parseCSV($file);
        $this->info("Found {$data->count()} rows of data.");

        $this->output->progressStart($data->count());

        foreach ($data as $datum) {
            $this->output->progressAdvance();

            // import the data

            $baseColourId = BaseColour::query()->firstOrCreate(['name' => $datum['baseColour']])->id;
            $usageId = Usage::query()->firstOrCreate(['name' => $datum['usage']])->id;

            $masterCategory = MasterCategory::query()->firstOrCreate(['name' => $datum['masterCategory']], [
                'slug' => Str::slug($datum['masterCategory']),
                'description' => fake()->sentence
            ]);

            $subCategory = $masterCategory->subCategories()->firstOrCreate(['name' => $datum['subCategory']], [
                'slug' => Str::slug($datum['subCategory']),
                'description' => fake()->sentence
            ]);

            $articleType = $subCategory->articleTypes()->firstOrCreate(['name' => $datum['articleType']], [
                'slug' => Str::slug($datum['articleType']),
                'description' => fake()->sentence
            ]);

            $season = $datum['season'] ? Season::from($datum['season']) : fake()->randomElement(Season::cases());

            $year = $datum['year'] ? $datum['year'] : date('Y');

            $data = Product::factory()->raw([
                'name' => $datum['productDisplayName'],
                'slug' => Str::slug($datum['productDisplayName']),
                'gender' => Gender::from($datum['gender']),
                'article_type_id' => $articleType->id,
                'base_colour_id' => $baseColourId,
                'season' => $season,
                'year' => $year,
                'usage_id' => $usageId,
                'image' => sprintf('products/%s.jpg', $datum['id'])
            ]);

            Product::query()->firstOrCreate(['image' => $data['image']], $data);
        }

        $this->output->progressFinish();

        $this->info('Product data imported successfully.');
    }

    protected function parseCSV(string $file): Collection
    {
        // 0. Read the CSV file.
        try {
            $CSV = \File::get($file);
        } catch (\Illuminate\Contracts\Filesystem\FileNotFoundException $e) {
            $this->error("The file {$file} could not be found.");

            return collect();
        }

        // 1. Split by new line. Use the PHP_EOL constant for cross-platform compatibility.
        $lines = explode(PHP_EOL, $CSV);

        // 2. Extract the header and convert it into a Laravel collection.
        $header = collect(str_getcsv(array_shift($lines)));

        // 3. Convert the rows into a Laravel collection.
        $rows = collect($lines);

        // 4. Map through the rows and combine them with the header to produce the final collection.
        return $rows->filter()->map(function ($row) use ($header) {
            $columns = collect(str_getcsv($row));

            if ($columns->count() > $header->count()) {
                $leftSide = $columns->slice(0, $header->count());

                $rightSide = $columns->slice($header->count() - 1)->join(',');

                $leftSide->put($header->count() - 1, $columns->get($header->count() - 1) . $rightSide);
                $columns = $leftSide;
            }

            return $header->combine($columns);
        });
    }
}
