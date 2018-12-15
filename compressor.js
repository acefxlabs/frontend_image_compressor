let imgx = document.getElementById('imgx');

imgx.addEventListener('change', (event) => {
    // console.log(event.target);
    compress(event)
})

compress = (e) => {
    const width = 500;
    // const height = 300;
    const fileName = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
                const elem = document.createElement('canvas');
                let showbox = document.getElementById('show');

                //This is optional but juet to check if image loaded
                //You can use this to diplay the image in the box showing the image
                showbox.innerHTML = '';
                showbox.appendChild(elem);
                //-------------------------------------------

                const scaleFactor = width / img.width;

                elem.width = width;
                elem.height = img.height * scaleFactor;
                const ctx = elem.getContext('2d');
                // img.width and img.height will give the original dimensions
                ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                ctx.canvas.toBlob((blob) => {
                    const file = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });

                    //Send Image to Server at this Point
                    console.log(elem.toDataURL()); //
                    // elem.toDataURL() is the base64 data and is always in PNG

                    //End Function to Send Image

                }, 'image/jpeg', 1);


            },
            reader.onerror = error => console.log(error);
    };
}
