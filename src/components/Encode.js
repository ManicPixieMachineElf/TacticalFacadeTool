import React, { useState } from 'react';
import { Upload } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { Tooltip } from 'antd';
import { Image as Img } from 'antd';
import steg from "./steganography"
import "./Steg.css";

const { TextArea } = Input;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};


const Encode = () => {
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState(undefined);
  const [encodedImgUrl, setEncodedImgUrl] = useState(undefined);
  const [message, setMessage] = useState('');
  const [encoding, setEncoding] = useState(false);


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



  const onClear = (e) => {
    e.preventDefault();
    console.log('Clear');

    setImgUrl(null);
    setEncodedImgUrl(null);
    setMessage(null);
   


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

        <div className='main2' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}  >
          <div className="input-data" style={{ display: "flex", flexDirection: "column"}}>
            <Tooltip title="Enter text to encode!">
              <TextArea
                placeholder="Enter message to encode"
                className='inputText'
                maxLength={1000}
                allowClear
                showCount
                rows={5}
    
                onChange={handleMessageChange}
                value={message}


              />
            </Tooltip>
            <div>

                  <Button type="primary" className="encode-button" onClick={onEncode} loading={encoding}>Encode</Button>
                  <Button type="primary" className="clear-button" onClick={onClear}>Clear</Button>

                  </div>
              <Card className="upload">
              <Upload

                customRequest={dummyRequest}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                maxCount={1}
              >
                {fileList.length < 5 && '+ Upload'}
              </Upload>

            </Card >
          </div>


          <div className='output-data'>
            <div className='cards'>
             
              <Tooltip title="Stego Image" className='stegoImage'>
                <Card
                  hoverable
                  style={{ width: "360px", height: "262.5px", marginLeft: "5%", border: "solid 2px black" }}
                  cover={
                    <Img
                      alt="Stego Image"
                      src={encodedImgUrl ? encodedImgUrl : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"}
                      style={{ width: "360px", height: "259px", objectFit: "contain", marginTop: "1px" }}


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
export default Encode;