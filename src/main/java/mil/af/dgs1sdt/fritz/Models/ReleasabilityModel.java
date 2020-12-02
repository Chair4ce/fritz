package mil.af.dgs1sdt.fritz.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReleasabilityModel {
  private String releasabilityId;
  private String releasabilityName;
  private Long timesClicked;

  public String getReleasabilityId() {
    return releasabilityId;
  }

  public void setReleasabilityId(String releasabilityId) {
    this.releasabilityId = releasabilityId;
  }

  public String getReleasabilityName() {
    return releasabilityName;
  }

  public void setReleasabilityName(String releasabilityName) {
    this.releasabilityName = releasabilityName;
  }

  public Long getTimesClicked() {
    return timesClicked;
  }

  public void setTimesClicked(Long timesClicked) {
    this.timesClicked = timesClicked;
  }
}
