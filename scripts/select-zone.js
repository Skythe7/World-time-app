function onContinentChange() {
  // Grab the HTML element
  const continentSelect = document.getElementById('continent');
  const citySelect = document.getElementById('city');
  const value = continentSelect.value;

  citySelect.innerHTML = '<option value="none">Select City</option>';

  if (zoneValue[value]) { // If the zoneValue has the value on it
    // Loop the continent city while creating an element for it
    zoneValue[value].forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city.replace('%2F', '/');
      citySelect.appendChild(option);
    });
  }
}

async function fetchTimeForZone(continent, city) {
  // If there is no value, skip
  if (!continent || !city || continent === "none" || city === "none") return;

  // Making the api URL
  const timeZone = `${continent}%2F${city}`;
  const url = `https://timeapi.io/api/time/current/zone?timeZone=${timeZone}`;

  // Error handler
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    updateCalendar(data);
  } catch (error) {
    console.error("Failed to fetch time:", error);
  }
}

function updateCalendar(data) {
  if (!data) return; // If there's no data, skip

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = months[(data.month || 1) - 1]; // Convert number into months strings

  // Update the element according to data
  document.querySelector('.day-week').textContent = data.dayOfWeek || '';
  document.querySelector('.date').textContent = `${monthName} ${data.day}, ${data.year}`;
  document.querySelector('.time').textContent = data.time || '';
}


// Event listeners
document.getElementById('continent').addEventListener('change', onContinentChange);

document.getElementById('city').addEventListener('change', function() {
  const continent = document.getElementById('continent').value;
  const city = document.getElementById('city').value;
  fetchTimeForZone(continent, city);
});