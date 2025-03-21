(function addHeartButtonsWithJQuery() {
  if (typeof jQuery !== 'undefined') {
    jQuery('<style>').text(`
      .favorite-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: white;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 99;
        transition: transform 0.2s ease;
      }
      
      .favorite-button:hover {
        transform: scale(1.1);
      }
      
      .favorite-button.active {
        background-color: #fff0f0;
      }
      
      .heart-icon {
        color: #ff6b6b;
      }
    `).appendTo('head');
    
    jQuery('.listagem-item').css('position', 'relative').append(`
      <div class="favorite-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
    `);
    
    jQuery('.favorite-button').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const $button = jQuery(this);
      $button.toggleClass('active');
      const $heartIcon = $button.find('.heart-icon');
      if ($button.hasClass('active')) {
        $heartIcon.attr('fill', '#ff6b6b');
        storeLikedProduct($button.closest('.listagem-item')); // Store the product info
      } else {
        $heartIcon.attr('fill', 'none');
        removeLikedProduct($button.closest('.listagem-item')); // remove product info
      }
    });
  }
}

function storeLikedProduct(productElement) {
  const productName = productElement.find('.nome-produto').text().trim(); // Adjust selector if needed
  const productUrl = productElement.find('a').attr('href'); // Adjust selector if needed

  if (!productName || !productUrl) {
      console.error("Could not find product name or URL");
      return;
  }

  let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
  const productInfo = { name: productName, url: productUrl };

  // Check if the product is already liked
  if (!likedProducts.some(product => product.url === productUrl)) {
    likedProducts.push(productInfo);
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    console.log(`Product "${productName}" liked and stored.`);
  } else {
      console.log(`Product "${productName}" is already liked.`)
  }
}

function removeLikedProduct(productElement) {
  const productUrl = productElement.find('a').attr('href'); // Adjust selector if needed

  if (!productUrl) {
    console.error("Could not find product URL");
    return;
  }

  let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
  likedProducts = likedProducts.filter(product => product.url !== productUrl);
  localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  console.log(`Product with URL "${productUrl}" unliked and removed.`);
}

// Try the jQuery method if it's available (since many Loja Integrada stores use jQuery)
setTimeout(function() {
  if (typeof jQuery !== 'undefined') {
    addHeartButtonsWithJQuery();
  }
}, 1000))();
