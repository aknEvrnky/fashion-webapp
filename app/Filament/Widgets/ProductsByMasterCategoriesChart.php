<?php

namespace App\Filament\Widgets;

use App\Gender;
use App\Models\Product;
use Filament\Widgets\ChartWidget;

class ProductsByMasterCategoriesChart extends ChartWidget
{
    protected static ?string $heading = 'Products by Master Categories';

    protected function getData(): array
    {
        $data = $this->getDataset();
        $labels = array_keys($data);

        return [
            'datasets' => [
                [
                    'label' => 'Products by Master Categories',
                    'data' => array_values($data),
                    'backgroundColor' => [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                    ]
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }

    protected function getDataset(): array
    {
        return Product::query()
            ->selectRaw('master_categories.name, COUNT(*) as count')
            ->join('article_types', 'products.article_type_id', '=', 'article_types.id')
            ->join('sub_categories', 'article_types.sub_category_id', '=', 'sub_categories.id')
            ->join('master_categories', 'sub_categories.master_category_id', '=', 'master_categories.id')
            ->groupBy('master_categories.name')
            ->get()
            ->mapWithKeys(fn($item) => [$item->name => $item->count])
            ->toArray();
    }
}
