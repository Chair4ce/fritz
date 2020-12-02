package mil.af.dgs1sdt.fritz;

import org.junit.Test;

import java.io.File;

public class TimedRoombaTest {

  @Test
  public void TimedRoombaTest() throws Exception {
    //Make sure there are no files from old test
    File working = new File("/tmp/working/");
    File complete = new File("/tmp/complete/");
    TimedRoomba.deleteDir(working);
    TimedRoomba.deleteDir(complete);

    //Directory with two old images--delete
    File dir1 = new File("/tmp/complete/test1");
    File oldImage1 = new File("/tmp/complete/test1/test1.jpg");
    File oldImage2 = new File("/tmp/complete/test1/test2.jpg");

    //Empty old directory--delete
    File oldDir1 = new File("/tmp/complete/test2");

    //Old directory with one new image--do not delete
    File oldDir2 = new File("/tmp/complete/test3");
    File newImage2 = new File("/tmp/complete/test3/test3.jpg");

    dir1.mkdirs();
    oldDir1.mkdirs();
    oldDir2.mkdirs();
    oldImage1.createNewFile();
    oldImage2.createNewFile();
    newImage2.createNewFile();

    //Directory with one old and one new image--do not delete
    File dir2 = new File("/tmp/working/test4");
    File newImage3 = new File("/tmp/working/test4/test4.jpg");
    File oldImage3 = new File("/tmp/working/test4/test5.jpg");

    //Empty new directory--do not delete
    File dir3 = new File("/tmp/working/test5");

    //Directory with one old image--delete
    File dir4 = new File("/tmp/working/test6");
    File oldImage4 = new File("/tmp/working/test6/test6.jpg");

    dir2.mkdirs();
    dir3.mkdirs();
    dir4.mkdirs();
    newImage3.createNewFile();
    oldImage3.createNewFile();
    oldImage4.createNewFile();

    oldImage1.setLastModified(1572566400000L); //1 Nov 2019
    oldImage2.setLastModified(1572556400000L); //before 1 Nov 2019
    oldDir1.setLastModified(1572566400000L); //1 Nov 2019
    oldDir2.setLastModified(1572466400000L); //before 1 Nov 2019
    oldImage3.setLastModified(1572566400000L); //before 1 Nov 2019
    oldImage4.setLastModified(1572566300000L); //before 1 Nov 2019


    File completeDir = new File("/tmp/complete/");
    File workingDir = new File("/tmp/working/");

    assert(completeDir.list().length == 3);
    assert(workingDir.list().length == 3);

    TimedRoomba.timedClean();

    assert(completeDir.list().length == 1);
    assert(workingDir.list().length == 2);

  }
}
