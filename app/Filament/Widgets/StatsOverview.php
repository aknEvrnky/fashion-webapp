<?php

namespace App\Filament\Widgets;

use App\Models\ArticleType;
use App\Models\BaseColour;
use App\Models\MasterCategory;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\Usage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Products', Product::count()),
            Stat::make('Master Categories', MasterCategory::count()),
            Stat::make('Sub Categories', SubCategory::count()),
            Stat::make('Article Type', ArticleType::count()),
            Stat::make('Base Colours', BaseColour::count()),
            Stat::make('Usages', Usage::count()),
        ];
    }
}
