



document.querySelectorAll('.dropdown-content a, .sidebar-dropdown-content a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});




const reviewList = document.getElementById('review-list');
const addReviewBtn = document.getElementById('add-review');

addReviewBtn.addEventListener('click', () => {
  const nameInput = document.getElementById('review-name');
  const textInput = document.getElementById('review-text');

  const name = nameInput.value.trim();
  const comment = textInput.value.trim();

  if (name === '' || comment === '') {
    alert('Please enter both name and comment!');
    return;
  }


  const reviewItem = document.createElement('div');
  reviewItem.classList.add('review-item');

  reviewItem.innerHTML = `
    <h4>${name}</h4>
    <p>${comment}</p>
  `;

 
  reviewList.prepend(reviewItem);


  nameInput.value = '';
  textInput.value = '';
});



const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if(i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentIndex++;
  if(currentIndex >= slides.length) currentIndex = 0;
  showSlide(currentIndex);
}


showSlide(currentIndex);
setInterval(nextSlide, 3000);




