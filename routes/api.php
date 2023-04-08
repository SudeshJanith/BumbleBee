<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
    
    // Customers
    Route::get('customers', 'CustomerController@getAllCustomers');

    Route::get('products', 'ProductsController@getAllProducts');
    Route::post('/products/add', 'ProductsController@storeProduct');
    Route::get('/products/{id}', 'ProductsController@viewProduct');
    Route::post('/products/update', 'ProductsController@updateProduct');
    Route::post('/products/delete', 'ProductsController@deleteProduct');
    

});

Route::post('admin/profile/update', 'CustomerController@adminProfileUpdate');
Route::post('customer/profile/update', 'CustomerController@customerProfileUpdate');
Route::post('password/update', 'CustomerController@passwordUpdate');

// getProducts
Route::get('customer/products', 'CustomerController@getProducts');