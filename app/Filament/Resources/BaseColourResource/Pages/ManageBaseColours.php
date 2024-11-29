<?php

namespace App\Filament\Resources\BaseColourResource\Pages;

use App\Filament\Resources\BaseColourResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageBaseColours extends ManageRecords
{
    protected static string $resource = BaseColourResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
