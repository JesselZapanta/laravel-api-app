<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum',except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        $data['user_id'] = auth()->id();

        // $post = $request->user()->posts()->create($data);//using relationship

        $post = Post::create($data);//using the model

        return response()->json([
            'status' => 'created',
            'post' => $post,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Post::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        Gate::authorize('modify', $post);

        $data = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        $data['user_id'] = auth()->id();

        $post->update($data);

        return response()->json([
            'status' => 'updated',
            'post' => $post,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        Gate::authorize('modify', $post);//policy
        
        $post->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
