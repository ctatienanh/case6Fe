function luufile() {
  let filename = document.getElementById("file-input");
  let link=document.getElementById("file")

  if (filename.files[0]!=undefined){
    link.files=filename.files
  }
  if (link.files && link.files[0]){
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
  }
}
