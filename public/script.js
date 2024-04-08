


const audioPlayer = document.getElementById('audioPlayer')



async function searchTracks() {
  const searchInput = document.getElementById('searchInput').value;

  try {
    const response = await axios.get(`http://localhost:3000/search?q=${searchInput}`);
    const tracks = response.data; 

    const tracksListDiv = document.getElementById('tracksList');
    tracksListDiv.innerHTML = ''; 

    if (tracks.length === 0) {
      tracksListDiv.textContent = 'No tracks found';
    } else {
     
      const track = tracks[0];

     
      const trackElement = document.createElement('div');
      trackElement.innerHTML = `
      <!--
        <p><strong>URL:</strong> <a href="${track.url}" target="_blank">${searchInput}</a></p>
        <p><strong>Duration:</strong> ${track.duration} seconds</p>
        <p><strong>Size:</strong> ${track.size}</p>
        <p><strong>Format:</strong> ${track.format}</p>
        -->
        <button onclick="playSong('${track.url}')">${searchInput}</button> <!-- Play button -->
      `;
      
      tracksListDiv.appendChild(trackElement);
     

    }
    document.getElementById('searchInput').value = '';
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }

  
}


function playSong(songUrl){
  audioPlayer.src = songUrl; 
  audioPlayer.play(); 

}