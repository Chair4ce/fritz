package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Interfaces.UnicornClient;
import mil.af.dgs1sdt.fritz.Models.CalloutModel;
import mil.af.dgs1sdt.fritz.Models.MissionModel;
import mil.af.dgs1sdt.fritz.Models.ReleasabilityModel;
import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;

public class UnicornServiceTest {
  UnicornClient unicornClient = new StubUnicornClient();
  UnicornService subject = new UnicornService();

  @Test
  public void getMission() throws Exception {
    assertEquals(
      Arrays.asList(
        new MissionModel(
          "id1",
          "callsign1",
          "descr1",
          "status1",
          "startTime1",
          "org1",
          "platform1"
        ),
        new MissionModel(
          "id2",
          "callsign2",
          "descr2",
          "status2",
          "startTime2",
          "org2",
          "platform2"
        ),
        new MissionModel(
          "id3",
          "callsign3",
          "descr3",
          "status3",
          "startTime3",
          "org3",
          "platform3"
        )
      ),
      subject.getMissions(unicornClient.getMissions())
    );
  }

  @Test
  public void getCallouts() throws Exception {
    assertEquals(
      Arrays.asList(
        new CalloutModel(
          "callout1",
          "classified",
          "rel",
          "act1",
          "event1",
          1556542860L
        ),
        new CalloutModel(
          "callout2",
          "classified",
          "rel",
          "act2",
          "event2",
          1556542920L
        ),
        new CalloutModel(
          "callout3",
          "classified",
          "rel",
          "act3",
          "event3",
          1556542980L
        )
      ),
      subject.getCallouts(unicornClient.getCallouts("stubmission"))
    );
  }

  @Test
  public void getReleasabilites() throws Exception {
    assertEquals(
      Arrays.asList(
        new ReleasabilityModel(
          "releasId1",
          "releasName1",
          0L
        ),
        new ReleasabilityModel(
          "releasId2",
          "releasName2",
          0L
        ),
        new ReleasabilityModel(
          "releasId3",
          "releasName3",
          0L
        )
      ),
      subject.getReleasabilities(unicornClient.getReleasabilities())
    );
  }

  @Test
  public void convertsDateStringToUnix() throws Exception {
    assertEquals(
      1556496000L,
      subject.convertDateStringToUnix("2019-04-29 00:00:00.0")
    );
    assertEquals(
      1556542860L,
      subject.convertDateStringToUnix("2019-04-29 13:01:00.0")
    );
  }
}