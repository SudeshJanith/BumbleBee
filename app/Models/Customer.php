<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = "customers";

    public $timestamps = true;

    protected $fillable = [
        "user_id",
        "customer_id", 
        "full_name", 
        "date_of_birth", 
        "loan_balance",
        "used_amount", 
        "installment_plan"
    ];

    // fetch related auth data
    public function userData()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
