<?php

namespace App\Gorse;

use JsonSerializable;

class Item implements JsonSerializable
{
    public string $item_id;
    public array $categories;
    public array $labels;
    public bool $is_hidden;
    public string $comment;
    public string $timestamp;

    public function __construct(string $item_id, array $categories, array $labels, bool $is_hidden, string $comment, string $timestamp)
    {
        $this->item_id = $item_id;
        $this->categories = $categories;
        $this->labels = $labels;
        $this->is_hidden = $is_hidden;
        $this->comment = $comment;
        $this->timestamp = $timestamp;
    }

    public function jsonSerialize(): array
    {
        return [
            'ItemId' => $this->item_id,
            'Categories' => $this->categories,
            'Labels' => $this->labels,
            'IsHidden' => $this->is_hidden,
            'Comment' => $this->comment,
            'Timestamp' => $this->timestamp,
        ];
    }

    public static function fromJSON($json): Item
    {
        return new Item($json->ItemId, $json->Categories, $json->Labels, $json->IsHidden, $json->Comment, $json->Timestamp);
    }
}
