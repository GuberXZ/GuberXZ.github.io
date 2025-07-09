'use strict';

// script.js
import projects from './photo-items.js';

// Import Firebase modules
import { auth } from './firebase.js';
import { GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Create the provider
const provider = new GithubAuthProvider();

// GitHub login button
const githubLoginBtn = document.querySelector("[github-login-btn]");

// Auth state management
let isAuthenticated = false;
const adminUserIDs  = ['37782057'];
let isAdmin         = false;

// Function to update button and admin elements based on auth state
function updateAuthButton(user) {
  if (user) {
    // User is signed in
    isAuthenticated = true;
    // Get GitHub user ID from provider data
    const githubUserData = user.providerData.find(provider => provider.providerId === 'github.com');
    const githubUserId = githubUserData ? githubUserData.uid : null;

    isAdmin = githubUserId && adminUserIDs.includes(githubUserId);

    githubLoginBtn.textContent = 'Logout';
    githubLoginBtn.style.backgroundColor = 'var(--vegas-gold)';
    githubLoginBtn.style.color = 'var(--white-1)';
    
    if (isAdmin) {
      // User is an admin
      console.log('User is admin with GitHub ID:', githubUserId);

      showAdminElements();
    }

  } else {
    // User is signed out
    isAuthenticated = false;
    isAdmin = false;
    githubLoginBtn.textContent = 'Authenticate';
    githubLoginBtn.style.backgroundColor = 'var(--onyx)';
    
    // Hide admin elements
    hideAdminElements();
  }
}

// Function to show admin-only elements
function showAdminElements() {
  // Show admin buttons/forms
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(element => {
    if (element.id !== 'add-portfolio-modal' && element.id !== 'add-photo-modal') {
      element.style.display = 'block';
    }
  });
}

// Function to hide admin-only elements
function hideAdminElements() {
  // Hide admin buttons/forms
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(element => {
    element.style.display = 'none';
  });
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  updateAuthButton(user);
});

// Handle login/logout button click
githubLoginBtn.addEventListener('click', () => {
  if (isAuthenticated) {
    // User is logged in, so log them out
    signOut(auth).catch(error => {
      alert("Logout failed: " + error.message);
    });
  } else {
    // User is not logged in, so log them in
    signInWithPopup(auth, provider)
      .catch(error => {
        alert("GitHub login failed: " + error.message);
      });
  }
});

// Portfolio form handling
const addProjectBtn = document.getElementById('add-project-btn');
const portfolioModal = document.getElementById('add-portfolio-modal');
const closeModalBtn = document.getElementById('close-portfolio-modal');
const cancelBtn = document.getElementById('cancel-portfolio');
const portfolioForm = document.getElementById('add-portfolio-form');
const portfolioModalContent = document.querySelector('.portfolio-modal-content');

// Show modal when + button is clicked
if (addProjectBtn) {
  addProjectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    portfolioModal.style.display = 'flex';
  });
}

// Close modal function
function closeModal() {
  if (portfolioModal) {
    portfolioModal.style.display = 'none';
    portfolioForm?.reset();
  }
}

// Close modal buttons
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

// Prevent modal content clicks from closing modal
if (portfolioModalContent) {
  portfolioModalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Close modal when clicking overlay (only when modal is visible)
if (portfolioModal) {
  portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal && portfolioModal.style.display === 'flex') {
      closeModal();
    }
  });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// Portfolio select functionality
const filterBtn = document.querySelectorAll('.portfolio [data-filter-btn]');
const selectValue = document.querySelector('.portfolio [data-selecct-value]');

const portfolioSelect = document.querySelector('.portfolio [data-select]');
const portfolioSelectValue = document.querySelector('.portfolio [data-selecct-value]');
const portfolioSelectItems = document.querySelectorAll('.portfolio [data-select-item]');

// Photography select functionality  
const photographySelect = document.querySelector('.photography [data-select]');
const photographySelectValue = document.querySelector('.photography [data-selecct-value]');
const photographySelectItems = document.querySelectorAll('.photography [data-select-item]');

