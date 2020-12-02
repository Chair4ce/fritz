package mil.af.dgs1sdt.fritz.Models;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class MissionModel {
  private String id;
  private String callsign;
  private String description;
  private String status;
  private String startTime;
  private String org;
  private String platform;

  public String getStartTime() {
    return startTime;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setStartTime(String startTime) { this.startTime = startTime; }

  public String getCallsign() {
    return callsign;
  }

  public void setCallsign(String callsign) {
    this.callsign = callsign;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getOrg() {
    return org;
  }

  public void setOrg(String org) {
    this.org = org;
  }

  public String getPlatform() { return platform; }

  public void setPlatform(String platform) {
    this.platform = platform;
  }

}
