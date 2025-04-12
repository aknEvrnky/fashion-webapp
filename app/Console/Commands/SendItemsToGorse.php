<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Services\Recommender\RecommenderService;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

class SendItemsToGorse extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-items-to-gorse';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send user data to gorse';

    /**
     * Execute the console command.
     */
    public function handle(RecommenderService $recommenderService)
    {
        $this->output->progressStart(Product::count());

        Product::query()
            ->with(['articleType.subCategory.masterCategory', 'brand', 'usage', 'baseColour'])
            ->chunk(100, function (Collection $products) use ($recommenderService) {
                $this->output->progressAdvance(100);
                $recommenderService->sendProducts($products);
            });

        $this->output->progressFinish();

        $this->info('All items sent to Gorse successfully.');
    }
}
