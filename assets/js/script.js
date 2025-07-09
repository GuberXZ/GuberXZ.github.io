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
const githubLoginBtn = document.getElementById('github-login-btn');

// Auth state management
let isAuthenticated = false;
const adminUserIDs  = ['37782057'];
let isAdmin       = false;

// Function to update button and admin elements based on auth state
function updateAuthButton(user) {
  if (user) {
    // User is signed in
    isAuthenticated = true;
    isAdmin = adminUserIDs.includes(user.uid); 
    githubLoginBtn.textContent = 'Logout';
    githubLoginBtn.style.backgroundColor = 'var(--vegas-gold)';
    githubLoginBtn.style.color = 'var(--white-1)';
    
    if (isAdmin) {
      // User is an admin
      console.log('UID:', user.uid);
      showAdminElements();
    }

  } else {
    // User is signed out
    isAuthenticated = false;
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
    element.style.display = 'block';
  });
  
  // Example: Show "Add Project" button in photography section
  const addProjectBtn = document.getElementById('add-project-btn');
  if (addProjectBtn) {
    addProjectBtn.style.display = 'block';
  }
}

// Function to hide admin-only elements
function hideAdminElements() {
  // Hide admin buttons/forms
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(element => {
    element.style.display = 'none';
  });
  
  // Example: Hide "Add Project" button in photography section
  const addProjectBtn = document.getElementById('add-project-btn');
  if (addProjectBtn) {
    addProjectBtn.style.display = 'none';
  }
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



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  console.log('Select element clicked');
  elementToggleFunc(this); 
});

// add event in all select items
if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      console.log('Select item clicked:', this.innerText);
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
} else {
  console.error('Select items not found');
}


// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
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
  
  let currentPage = 1;
  const itemsPerPage = 6;
  const projectItems       = photographySection.querySelectorAll('.project-item');
  const pageInfo           = photographySection.querySelector('.page-info');
  const prevButton         = photographySection.querySelector('.prev-page');
  const nextButton         = photographySection.querySelector('.next-page');
  const firstButton        = photographySection.querySelector('.first-page');
  const lastButton         = photographySection.querySelector('.last-page');
  const filterButtons      = photographySection.querySelectorAll('[data-filter-btn]');
  const filterItems        = photographySection.querySelectorAll("[data-filter-item]");
  const searchBar          = document.getElementById('search-bar');
  let activeFilter         = 'all';  // Track the currently active filter
  let searchTerm           = ''; // Track the current search term

  


  function getFilteredItems() {
    return Array.from(filterItems).filter(item => {
      const matchesFilter = activeFilter === 'all' || item.dataset.category === activeFilter;
      const matchesSearch = item.querySelector('.project-title').textContent.toLowerCase().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  }

  function displayPage(page, filteredItems) {
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

