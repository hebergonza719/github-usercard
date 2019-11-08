/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell', 'K-JHarris'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const createCard = (receivedData) => {
  const card = document.createElement('div');
  const imgUser = document.createElement('img');
  const cardInfo = document.createElement('div');
  const h3Name = document.createElement('h3');
  const pUsername = document.createElement('p');
  const pLocation = document.createElement('p');
  const pProfile = document.createElement('p');
  const aTag = document.createElement('a');
  const pFollowers = document.createElement('p');
  const pFollowing = document.createElement('p');
  const pBio = document.createElement('p');

  // I had to place it here, otherwise (pProfile.textContent = 'Profile: ';) would have overridden what's in the a tag.
  imgUser.src = receivedData.avatar_url;
  h3Name.textContent = receivedData.name;
  pUsername.textContent = receivedData.login;
  pLocation.textContent = `Location: ${receivedData.location}`;
  pProfile.textContent = 'Profile: ';
  aTag.href = receivedData.html_url;
  aTag.textContent = receivedData.html_url;
  pFollowers.textContent = `Followers: ${receivedData.followers.toString()}`;
  pFollowing.textContent = `Following: ${receivedData.following.toString()}`;
  pBio.textContent = `Bio: ${receivedData.bio}`;

  card.appendChild(imgUser);
  card.appendChild(cardInfo);
  cardInfo.appendChild(h3Name);
  cardInfo.appendChild(pUsername);
  cardInfo.appendChild(pLocation);
  cardInfo.appendChild(pProfile);
  pProfile.appendChild(aTag);
  cardInfo.appendChild(pFollowers);
  cardInfo.appendChild(pFollowing);
  cardInfo.appendChild(pBio);
  
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  h3Name.classList.add('name');
  pUsername.classList.add('username');

  return card;
}

const cardsElement = document.querySelector('.cards');

const axiosPromise = axios.get("https://api.github.com/users/hebergonza719");
console.log(axiosPromise);

axiosPromise.then(response => {
  console.log(response.data);
  const receivedData = response.data;
  console.log(receivedData);
  cardsElement.appendChild(createCard(receivedData)); // must be created in .then
});

axiosPromise.catch(error => {
  console.log('The data was not returned', error);
});

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

followersArray.forEach((follower) => {
  axios
  .get(`https://api.github.com/users/${follower}`) // no semi-colon
  .then(response => {
    receivedData = response.data;
    cardsElement.appendChild(createCard(receivedData));
  })
});