package mil.af.dgs1sdt.fritz.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CalloutModel implements Comparable<CalloutModel> {
  private String name;
  private String classification;
  private String releasability;
  private String activity;
  private String eventId;
  private Long tot;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getClassification() {
    return classification;
  }

  public void setClassification(String classification) {
    this.classification = classification;
  }

  public String getReleasability() {
    return releasability;
  }

  public void setReleasability(String releasability) {
    this.releasability = releasability;
  }

  public String getActivity() {
    return activity;
  }

  public void setActivity(String activity) {
    this.activity = activity;
  }

  public String getEventId() {
    return eventId;
  }

  public void setEventId(String eventId) {
    this.eventId = eventId;
  }

  public Long getTot() { return tot; }

  public void setTot(Long tot) { this.tot = tot; }

  @Override
  public int compareTo(CalloutModel c) {
    return getTot().compareTo(c.getTot());
  }
}

