<?php

namespace App\Filament\Widgets;

use App\Gender;
use App\Models\Product;
use Filament\Widgets\ChartWidget;

class ProductsByBaseColourChart extends ChartWidget
{
    protected static ?string $heading = 'Products by Base Colours';

    protected function getData(): array
    {
        $data = $this->getDataset();
        $labels = array_keys($data);

        return [
            'datasets' => [
                [
                    'label' => 'Products by Base Colours',
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
            ->selectRaw('base_colours.name, COUNT(*) as count')
            ->join('base_colours', 'products.base_colour_id', '=', 'base_colours.id')
            ->groupBy('base_colours.name')
            ->get()
            ->mapWithKeys(fn($item) => [$item->name => $item->count])
            ->toArray();
    }
}
