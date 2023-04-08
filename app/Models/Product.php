<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = "products";

    public $timestamps = true;

    protected $fillable = ["product_id", "name", "category", "brand", "description", "price", "available_quantity", "image"];

    // Generate Image URL
    // public function getImageAttribute()
    // {
    //     if (!is_null($this->image)) {
    //         $imageUrl = 'http://127.0.0.1:8000/storage/products/'.$this->image;
    //     } else {
    //         $imageUrl = asset('/img/default-image.jpg');
    //     }
        
        

    //     return $imageUrl; 
    // }
}
