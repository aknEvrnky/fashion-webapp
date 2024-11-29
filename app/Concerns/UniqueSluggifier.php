<?php

namespace App\Concerns;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

trait UniqueSluggifier
{
    public function slug(): Attribute
    {
        return Attribute::set(function (string $value) {
            if (static::whereSlug($slug = Str::slug($value))->exists()) {

                $slug = $this->incrementSlug($slug);
            }

            return $slug;
        });
    }

    public function incrementSlug(string $slug): string
    {
        $original = $slug;

        $count = 2;

        while (static::whereSlug($slug)->exists()) {

            $slug = "{$original}-" . $count++;
        }

        return $slug;

    }
}
