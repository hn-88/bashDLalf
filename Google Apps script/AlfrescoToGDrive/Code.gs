function alfUpload() {
   
  var startfrom = 0;
  // 276
  //Exception: Converting from jpg to image/jpeg is not supported.
  // This was due to a mime type error for some files on our server.
  
  var sourcefile = DriveApp.getFilesByName('ArchiveXLSs').next();
  var ss=SpreadsheetApp.open(sourcefile);
  var sh=ss.getActiveSheet();
  
  var rg=sh.getDataRange();
  var vA=rg.getValues();

  var currentTicket = 'TICKET_01abcabcabcdfdfec123456';
  var galleryFolderID = '1RPN3_PQRSTUVjkhjgkjgkjgy';
  var galleryFolder = DriveApp.getFolderById(galleryFolderID);

  // we can construct download url as
  // https://www.ourdomain.tld/alfresco/d/direct/workspace/SpacesStore/<node id>/<alfresco filename>?ticket=<currentTicket>
  // this part would vary for different Alfresco implementations, and would depend on whether 
  // such ticket based access is enabled.

  Logger.log('Data length is %s', vA.length);

  for(var i=startfrom;i<vA.length;i++) {

    if(i==0) {
      // ignore the first line with column headers
      continue;
      
    }

    if(vA[i][1].includes('SpacesStore')) {
      // this is not the typical filename etc
      Logger.log('skipping %s',vA[i][1]);
      continue;
      
    }
    
    var imgurl = 'https://www.ourdomain.tld/alfresco/d/direct/archive/SpacesStore/'
    + vA[i][0] + '/'
    + encodeURI(vA[i][1]) + '?ticket='
    + currentTicket;
    
    var name=vA[i][1];               
    
    
    Logger.log('%s.', i);   // id

    if(galleryFolder.getFilesByName(name).hasNext()) {
      // file already exists
      var file = DriveApp.getFilesByName(name).next();
      if (file.getSize() > 0) {
      Logger.log('%s already exists, skipping', name);
      continue;
      }
    }

    // else, copy the file to drive.

    //var mimeType = 'image/jpeg'

    Logger.log('Fetching %s ...', name);
    var image=UrlFetchApp.fetch(imgurl).getBlob().setName(name);
    var folder=DriveApp.getFolderById(galleryFolderID);
    try{
    var file=DriveApp.createFile(image);
    file.moveTo(galleryFolder);
    }
    catch {
      Logger.log('!!Error!! failed to create file for url %s', imgurl)
    }
    
  }
  
}
  
