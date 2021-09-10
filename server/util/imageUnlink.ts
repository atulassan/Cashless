
import fs from 'fs';
export function imageUnlink(imagelink) {
    fs.unlink(imagelink, (err => { 
        if (err) console.log(err); 
        else { 
          console.log("\nDeleted file: "+imagelink); 
        } 
      }));
  }

