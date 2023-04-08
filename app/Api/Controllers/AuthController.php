<?php

namespace App\Api\Controllers;

use App\Models\User;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        // $credentials = $request->only('email', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['errors' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        // $credentials = $request->only('email', 'password','full_name','date_of_birth');
        $credentials = request(['email', 'password','full_name','date_of_birth']);
        //valid credential
        $validator = Validator::make($credentials, [
            'full_name' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50',
            'date_of_birth' => 'required|date|before:today',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()->first()], 400);
        }

        DB::beginTransaction();

        $id = 'CU'.date('md').mt_rand(10000,99999);

        $user = User::create([
            'user_id' => $id,
            'name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $customer_data = [
            'user_id' => $user->id,
            'customer_id' => $id,
            'full_name' => $request->full_name,
            'date_of_birth' => $request->date_of_birth,
        ];

        $customer = Customer::create($customer_data);

        if( !$customer || !$user )
        {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => 'Something happended. Please try again later.',
            ], 400);

        } else {
            // Else commit the queries
            DB::commit();

            $user->assignRole('customer');
            $user->syncRoles('customer');


            // return response()->json([
            //     'success' => true,
            //     'message' => 'Registration Successfully',
            // ], 200);

            return $this->login(request());

        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            $userRole = 'admin';
            return response()->json([
                'user' => $user,
                'user_role' => $userRole,
            ]);
        } else {
            $userRole = 'customer';
            return response()->json([
                'user' => $user,
                'other' => auth()->user()->customerData,
                'user_role' => $userRole,
            ]);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            $userRole = 'admin';
        } else {
            $userRole = 'customer';
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
            'user_role' => $userRole,
        ]);
    }

}
