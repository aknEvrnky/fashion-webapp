<?php

use App\Models\ArticleType;
use App\Models\BaseColour;
use App\Models\Brand;
use App\Models\Usage;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('price');
            $table->integer('stock');
            $table->string('gender');
            $table->foreignIdFor(Brand::class)->constrained();
            $table->foreignIdFor(ArticleType::class)->constrained();
            $table->foreignIdFor(BaseColour::class)->constrained();
            $table->string('season');
            $table->unsignedInteger('year');
            $table->foreignIdFor(Usage::class)->constrained();
            $table->string('image');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
