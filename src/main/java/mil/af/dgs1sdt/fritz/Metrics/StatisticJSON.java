package mil.af.dgs1sdt.fritz.Metrics;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class StatisticJSON {

  private String uid;
  private Long timesUsed;

  public StatisticJSON(String uid, Long timesUsed) {
    this.uid = uid;
    this.timesUsed = timesUsed;
  }

  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }

  public Long getTimesUsed() {
    return timesUsed;
  }

  public void setTimesUsed(Long timesUsed) {
    this.timesUsed = timesUsed;
  }
}
