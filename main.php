<?php
$x = (int) $_GET["x"];
$y = (double) $_GET["y"];
$r = (double) $_GET["r"];

function isInTringle($x,$y,$r) {
    $a = (0 - $x) * ($r - 0) - (0 - 0) * (0 - $y);
    $b = (0 - $x) * (0 - $r) - ($r - 0) * ($r - $y);
    $c = ($r - $x) * (0 - 0) - (0 - $r) * (0 - $y);
    if (($a <= 0 && $b <= 0 && $c <= 0) || ($a >= 0 && $b >= 0 && $c >= 0)){
        return true;
    }
    return false;
}

function isInRectangle($x, $y, $r) {
    return ($x >= -$r && $x <= 0 && $y >= -$r/2 && $y <= 0);
}

function isInCircle($x, $y, $r) {
    if ($x < -$r || $x > 0  || $y > $r || $y < 0) return false;
    if ($x*$x + $y*$y <= $r*$r) return true;
    return false;
}

function isHit($x, $y, $r){
    if (isInRectangle($x, $y, $r) || isInTringle($x, $y, $r) || isInCircle($x, $y, $r)){
        return true;
    }
    return false;
}


$executeTime = round(microtime(true) - $_SERVER['REQUEST_TIME'], 5);
date_default_timezone_set('Europe/Moscow'); // Установим часовую зону
$serverTime = date("H:i:s"); // Сформируем дату

class Responce {
    public $x;
    public $y;
    public $r;
    public $hit;
    public $request_time;
    public $executing_time;

    public function __construct($x, $y, $r, $hit, $request_time, $executing_time)
    {
        $this->x = $x;
        $this->y = $y;
        $this->r = $r;
        $this->hit = $hit;
        $this->request_time = $request_time;
        $this->executing_time = $executing_time;
    }


}


if (isHit($x, $y, $r)){
    echo json_encode(new Responce($x,$y,$r,true,$serverTime,$executeTime));
}
else {
    echo json_encode(new Responce($x,$y,$r,false,$serverTime,$executeTime));
}