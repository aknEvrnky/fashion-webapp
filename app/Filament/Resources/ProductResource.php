<?php

namespace App\Filament\Resources;

use App\Cnn\CnnClient;
use App\Enums\Gender;
use App\Enums\Season;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\MasterCategory;
use App\Models\Product;
use App\Models\SubCategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\Action;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube-transparent';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Tabs')
                    ->columns()
                    ->columnSpanFull()
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Product Information')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description')
                                    ->required()
                                    ->columnSpanFull(),
                                Forms\Components\FileUpload::make('image')
                                    ->image()
                                    ->required(),
                            ]),
                        Forms\Components\Tabs\Tab::make('Retail Information')
                            ->schema([
                                Forms\Components\TextInput::make('price')
                                    ->hint('in Cents')
                                    ->required()
                                    ->numeric()
                                    ->prefix('¢'),
                                Forms\Components\TextInput::make('stock')
                                    ->required()
                                    ->numeric(),
                            ]),
                        Forms\Components\Tabs\Tab::make('Attributes')
                            ->schema([
                                Forms\Components\Section::make('Category Information')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\Select::make('master_category_id')
                                            ->label('Master Category')
                                            ->live()
                                            ->searchable()
                                            ->afterStateUpdated(function (Forms\Set $set) {
                                                $set('sub_category_id', null);
                                                $set('article_type_id', null);
                                            })
                                            ->preload()
                                            ->options(MasterCategory::pluck('name', 'id'))
                                            ->required(),
                                        Forms\Components\Select::make('sub_category_id')
                                            ->label('Sub Category')
                                            ->live()
                                            ->searchable()
                                            ->afterStateUpdated(function (Forms\Set $set) {
                                                $set('article_type_id', null);
                                            })
                                            ->preload()
                                            ->options(fn(Forms\Get $get) => SubCategory::where('master_category_id', $get('master_category_id'))->pluck('name', 'id'))
                                            ->required(),

                                        Forms\Components\Select::make('article_type_id')
                                            ->live()
                                            ->searchable()
                                            ->preload()
                                            ->relationship('articleType', 'name', fn(Builder $query, Forms\Get $get) => $query->where('sub_category_id', $get('sub_category_id')))
                                            ->required(),
                                    ]),
                                Forms\Components\Select::make('brand_id')
                                    ->searchable()
                                    ->relationship('brand', 'title')
                                    ->required(),
                                Forms\Components\Select::make('gender')
                                    ->searchable()
                                    ->options(Gender::class)
                                    ->required(),
                                Forms\Components\Select::make('base_colour_id')
                                    ->searchable()
                                    ->relationship('baseColour', 'name')
                                    ->required(),
                                Forms\Components\Select::make('season')
                                    ->searchable()
                                    ->options(Season::class)
                                    ->required(),
                                Forms\Components\Select::make('year')
                                    ->options(collect(range(2005, (int)date('Y')))->mapWithKeys(fn(int $year) => [$year => $year]))
                                    ->required(),
                                Forms\Components\Select::make('usage_id')
                                    ->searchable()
                                    ->relationship('usage', 'name')
                                    ->required(),
                            ]),
                    ]),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money(divideBy: 100)
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('gender')
                    ->searchable(),
                Tables\Columns\TextColumn::make('articleType.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('baseColour.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('season')
                    ->searchable(),
                Tables\Columns\TextColumn::make('year')
                    ->sortable(),
                Tables\Columns\TextColumn::make('usage.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('gender')
                    ->options(Gender::class)
                    ->multiple(),
                Tables\Filters\SelectFilter::make('articleType')
                    ->relationship('articleType', 'name')
                    ->preload()
                    ->multiple(),
                Tables\Filters\SelectFilter::make('baseColour')
                    ->relationship('baseColour', 'name')
                    ->preload()
                    ->multiple(),
                Tables\Filters\SelectFilter::make('brand')
                    ->relationship('brand', 'title')
                    ->multiple(),
                Tables\Filters\SelectFilter::make('season')
                    ->options(Season::class),

            ])
            ->headerActions([
                Action::make('generateEmbeddings')
                    ->label('Generate Embeddings')
                    ->action(function (CnnClient $cnnClient) {
                        $cnnClient->startEmbedGenerating();
                    })
                    ->color('success')
                    ->icon('heroicon-o-cube-transparent')
                    ->requiresConfirmation()
                    ->modalHeading('Generate Embeddings'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->paginationPageOptions([25, 50, 100]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return Product::query()->with('articleType.subCategory.masterCategory');
    }
}
