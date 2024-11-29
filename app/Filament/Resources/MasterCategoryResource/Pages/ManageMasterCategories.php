<?php

namespace App\Filament\Resources\MasterCategoryResource\Pages;

use App\Filament\Resources\MasterCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageMasterCategories extends ManageRecords
{
    protected static string $resource = MasterCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
