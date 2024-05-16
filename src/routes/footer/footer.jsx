import "./footer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGem, faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
   return (
   <div className="footer">
      <section className='social-media'>
        <div className='social-media__text'>
          Get connected with us on social networks:
        </div>
        <div className='social-icons'>
          <a href='https://facebook.com' className='social-icon'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href='https://twitter.com' className='social-icon'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href='https://google.com' className='social-icon'>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href='https://instagram.com' className='social-icon'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href='https://linkedin.com' className='social-icon'>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href='https://github.com' className='social-icon'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </section>

      <section className='footer-content'>
        <div className='footer-content__item'>
          <h6 className='footer-content__title'>
            <FontAwesomeIcon icon={faGem} className="me-3" />
            Company name
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
          </p>
        </div>

        <div className='footer-content__item'>
          <h6 className='footer-content__title'>Products</h6>
          <p><a href='#!' className='text-reset'>Angular</a></p>
          <p><a href='#!' className='text-reset'>React</a></p>
          <p><a href='#!' className='text-reset'>Vue</a></p>
          <p><a href='#!' className='text-reset'>Laravel</a></p>
        </div>

        <div className='footer-content__item'>
          <h6 className='footer-content__title'>Useful links</h6>
          <p><a href='#!' className='text-reset'>Pricing</a></p>
          <p><a href='#!' className='text-reset'>Settings</a></p>
          <p><a href='#!' className='text-reset'>Orders</a></p>
          <p><a href='#!' className='text-reset'>Help</a></p>
        </div>

        <div className='footer-content__item'>
          <h6 className='footer-content__title'>Contact</h6>
          <p><FontAwesomeIcon icon={faHome} className="me-2" />New York, NY 10012, US</p>
          <p><FontAwesomeIcon icon={faEnvelope} className="me-3" />info@example.com</p>
          <p><FontAwesomeIcon icon={faPhone} className="me-3" />+ 01 234 567 88</p>
          <p><FontAwesomeIcon icon={faPrint} className="me-3" />+ 01 234 567 89</p>
        </div>
      </section>

      <div className='footer-bottom'>
        © 2021 Copyright:
        <a className='fw-bold' href=''>MDBootstrap.com</a>
      </div>
    </div>
  );
};

export default Footer;
