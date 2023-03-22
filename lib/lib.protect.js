const fs = require('fs');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Buat nama folder sesuai dengan bulan saat file diunggah
    const month = new Date().getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const destination = `./public/uploads/image/${monthString}/`;
    
    if (!fs.existsSync(destination)) {
      // Jika folder tidak ada, buat folder baru
      fs.mkdir(destination, (err) => {
        if (err) {
          // Jika terjadi error, tampilkan pesan error
          console.error(err);
        } else {
          // Jika berhasil, tampilkan pesan sukses
          console.log(`Folder ${destination} has been created`);
        }
      });
    } else {
      // Jika folder ada, tampilkan pesan
      console.log(`Folder ${destination} already exists`);
    }
    
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    // Buat nama file unik dengan uuid
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

module.exports = multer({ storage: storage });