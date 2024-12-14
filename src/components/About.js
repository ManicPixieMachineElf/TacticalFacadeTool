import React, { Component } from "react";
import './About.css'


export default class About extends Component {

  state = { showing: false };

  render() {
     
      return (
          <div >
          
                   <div className="about-page"><h1 className="title">Your Page Title</h1><p className="intro">
                    Welcome to the Tacticle Facade Tool, a free Steganography web tool which offers a suite of functionalities designed to empower users with advanced encryption techniques.</p>
                    
                    <p className="intro">With the encryption feature, users can seamlessly embed secret messages of their choosing within images, ensuring utmost confidentialtity. To encrypt an image, click on the 'Encode' button, then simply upload an image, write your message, and watch as your messgae becomes encrypted into the pixels of the image. Once encrypted, the image can be saved and shared with confidence. </p>
              
                    <p className="intro">Conversely, the decryption functionality allows users to unviel concealed messages within encrypted images. To decrypt an image, click on the 'Decode' button, then upload an encrypted image, press the 'Decrypt' button, and the secret message that is hidden within the pixels of the image will be revealed on screen.</p></div>

              
          </div> 
      )
  }
}