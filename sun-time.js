function sunrise(rise = true) {
  const sun = document.getElementById('sun');
  const sunriseTime = document.getElementById('sunriseTime');

  if (rise) {
    // Move the sun up on hover
    sun.animate([
      { transform: "translateY(0) rotate(0deg)" },
      { transform: "translateY(-70%) rotate(360deg)" }
    ], {
      duration: 1000,
      fill: "forwards"
    });
  
    // Unhide sunrise time
    sunriseTime.style.opacity = 1;
    sunriseTime.style.filter = "hue-rotate(90deg)";
  } else {
    // Move the sun up on hover
    sun.animate([
      { transform: "translate(0, -70%) rotate(360deg)"},
      { transform: "translate(0, 0) rotate(0deg)"}
    ], {
      duration: 1000,
      iterations: 1,
      fill:"forwards"
    })
  
    // Unhide sunrise time
    sunriseTime.style.opacity = 0;
    sunriseTime.style.filter = "";
  }
}
