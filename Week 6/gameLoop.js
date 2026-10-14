
const TickTime = 1 * 1000 // Minutes to milliseconds
let currentTickTime = TickTime;

function GameLoop()
{
    UpdateTickTime();
}

function UpdateTickTime()
{
    // Update the tick time based on the frame rate
    currentTickTime -= deltaTime;

    if (currentTickTime <= 0) {
        currentTickTime = TickTime;
        console.log("Tick");
        //OnTick();
    }
}
