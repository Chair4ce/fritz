package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;

import java.util.List;

@Data
public class StatusModel {

  private String status = "pending";
  private List<String> files;
  private int progress;
  private int total;
  private Thread thread;
  private String[] times;
  private String date = "";
  private String op = "";
  private String callsign = "";
  private String releasability = "";

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public List<String> getFiles() {
    return files;
  }

  public void setFiles(List<String> files) {
    this.files = files;
  }

  public void setDate(String value) { this.date = value; }

  public void setOp(String value) { this.op = value; }

  public void setCallsign(String value) { this.callsign = value; }

  public void setReleasability(String value) { this.releasability = value; }
}
