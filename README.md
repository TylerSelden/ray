# Ray

I mean... it's a raycaster. Hopefully it'll turn into a game at some point.

## To-do:

- [X] Only capture pointer if the function exists
- [X] Allow dev hiding
- [X] Auto detection for ray count
- [X] Fix fisheye
- [X] Refactor minimap
- [ ] Better distance -> height function
- [X] Distance = darker wall color (temporary fix)
- [ ] Resize changes number of rays
- [X] CRT effect
- [ ] ~~WebGL CRT effect (from CSS)~~
- [ ] ~~Add WebGL support~~
- [X] Clean up the `main.js`
- [X] Clean up `canvas.js`
- [X] Clean up `rays.js`
- [X] Clean up `player.js`
- [X] Refactor `scene.js`
- [X] Change walls to be infinitely thin
- [X] Add touchscreen support
- [X] Fix CRT effect resizing
- [ ] Change wall system to free points
- [X] Screw around with portals lol
- [ ] Okay that was super fun, screw around MORE with portals
- [ ] ...and mirrors
- [ ] Mapmaker
- [ ] Solids
- [ ] Use deltatime for movement
- [ ] Change ray count to internal resolution
- [ ] Implement textures


## Ideas:

- ~~**If `nV` wasn't used in a given step of a ray, don't re-calculate it; Instead, store the value for the next use.** This can be done by setting the used value to `null`, and then re-calc any null value.~~ (Not worth it as of now)
- **Since the height and how tall a wall is can be changed easily, slopes could be implemented quite easily.** This would involve more complex raycasting for the walls and ceiling, but as long as the player never sees the top or bottom of a block, it would work since we can easily adjust the player's height. Maybe adjust the height per-block?
- **On the topic of Portals and Mirrors.** It's a raycasting engine, so it can't be too hard to implement these things, and they're fun to mess around with too.
- **Free point scene system.** This means that rather than having all walls be locked to a grid, the mapmaker could instead allow for walls to be placed anywhere, and export an array of every X and Y coordinate pair individually for each wall. Then, if there is, for example, a large open space with no horizontal walls in the map, the rays wouldn't spend time snapping to grid lines with nothing. They'd continue snap to the Y level of the next horizontal wall.
