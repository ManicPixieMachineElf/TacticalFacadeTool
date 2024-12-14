import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Card } from 'antd';
import { Button, Space } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import { Tooltip } from 'antd';
import { Image as Img } from 'antd';
import steg from "./steganography";
import "./Steg.css";
const { Title } = Typography;
const { TextArea } = Input;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};


const Decode = () => {
  const [showText, setShowText] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState(undefined);
  const [encodedImgUrl, setEncodedImgUrl] = useState(undefined);
  const [message, setMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');
  const [encoding, setEncoding] = useState(false);
  const [decoding, setDecoding] = useState(false);

  const handleMessageChange = event => {

    setMessage(event.target.value);
  };



  const onEncode = async (e) => {
    
   
    setEncoding(true);
    let src = null;
    try {
      src = steg.encode(message, imgUrl);
      setEncodedImgUrl(src);
      console.log("Done!!");
    } catch (error) {
      console.log("Error Encoding Img", error);

    }

    setEncoding(false);
  }

  const onDecode = (e) => {
    e.preventDefault();
    console.log('Decode');
    setDecoding(true);
    setShowText(true);
    let msg = steg.decode(imgUrl);
    setDecodedMessage(msg);
    setDecoding(false);
    console.log(msg);
  }

  const onClear = (e) => {
    e.preventDefault();
    console.log('Clear');

    setImgUrl(null);
    setEncodedImgUrl(null);
    setMessage(null);
    setDecodedMessage('')


  }



  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);

    const file = newFileList[0];
    let src = null;
    if (file) {
      src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
    }
    setImgUrl(src);
    setEncodedImgUrl(null);
    setDecodedMessage('')

  };



  const onPreview = async (file) => {

    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;

    const imgWindow = window.open(src, "Preview");
    imgWindow.document.title = "Preview";
    imgWindow?.document.write(image.outerHTML);
  };



  return (
   
    <div className="steg-body">
       <div className="body2">
      <div className='App'>

        <div className='main' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}  >
          <div className="input-data" style={{ display: "flex", flexDirection: "column" }}>
          {showText && <div className="decoded-message-wrapper"><h1 className="your-decoded-message-is">Your decrypted message says...</h1><Tooltip title="Decoded Message">
              <TextArea
                className='decodedText'
                maxLength={1000}
                allowClear
                rows={5}
            
                value={decodedMessage} />
            </Tooltip><Button type="primary" className="clearButton" onClick={onClear}>Clear</Button></div>
}
                <Space className="option-button-wrap" wrap align='center' >

                 <div>
                 <h1 className="reveal-message">Reveal Hidden Message--> </h1> <Button type="primary" className="decode-button" onClick={onDecode} loading={decoding}><h1 className="h1-decode">Decrypt</h1></Button></div>
                
                </Space>

          <Card className="upload-decode">
              <Upload
                className="upload-decode-wrap"
                customRequest={dummyRequest}
              
                onChange={onChange}
                onPreview={onPreview}
                maxCount={1}
              >
                {fileList.length < 5 && <button className="upload-button"><h2 className="plus">+</h2></button>}
                <h2 className="your-encrypted-image-text">Click the plus icon to upload your encrypted image</h2>
              </Upload>

            </Card >
          </div>


          <div className='output-data'>
            <div className='decode-card' >
              <Tooltip title="Original Image">
                <Card
                  hoverable
                  style={{ width: "360px", height: "270px", marginLeft: "5%", border: "solid 2px black" }}
                  cover={
                    <Img
                      alt="Original Image"
                      src={imgUrl ? imgUrl : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"}
                      style={{ width: "360px", height: "270px", objectFit: "contain", marginTop: "1px" }}


                    />
                  }

                >

                </Card>
              </Tooltip>
             
            </div>
           
          </div>

        </div>
      </div >
    </div>
    </div>
  );
};
export default Decode;