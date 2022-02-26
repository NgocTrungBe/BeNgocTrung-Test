<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Joke;
use Exception;

class JokesController extends Controller
{
      //get joke List
      public function getJokeList(){
            $jokes = Joke::all();
            return response()->json([
                  'status' => 200,
                  'jokes' => $jokes,
            ]);
      }
      
      //update joke vote
      public function updateJoke(Request $req,$id){
          $joke = Joke::find($id);
          $joke->joke_vote = $req->input('joke_vote');
          $joke->update();
          return response()->json([
                'status' => 200,
                'Message' => 'Joke Update Sucessfully!',
          ]);
      }


}
