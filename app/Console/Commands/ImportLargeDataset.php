<?php

namespace App\Console\Commands;

use App\Gender;
use App\Models\ArticleType;
use App\Models\BaseColour;
use App\Models\Brand;
use App\Models\MasterCategory;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\Usage;
use App\Season;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ImportLargeDataset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-large-dataset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports large product dataset from json';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = storage_path('dataset/styles.zip');
        $tmpPath = storage_path('dataset/tmp/styles');

        $this->info('Unzipping the file...');

        $zip = new \ZipArchive();
        $zip->open($path);
        $zip->extractTo($tmpPath);
        $zip->close();

        $files = glob($tmpPath . '/*.json');

        $this->info('Importing data...');
        $this->output->progressStart(count($files));

        // Reduce chunk size to 100 to minimize memory usage
        $chunks = array_chunk($files, 100);

        foreach ($chunks as $chunk) {
            foreach ($chunk as $file) {
                $this->output->progressAdvance();
                $this->importJson($file);
            }

            unset($chunk);
        }

        $this->output->progressFinish();

        $this->info('Cleaning up...');
        File::deleteDirectory($tmpPath);
    }

    private function importJson(string $filePath): void
    {
        $data = json_decode(file_get_contents($filePath), true)['data'];

        // withoutEvents yerine veri tabanı sorgularını doğrudan yap
        $baseColour = BaseColour::firstOrCreate(['name' => $data['baseColour']]);
        $usage = Usage::firstOrCreate(['name' => $data['usage']]);

        $masterCategory = MasterCategory::firstOrCreate(
            ['name' => $data['masterCategory']['typeName']],
            [
                'slug' => Str::slug($data['masterCategory']['typeName']),
                'description' => fake()->sentence
            ]
        );

        $subCategory = SubCategory::firstOrCreate(
            [
                'name' => $data['subCategory']['typeName'],
                'master_category_id' => $masterCategory->id
            ],
            [
                'slug' => Str::slug($data['subCategory']['typeName']),
                'description' => fake()->sentence
            ]
        );

        $articleType = ArticleType::firstOrCreate(
            [
                'name' => $data['articleType']['typeName'],
                'sub_category_id' => $subCategory->id
            ],
            [
                'slug' => Str::slug($data['articleType']['typeName']),
                'description' => fake()->sentence
            ]
        );

        $brand = Brand::firstOrCreate(
            ['title' => $data['brandName']],
            [
                'slug' => Str::slug($data['brandName']),
                'description' => strip_tags($data['brandUserProfile']['bio'] ?? null)
            ]
        );

        $season = $data['season'] ? Season::from($data['season']) : fake()->randomElement(Season::cases());
        $year = $data['year'] ?: date('Y');

        $description = strip_tags($data['productDescriptors']['description']['value'] ?? null);
        $description = str($description)->ascii()->limit(65000);

        $productData = [
            'name' => $data['productDisplayName'],
            'slug' => Str::slug($data['productDisplayName']),
            'description' => $description,
            'price' => $data['price'],
            'brand_id' => $brand->id,
            'gender' => Gender::from($data['gender']),
            'article_type_id' => $articleType->id,
            'base_colour_id' => $baseColour->id,
            'season' => $season,
            'year' => $year,
            'usage_id' => $usage->id,
            'stock' => true,
            'image' => sprintf('products/%s.jpg', $data['id']),
        ];

        // Factory kullanımını kaldırarak, doğrudan veri insert et
        Product::firstOrCreate(['image' => $productData['image']], $productData);

        // Referansları temizle
        unset($data, $productData, $baseColour, $usage, $masterCategory, $subCategory, $articleType, $brand);
    }
}
