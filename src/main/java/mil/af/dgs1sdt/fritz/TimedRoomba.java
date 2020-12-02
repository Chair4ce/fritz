package mil.af.dgs1sdt.fritz;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Date;

@Component
public class TimedRoomba {

  @Scheduled(fixedRate = 86400000) //run once a day
  public static void timedClean() {
    System.out.println("TimedRoomba starting up");
    try {
      cleanDirectory("/tmp/working/");
      cleanDirectory("/tmp/complete/");
    } catch (Exception exception) {
      System.err.println("TimedRoomba error: Unknown error!");
      return;
    }
    System.out.println("TimedRoomba ran successfully!");
  }

  private static void cleanDirectory(String directory) {
    int numDirsDeleted = 0;
    File dir = new File(directory);
    File[] hashDirectories = dir.listFiles();
    if (hashDirectories != null) {
      for (File hashDirectory : hashDirectories) {
        Date mostRecentLastModified = new Date(0);
        //Get most recent last modified date of files in the directory
        File[] files = hashDirectory.listFiles();
        if (files != null && files.length > 0) {
          for (File file : files) { //get date of most recent last modified file
            Date lastModified = new Date(file.lastModified());
            if (lastModified.after(mostRecentLastModified)) {
              mostRecentLastModified = lastModified;
            }
          }
        } else { //Directory empty so get its own last modified
          mostRecentLastModified = new Date(hashDirectory.lastModified());
        }
        Date oneDayAgo = new Date(new Date().getTime() - 86400000L);
        //If most recent file is older than a day, delete
        if (mostRecentLastModified.before(oneDayAgo))
          if (!deleteDir(hashDirectory))
            System.err.println("TimedRoomba error: unsuccessful delete attempt of directory: "
              + directory + hashDirectory.getName());
          else
            numDirsDeleted++;
      }

    System.out.println("Cleaned directory " + directory + " and deleted " + numDirsDeleted + " subdirectories.");
    } else {
      System.out.println("No subdirectories found in " + directory);
    }
  }

  //Recursive directory deleter
  public static boolean deleteDir(File dir) {
    File[] contents = dir.listFiles();
    if (contents != null) {
      for (File file : contents) {
        deleteDir(file);
      }
    }
    return dir.delete();
  }

}
