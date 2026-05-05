import { menuData } from './menuData.js';

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('categoryList');
  const menuContent = document.getElementById('menuContent');

  if (!categoryList || !menuContent) return;

  let activeCategory = menuData[0].category;

  function renderSidebar() {
    categoryList.innerHTML = '';
    menuData.forEach(cat => {
      const li = document.createElement('li');
      li.className = `category-item ${cat.category === activeCategory ? 'active' : ''}`;
      li.textContent = cat.category;
      li.addEventListener('click', () => {
        activeCategory = cat.category;
        renderSidebar();
        renderMenuContent();
        
        // Scroll to top of menu on mobile
        if(window.innerWidth <= 768) {
          document.querySelector('.menu-content').scrollIntoView({ behavior: 'smooth' });
        }
      });
      categoryList.appendChild(li);
    });
  }

  function renderMenuContent() {
    const data = menuData.find(c => c.category === activeCategory);
    if (!data) return;

    let html = `<h2>${data.category}</h2>`;
    
    data.subcategories.forEach(sub => {
      html += `
        <div class="subcategory">
          <h3 class="subcategory-title">${sub.name}</h3>
          ${sub.description ? `<p class="subcategory-desc">${sub.description}</p>` : ''}
          <div class="menu-list">
      `;
      
      sub.items.forEach(item => {
        html += `
          <div class="menu-list-item">
            <div class="item-info">
              <span class="item-id">${item.id}</span>
              <span class="item-name">${item.name}</span>
            </div>
            <div class="item-dots"></div>
            <div class="item-price">AED ${item.price}</div>
          </div>
        `;
      });
      
      html += `</div></div>`;
    });

    menuContent.innerHTML = html;
  }

  renderSidebar();
  renderMenuContent();
});
