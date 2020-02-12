function navigate(newRoute) {
  document.getElementById(route).classList.remove('active');

  route = newRoute;

  document.getElementById(route).classList.add('active');

  if(route === 'game-play')
    requestAnimationFrame(gameLoop);
}


// Add an event listener to escape to set the route to main menu