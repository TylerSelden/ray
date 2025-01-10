# Ray

I mean... it's a raycaster. Hopefully it'll turn into a game at some point.

## To-do:

- [X] Only capture pointer if the function exists
- [X] Allow dev hiding
- [X] Auto detection for ray count
- [X] Fix fisheye
- [ ] Refactor minimap
- [ ] Use deltatime for movement
- [ ] Better distance -> height function
- [ ] Distance = darker wall color
- [ ] Resize changes number of rays
- [ ] CRT effect
- [ ] Add WebGL support
- [X] Clean up the `main.js`
- [X] Clean up `canvas.js`
- [X] Clean up `rays.js`
- [X] Clean up `player.js`
- [ ] Refactor `scene.js`
- [ ] Change `rayFactor` to `textureFactor`
- [ ] Implement textures


## Ideas:

- **If `nV` wasn't used in a given step of a ray, don't re-calculate it; Instead, store the value for the next use.** This can be done by setting the used value to `null`, and then re-calc any null value.
- **Since the height and how tall a wall is can be changed easily, slopes could be implemented quite easily.** This would involve more complex raycasting for the walls and ceiling, but as long as the player never sees the top or bottom of a block, it would work since we can easily adjust the player's height.