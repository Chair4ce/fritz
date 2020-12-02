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
public class Metric {
  @Id
  @GeneratedValue
  private Long id;

  private String uid;

  private String action;

  private Long startTime;

  private Long endTime;

  private Long count;

  public Metric(String uid, String action, Long startTime, Long endTime, Long count) {
    this.uid = uid;
    this.action = action;
    this.startTime = startTime;
    this.endTime = endTime;
    this.count = count;
  }

  public Metric update(MetricJSON json) {
    this.setId(json.getId());
    this.setUid(json.getUid());
    this.setAction(json.getAction());
    this.setStartTime(json.getStartTime());
    this.setEndTime(json.getEndTime());
    this.setCount(json.getCount());
    return this;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }

  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }

  public Long getStartTime() {
    return startTime;
  }

  public void setStartTime(Long startTime) {
    this.startTime = startTime;
  }

  public Long getEndTime() {
    return endTime;
  }

  public void setEndTime(Long endTime) {
    this.endTime = endTime;
  }

  public Long getCount() {
    return count;
  }

  public void setCount(Long count) {
    this.count = count;
  }
}
