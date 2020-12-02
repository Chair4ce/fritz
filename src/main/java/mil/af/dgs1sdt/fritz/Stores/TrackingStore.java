package mil.af.dgs1sdt.fritz.Stores;

import mil.af.dgs1sdt.fritz.Models.TrackingModel;

import java.util.ArrayList;
import java.util.List;

public class TrackingStore {

  private static List<TrackingModel> trackingList = new ArrayList<>();

  public static void addToList(TrackingModel tm) {
    trackingList.add(tm);
  }

  public static List<TrackingModel> getTrackingList() {
    return trackingList;
  }

  public static void removeFromList(TrackingModel tm) {
    trackingList.remove(tm);
  }

}
