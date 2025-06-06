<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Usage extends Model
{
    /** @use HasFactory<\Database\Factories\UsageFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['name'];
}
