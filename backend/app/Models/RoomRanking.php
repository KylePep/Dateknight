<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomRanking extends Model
{
    protected $fillable = ['room_id', 'user_id', 'date_id','rank'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function date()
    {
        return $this->belongsTo(Date::class);
    }
}
