<?php

namespace App\Filament\Resources\UsageResource\Pages;

use App\Filament\Resources\UsageResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageUsages extends ManageRecords
{
    protected static string $resource = UsageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
