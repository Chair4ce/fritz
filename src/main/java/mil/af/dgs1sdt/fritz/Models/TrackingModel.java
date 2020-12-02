package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@Data
public class TrackingModel {

  private String hash;
  private String status;

  @NonNull
  private int completedSlides = 0;

  @NonNull
  private int totalSlides = 1;

  private Thread thread;

  private List<String> fileList = new ArrayList<>();

  private String[] times;

  private String date;

  private String op;

  private String callsign;

  private String releasability;

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) { this.status = status; }

  @NonNull
  public int getCompletedSlides() {
    return completedSlides;
  }

  @NonNull
  public void setCompletedSlides(int completedSlides) {
    this.completedSlides = completedSlides;
  }

  public int getTotalSlides() {
    return totalSlides;
  }

  public void setTotalSlides(int totalSlides) {
    this.totalSlides = totalSlides;
  }

  public Thread getThread() {
    return thread;
  }

  public void setThread(Thread thread) {
    this.thread = thread;
  }

  public String[] getTimes() { return times; }

  public String getDate() { return date; }

  public void setDate(String value) { this.date = value; }

  public String getOp() { return op; }

  public void setOp(String value) { this.op = value; }

  public String getCallsign() { return callsign; }

  public void setCallsign(String value) { this.callsign = value; }

  public String releasability() { return releasability; }

  public void setReleasability(String value) { this.releasability = value; }

  public void updateFileList(String oldName, String newName) {
    fileList.set(fileList.indexOf(oldName), newName);
  }
}
