<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BaseColour extends Model
{
    /** @use HasFactory<\Database\Factories\BaseColourFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'hex'];
}
