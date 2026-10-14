
const TickInterval = 1 * 1000 // Minutes to milliseconds
let currentTickTime = TickInterval;

function GameLoop()
{
    UpdateTickTime();
}

function UpdateTickTime()
{
    // Update the tick time based on the frame rate
    currentTickTime -= deltaTime;

    if (currentTickTime <= 0) {
        currentTickTime = TickInterval;
        console.log("Tick");
        //OnTick();
    }
}

function OnTick()
{
    // Update the monster's hunger level
    hunger -= 5; // Decrease hunger by 5 units per tick
}

function CheckNeeds()
{
    // If you starve your monster for too long, you gain a care mistake. 
    // If you gain too many care mistakes, your monster will die.
    if (hunger <= 40) {
        // Handle the case where the monster is too hungry
        console.log("Monster is too hungry!");
    }


}
