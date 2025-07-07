
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (<>
    <footer className="footer">
      <div className="footer-top">
        <div className="trust-icons">
          <div className="trust-item">
            <img src="https://cdn-icons-png.flaticon.com/128/18610/18610079.png" alt="Authentic Brands" />
            <p>Authentic Brands</p>
          </div>
          <div className="trust-item">
            <img src="https://cdn-icons-png.flaticon.com/128/8776/8776365.png" alt="Easy Returns" />
            <p>Easy Returns</p>
          </div>
          <div className="trust-item">
            <img src="https://cdn-icons-png.flaticon.com/128/11338/11338395.png" alt="Easy Payments" />
            <p>Easy Payments</p>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-column">
          <h5>Tata MarketPlace</h5>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Affiliates</li>
            <li>Sitemap</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Customer Service</h5>
          <ul>
            <li>Shopping</li>
            <li>Offers & Promotions</li>
            <li>Payments</li>
            <li>Cancellation</li>
            <li>Returns & Refunds</li>
            <li>CliQ And PiQ</li>
            <li>Returns Policy</li>
            <li>Electronics Return Policy</li>
            <li>Contact Us</li>
            <li>Reviews Guidelines</li>
            <li>Furniture Return Policy</li>
            <li>Replacement Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>My Tata CLiQ</h5>
          <ul>
            <li>My Account</li>
            <li>My Orders</li>
            <li>My Shopping Bag</li>
            <li>My Wishlist</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Tata CLiQ Offerings</h5>
          <div className="footer-tags">
            {[
              "Watches for Men", "Campus Shoes", "Sandals for Men", "Sneakers for Men", "Reebok Shoes",
              "Cotton Kurtis", "Woodland Shoes", "Jumpsuits", "Allen Solly", "Sparx Shoes", "Gold Rings",
              "Formal Shoes for Men", "Sports Shoes for Men", "Wallets for Men", "Ladies Watches",
              "Trolley Bags", "Handbags for Women", "Sling Bags for Women", "Casual Shoes for Men",
              "Boots for Men", "Digital Watches", "Sonata Watches", "Sneakers for Women", "Running Shoes",
              "Puma Shoes", "Boots for Women", "Skechers", "Malabargold", "Fabindia", "Utsa", "Vark", "Gia", "LOV",
              "Sitemap"
            ].map((item, idx) => (
              <span key={idx} className="footer-tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
   
<div className="footer-bottom">
  <div className="footer-bottom-left">
    <span>Download App</span>
    <img src="https://cdn-icons-png.flaticon.com/128/888/888857.png" alt="Android" />
    <img src="https://cdn-icons-png.flaticon.com/128/888/888841.png" alt="Apple" />
  </div>

  <div className="footer-bottom-center">
    <a href="Facebook"><img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" alt="Facebook" /></a>
    <a href="X"><img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" alt="X" /></a>
    <a href="Instagram"><img src="https://cdn-icons-png.flaticon.com/128/174/174855.png" alt="Instagram" /></a>
    <a href="youTube"><img src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png" alt="YouTube" /></a>
    <a href="linkedIn"><img src="https://cdn-icons-png.flaticon.com/128/174/174857.png" alt="LinkedIn" /></a>
  </div>

  <div className="footer-bottom-right">
    <span>© 2025 Tata CLiQ | All rights reserved</span>
  </div>
</div>





<div className="footer-info-section">
        <h6>Tata CLiQ FASHION: Shop Online with India's most trusted destination</h6>
        <p>
          Genuine products from all the top brands get delivered right to your doorstep. Our sleek, immersive design allows you to easily navigate between categories and brand stores so that you can find a wide selection of <a href="womenswear">womenswear</a>, <a href="menswear">menswear</a>, <a href="kidswear">kidswear</a>, <a href="footwear">footwear</a>, <a href="watches">watches</a>, <a href="Apparel">Apparel</a>, online.You can also check our great offers and get the best prices on various products across lifestyle,fashion, and more.
        </p>

        <h6>Online Shopping: Fast & convenient with the click of a button</h6>

        <p>
          The upside of online shopping at Tata CLiQ FASHION online store is that you'll save on time and most importantly money with Tata CLiQ FASHION offers. It's as simple as comparing products and prices online before making the right buy. What's more, you also have the option to pay for your favourite brands and products using our easy EMI options. Of course, you can buy and try – in the convenience of your home. Returns are easy too: We'll pick up your returns for free or you can also drop off the goods at the nearest brand store.
        </p>

        <h6>Tata CLiQ FASHION Shopping App: just a few clicks on Android & iOS</h6>
        <p>
          Download the Android app from the <a href="playstore">Play Store</a> or the iOS app from <a href="/">Apple App Store</a> and get set to enjoy a range of benefits.Apart from the best deals,amazing offers and the latest styles online,the app also gives you the flexibility to shop at your convenience.use the easy share options to share your shopping with your friends and family to ensure you're buying something perfect.With constant updates and a host of new features being introduced constantly,enjoy a shopping experience that you'll love
        </p>

        <h6>Tata CLiQ FASHION: The most genuine place for Fashion and Lifestyle</h6>
        <p>
          With an exclusive Brand Store for <a href="/">Westside Online</a> we have most of your trendy shopping needs taken care of.Make Tata CliQ FASHION your online shopping destination and get the best deals on your favourite brands 'with 100% genuine products .Be it jewellery or makeup ,you can count on Tata CLiQ FASHION For receiving only the most authentic products.
        </p>
      </div>
      </footer>
    </>
  );
};

export default Footer;













