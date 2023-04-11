import React from 'react';
import ImageUploading from 'react-images-uploading';
import Button from './ui/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export function ImageUploader({ onChange } : { onChange : Function}) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const handleChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    if (imageList.length > 0) {
      console.log(imageList[0], addUpdateIndex);
      onChange(imageList[0]);
    }
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={handleChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              type='button'
              className='w-full border-dashed border-2 border-slate-500 flex items-center justify-center h-40 text-slate-600 dark:text-slate-500'
            >
              {imageList.length === 0 && 'Click or Drop here'}
            { imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" className='max-h-60 max-w-[200px]'  />
                {/* <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div> */}
              </div>
            ))}
            </button>
            <div className="text-center my-1">
              {imageList.length > 0 && 
                <Button className='p-[4px] text-red-500 dark:text-red-500' size='md' variant='ghost' onClick={onImageRemoveAll}>
                    <XMarkIcon className='w-5 h-5'/>
                    Remove Image
                </Button>
              }
            </div>

          </div>
        )}
      </ImageUploading>
    </div>
  );
}