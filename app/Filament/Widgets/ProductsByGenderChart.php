<?php

namespace App\Filament\Widgets;

use App\Gender;
use App\Models\Product;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class ProductsByGenderChart extends ChartWidget
{
    protected static ?string $heading = 'Products by Genders';

    protected function getData(): array
    {
        $data = $this->getDataset();
        $labels = array_keys($data);

        return [
            'datasets' => [
                [
                    'label' => 'Products by Genders',
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
            ->selectRaw('gender, COUNT(*) as count')
            ->groupBy('gender')
            ->get()
            ->mapWithKeys(fn($item) => [$item->gender->value => $item->count])
            ->toArray();
    }
}
