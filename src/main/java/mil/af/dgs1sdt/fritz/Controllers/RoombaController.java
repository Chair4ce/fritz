package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Models.TrackingModel;
import mil.af.dgs1sdt.fritz.Stores.TrackingStore;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping(RoombaController.URI)
public class RoombaController {

  public static final String URI = "/api/roomba";

  @ResponseBody
  @PostMapping
  public void clean(@CookieValue("id") String hash) throws IOException {

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> hash.equals(tm.getHash()))
      .findAny()
      .orElse(null);

    if (tracking != null)
      TrackingStore.removeFromList(tracking);

    String workingDir = "/tmp/working/" + hash;
    File workingDirToBeRoombaed = new File(workingDir);

    String completeDir = "/tmp/complete/" + hash;
    File completedDirToBeDeleted = new File(completeDir);

    if (workingDirToBeRoombaed.exists()) {
      FileUtils.deleteDirectory(workingDirToBeRoombaed);
    }

    if (completedDirToBeDeleted.exists()) {
      FileUtils.deleteDirectory(completedDirToBeDeleted);
    }
  }
}