// Portfolio select event
if (portfolioSelect) {
  portfolioSelect.addEventListener("click", function () {
    console.log('Portfolio select clicked');
    elementToggleFunc(this);
  });
}

// Photography select event
if (photographySelect) {
  photographySelect.addEventListener("click", function () {
    console.log('Photography select clicked');
    elementToggleFunc(this);
  });
}

// Portfolio select items
if (portfolioSelectItems.length > 0) {
  for (let i = 0; i < portfolioSelectItems.length; i++) {
    portfolioSelectItems[i].addEventListener("click", function () {
      console.log('Portfolio select item clicked:', this.innerText);
      let selectedValue = this.innerText.toLowerCase();
      portfolioSelectValue.innerText = this.innerText;
      elementToggleFunc(portfolioSelect);
      filterFunc(selectedValue); // Your existing filter function
    });
  }
}

// Photography pagination variables (move outside DOMContentLoaded)
let currentPage = 1;
let activeFilter = 'all';
let searchTerm = '';
const itemsPerPage = 6;

// Photography elements (will be assigned in DOMContentLoaded)
let projectItems, pageInfo, prevButton, nextButton, firstButton, lastButton, filterButtons, filterItems, searchBar;

// Photography pagination functions (move outside DOMContentLoaded)
function getFilteredItems() {
  if (!filterItems) return [];
  return Array.from(filterItems).filter(item => {
    const matchesFilter = activeFilter === 'all' || item.dataset.category === activeFilter;
    const matchesSearch = item.querySelector('.project-title').textContent.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });
}

function displayPage(page, filteredItems) {
  if (!projectItems || !pageInfo || !prevButton || !nextButton) return;
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  // Hide all items first
  projectItems.forEach(item => item.style.display = 'none');

  // Show only the items for the current page
  filteredItems.slice(startIndex, endIndex).forEach((item, index) => {
    item.style.display = 'block';
  });

  pageInfo.textContent = `Page ${page} of ${Math.ceil(filteredItems.length / itemsPerPage)}`;
  prevButton.disabled = (page === 1);
  nextButton.disabled = (page === Math.ceil(filteredItems.length / itemsPerPage));
  firstButton.disabled = (page === 1);
  lastButton.disabled = (page === Math.ceil(filteredItems.length / itemsPerPage));
}

function updatePagination() {
  const filteredItems = getFilteredItems();
  displayPage(currentPage, filteredItems);
}

// Photography select items
if (photographySelectItems.length > 0) {
  for (let i = 0; i < photographySelectItems.length; i++) {
    photographySelectItems[i].addEventListener("click", function () {
      console.log('Photography select item clicked:', this.innerText);
      let selectedValue = this.innerText.toLowerCase();
      photographySelectValue.innerText = this.innerText;
      elementToggleFunc(photographySelect);
      
      // Update the photography filter
      activeFilter = selectedValue;
      currentPage = 1;
      updatePagination();
    });
  }
}


// filter variables (Portfolio only)
const portfolioFilterItems = document.querySelectorAll('.portfolio [data-filter-item]');

