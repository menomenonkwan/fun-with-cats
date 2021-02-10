const container = document.querySelector('.container');
const load = document.createElement('h3');
load.textContent = "Enjoy!";
const img = new Image();
container.appendChild(load);
container.appendChild(img);
let allCats = [];

async function getCats() {
  const response = await fetch(`https://cataas.com/api/cats?tags=gif`, {mode: 'cors'});
  const catData = await response.json();
  catData.forEach(cat => allCats.push(cat.id));
}

function randomNumber() {
  const totalCats = allCats.length;
  const random = Math.floor(Math.random() * totalCats);
  const id = allCats[random];
  return id;
}

async function showNewCat() {
  img.classList.add('loading');
  load.textContent = 'Loading...';
  return new Promise((resolve, reject) => { 
    const id = randomNumber(); 
    img.onload = () => {
      img.classList.remove('loading');
      load.textContent = '';
    }
    img.onerror = reject
    img.src = `https://cataas.com/cat/${id}`;
  });
}

const btn = document.querySelector('button').addEventListener('click', showNewCat);

getCats();
