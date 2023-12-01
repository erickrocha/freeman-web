import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageUpload.scss';
import { IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const INPUT_UPLOAD = 'input-upload';

const ImageUpload = props => {
  const image64 = props.base64Image ? props.base64Image : '/images/avatars/avatar.png';
  const [error, setError] = useState();

  const checkMimeType = fileType => {
    const selectedType = fileType.substring(fileType.indexOf('/') + 1, fileType.length);
    let ok = false;
    props.mimeType.forEach(value => {
      if (selectedType.includes(value.trim())) {
        ok = true;
      }
    });
    return ok;
  };

  const checkMaxSize = fileSize => {
    return fileSize <= props.maxSize;
  };

  const readFile = file => {
    const reader = new FileReader();
    reader.onloadend = () => {     
      props.setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = event => {
    const files = event.target.files;
    const file = files[0];
    const mimeTypeOK = checkMimeType(file.type);
    if (!mimeTypeOK) {
      setError(`File type not supported ${file.Type}`);
    }
    const fileSizeOk = checkMaxSize(file.size);
    if (!fileSizeOk) {
      setError(`File size ${file.size / 1024}KB is higher than ${props.maxSize / 1024}KB`);
    }
    if (mimeTypeOK && fileSizeOk) {
      readFile(file);
    }
  };

  const onLoadFile = event => {
    event.preventDefault();
    const element = document.getElementById(INPUT_UPLOAD);
    element.click();
  };

  return (
    <div className="ImageUpload">
      <div className="Image-box">
        <img src={image64} alt="Avatar" className="Avatar" />
      </div>
      <div className="Buttons-box">        
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={e => onLoadFile(e)}>
          <PhotoCamera />
        </IconButton>
        <input className="upload-hidden" id={INPUT_UPLOAD} type="file" onChange={e => onFileChange(e)} />
      </div>
      {error ? <div className="hasError">{error}</div> : null}
    </div>
  );
};

ImageUpload.prototypes = {
  mimeType: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  base64Image: PropTypes.string,
  setImage: PropTypes.func
};

export default ImageUpload;
