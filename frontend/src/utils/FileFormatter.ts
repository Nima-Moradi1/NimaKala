// The Purpose of writing this component is to convert the file url to a FILE object and send it to the server since we want to send the FILE in edit to the server , not the URL

const getFilename = (url:string):string => {
    return url.split("/").pop() || '';
  };
  
  export const imageUrlToFile = async (imgUrl:string) => {  
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], getFilename(imgUrl), {
      type: blob.type,
    });
    return file;
  };
  