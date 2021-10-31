# bashDLalf
Bash and SQL scripts to download all nodes from Alfresco SpacesStore. 

Workflow:
1. Run the sql from [DBeaver community edition](https://dbeaver.io/) and export as text file
2. Clean up the text file by find/replace removing all the | (pipe symbols) etc.
3. The file still contains lines which had the following superfluous filenames (due to version control, which we did not need).  
So, removed the extra lines using the following:  
```
grep -v "/1.0?ticket=" dlist2.txt > dlist3.txt
grep -v "/{http://www.alfresco.org/model/" dlist3.txt > dlist2.txt
grep -v "000Z?ticket=" dlist2.txt > dlist3.txt
```

This reduced the number of files nearly 3x.

Unfortunately, if the destination folder is not a local disk and is a google drive mounted with rclone, the downloads go very very slow. This may be due to directory listings being carried out in the background? Anyway, for such a use case - for moving the files to GDrive - the google apps script is much faster. Maybe 10x faster. One drawback with my script is that the file last modified date is not retained.
