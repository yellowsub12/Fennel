import React from "react";
import "./footer.css";




function Footer() {
  return (
    <div className='header' data-testid="footer">
      <section class="fennel-footer">
        <div id="container">

  <div class="fennel-footer-container">
    <div class="fennel-footer-lists">
      <div class="fennel-row">
        <div class="fennel-col  fennel-col--30">
          <a href="/" class="fennel-footer-logo"><img src="../imgs/Logo.png" alt="fennel Logo" class="fennel-footer-logo-image" /></a>
        </div>
        
        
        
      </div> 
    </div>
    <div class="fennel-sub-footer">
      <div class="fennel-row">
        <div class="fennel-col  fennel-col--50">
          <p class="fennel-footer-text">Copyright © 2022</p>
        </div>
        <div class="fennel-col  fennel-col--50">
          <ul class="fennel-footer-list">
            <a href="#" class="fennel-footer-link">Terms &amp; Conditions&emsp;</a><a href="#" class="fennel-footer-link">Cookies &amp; Internet Advertising&emsp;</a><a href="#" class="fennel-footer-link">Privacy Notice</a>
          </ul>
        </div>
      </div>
    </div>
  </div>    </div>

</section>
         
      </div>
  )
}

export default Footer