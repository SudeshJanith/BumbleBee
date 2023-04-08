<?php

namespace App\Api\Controllers;

use App\Models\User;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    // Get All Customers
    public function getAllCustomers()
    {
        $customers = Customer::all();
        return response()->json([
            'customers' => $customers,
        ])->setStatusCode(200);
    }

    // Update customer profile info
    public function customerProfileUpdate(Request $request)
    {
        $fullName = $request->fullName;
        $email = $request->email;

        $credentials = request(['user_id', 'fullName', 'email']);

        $validator = Validator::make($credentials, [
            'user_id' => 'required',
            'fullName' => 'required|min:3|max:30',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->messages()->first()
            ])->setStatusCode(400);
        }

        $user = User::findorfail($request->user_id);
        $customer = Customer::where('user_id', $request->user_id)->first();
        $user->update([
            'name' => $fullName,
            'email' => $email,
        ]);

        $customer->update([
            "full_name" => $fullName, 
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Your Profile Update is successful!',
        ])->setStatusCode(200);

    }

    // Update Admin profile info
    public function adminProfileUpdate(Request $request)
    {
        try {
            $fullName = $request->fullName;
            $email = $request->email;

            $credentials = request(['user_id', 'fullName', 'email']);

            $validator = Validator::make($credentials, [
                'user_id' => 'required',
                'fullName' => 'required|min:3|max:30',
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->messages()->first()
                ])->setStatusCode(400);
            }

            $user = User::findorfail($request->user_id);
            $user->update([
                'name' => $fullName,
                'email' => $email,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Your Profile Update is successful!',
            ])->setStatusCode(200);

        } catch (\Throwable $th) {

            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ])->setStatusCode(561);
            
        }
    }

    public function passwordUpdate(Request $request)
    {
        try {
            $credentials = request(['user_id', 'password', 'password_confirmation']);

            $validator = Validator::make($credentials, [
                'user_id' => 'required',
                'password' => 'required|string|min:6|required_with:password_confirmation|same:password_confirmation',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->messages()->first()
                ])->setStatusCode(400);
            }

            $user = User::findorFail($request->user_id);
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password Updated Successfully',
            ])->setStatusCode(200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ])->setStatusCode(561);
        }


    }

    public function getProducts()
    {
        $products = Product:: all();

        return response()->json([
            'status' => 'success',
            'products' => $products,
        ])->setStatusCode(200);
    }
}
