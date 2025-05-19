<?php

namespace App\Providers;

use App\Cnn\CnnClient;
use App\Gorse\Gorse;
use Illuminate\Support\ServiceProvider;

class RecommenderServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Gorse::class, function () {
            $config = $this->app->get('config');
            $host = $config->get('services.gorse.host');
            $apiKey = $config->get('services.gorse.api_key');
            return new Gorse($host, $apiKey);
        });

        $this->app->singleton(CnnClient::class, function () {
            $config = $this->app->get('config');
            $baseUrl = $config->get('services.cnn.host');
            $bearerToken = $config->get('services.cnn.api_key');
            return new CnnClient($baseUrl, $bearerToken);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
