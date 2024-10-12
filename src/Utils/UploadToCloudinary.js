export const uploadToCloudinary = async (pics,fileType) => {
    // if (pics) {
      
    //   const data = new FormData();
    //   data.append("file", pics);
    //   data.append("upload_preset", "instagram");
    //   data.append("cloud_name", "dnbw04gbs");
  
    //   const res = await fetch(`https://api.cloudinary.com/v1_1/dnbw04gbs/${fileType}/upload`, {
    //     method: "post",
    //     body: data,
    //   })
        
    //     const fileData=await res.json();
    //     console.log("url : ", fileData.url.toString());
    //     return fileData.url.toString();
  
    // } else {
    //   console.log("error");
    // }
    // if (pics) {
    //   try {
    //     // Simulate saving the file locally by generating a local file URL
    //     const filePath = URL.createObjectURL(pics);
  
    //     console.log("File Path:", filePath);
    //     return filePath;
  
    //   } catch (error) {
    //     console.error("Error handling file:", error);
    //   }
    // } else {
    //   console.log("No file selected");
    // }
    if (pics) {
      try {
          const data = new FormData();
          data.append("file", pics);
          
          const res = await fetch('http://localhost:5000/upload', {
              method: "POST",
              body: data,
          });

          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          
          const fileData = await res.json();
          console.log("File Path:", fileData.filePath);
          return fileData.filePath;

      } catch (error) {
          console.error("Error uploading file:", error);
      }
  } else {
      console.log("No file selected");
  }

  };