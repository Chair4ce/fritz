package mil.af.dgs1sdt.fritz.Metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Statistic {
  @Id
  @GeneratedValue
  private Long id;

  private String uid;
  private Long timesUsed;

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