const filterFunc = function (selectedValue) {

  for (let i = 0; i < portfolioFilterItems.length; i++) {

    if (selectedValue === "all") {
      portfolioFilterItems[i].classList.add("active");
    } else if (selectedValue === portfolioFilterItems[i].dataset.category) {
      portfolioFilterItems[i].classList.add("active");
    } else {
      portfolioFilterItems[i].classList.remove("active");
    }

  }

}


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Photography pagination
document.addEventListener("DOMContentLoaded", function() {
  const photographySection = document.querySelector('[data-page="photography"]');
  const projectList        = photographySection.querySelector('.project-list');
  
  // Generate project items dynamically
  projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('project-item', 'active');
    projectItem.setAttribute('data-filter-item', '');
    projectItem.setAttribute('data-category', project.category);

    projectItem.innerHTML = `
      <a href="${project.link}" target="_blank">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="${project.icon}"></ion-icon>
          </div>
          <img src="${project.imgSrc}" alt="${project.imgAlt}" loading="lazy">
        </figure>
        <h3 class="project-title"><i>${project.title}</i></h3>
        <p class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
      </a>
    `;

    projectList.appendChild(projectItem);
  });
  
  // Assign DOM elements to global variables
  projectItems = photographySection.querySelectorAll('.project-item');
  pageInfo = photographySection.querySelector('.page-info');
  prevButton = photographySection.querySelector('.prev-page');
  nextButton = photographySection.querySelector('.next-page');
  firstButton = photographySection.querySelector('.first-page');
  lastButton = photographySection.querySelector('.last-page');
  filterButtons = photographySection.querySelectorAll('[data-filter-btn]');
  filterItems = photographySection.querySelectorAll("[data-filter-item]");
  searchBar = document.getElementById('search-bar');

  // Event listeners
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextButton.addEventListener('click', () => {
    const filteredItems = getFilteredItems();
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      currentPage++;
      updatePagination();
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.textContent.trim().toLowerCase();
      currentPage = 1; // Reset to the first page when filter changes
      updatePagination();
    });
  });

  firstButton.addEventListener('click', () => {
    currentPage = 1;
    updatePagination();
  });
  
  lastButton.addEventListener('click', () => {
    const filteredItems = getFilteredItems();
    currentPage = Math.ceil(filteredItems.length / itemsPerPage);
    updatePagination();
  });

  searchBar.addEventListener('input', () => {
    searchTerm = searchBar.value.toLowerCase();
    currentPage = 1; // Reset to the first page when search term changes
    updatePagination();
  });

  // Initialize with the default filter
  updatePagination();
});

// Photo form handling
const addPhotoBtn = document.getElementById('add-photo-btn');
const photoModal = document.getElementById('add-photo-modal');
const closePhotoModalBtn = document.getElementById('close-photo-modal');
const cancelPhotoBtn = document.getElementById('cancel-photo');
const photoForm = document.getElementById('add-photo-form');
const photoModalContent = document.querySelector('.photo-modal-content');
const photoImageInput = document.getElementById('photo-image');

// Show photo modal when + button is clicked
if (addPhotoBtn) {
  addPhotoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (photoModal) {
      photoModal.style.display = 'flex';
    }
  });
}

// Close photo modal function
function closePhotoModal() {
  if (photoModal) {
    photoModal.style.display = 'none';
    photoForm?.reset();
  }
}

// Close photo modal buttons
if (closePhotoModalBtn) closePhotoModalBtn.addEventListener('click', closePhotoModal);
if (cancelPhotoBtn) cancelPhotoBtn.addEventListener('click', closePhotoModal);

// Prevent photo modal content clicks from closing modal
if (photoModalContent) {
  photoModalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Close photo modal when clicking overlay
if (photoModal) {
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal && photoModal.style.display === 'flex') {
      closePhotoModal();
    }
  });
}

// Define the mapping from category to icon (no input field needed)
const categoryIconMap = {
  'bugs': 'bug-outline',
  'flora': 'rose-outline', 
  'birds': 'egg-outline',
  'funga': 'skull-outline'
};

// Handle photo form submission
if (photoForm) {
  photoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const title = document.getElementById('photo-title').value;
    const category = document.getElementById('photo-category').value;
    const link = document.getElementById('photo-link').value;
    const image = photoImageInput.files[0];
    const alt = document.getElementById('photo-alt').value;
    
    // Automatically determine icon based on category
    const icon = categoryIconMap[category] || '';
    
    // Create photo object matching your photo-items.js structure
    const newPhoto = {
      title: title,
      category: category,
      imgSrc: `./assets/images/photography/${image.name}`, // You'll need to upload this to Firebase Storage
      imgAlt: alt,
      link: link,
      icon: icon
    };
    
    // Here you would:
    // 1. Upload the image to Firebase Storage
    // 2. Add the photo data to Firestore
    // 3. Update the projects array or refresh the page
    
    console.log('New photo data:', newPhoto);
    alert('Photo would be added! (Firebase integration needed)');
    closePhotoModal();
  });
}

