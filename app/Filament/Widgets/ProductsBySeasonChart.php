<?php

namespace App\Filament\Widgets;

use App\Gender;
use App\Models\Product;
use Filament\Widgets\ChartWidget;

class ProductsBySeasonChart extends ChartWidget
{
    protected static ?string $heading = 'Products by Seasons';

    protected function getData(): array
    {
        $data = $this->getDataset();
        $labels = array_keys($data);

        return [
            'datasets' => [
                [
                    'label' => 'Products by Seasons',
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
        return 'doughnut';
    }

    protected function getDataset(): array
    {
        return Product::query()
            ->selectRaw('season, COUNT(*) as count')
            ->groupBy('season')
            ->get()
            ->mapWithKeys(fn($item) => [$item->season->value => $item->count])
            ->toArray();
    }
}
