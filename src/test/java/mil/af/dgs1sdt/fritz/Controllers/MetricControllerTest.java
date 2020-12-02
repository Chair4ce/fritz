package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import mil.af.dgs1sdt.fritz.Metrics.Metric;
import mil.af.dgs1sdt.fritz.Metrics.MetricController;
import mil.af.dgs1sdt.fritz.Metrics.MetricRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class MetricControllerTest extends BaseIntegrationTest {

  @Autowired MetricRepository metricRepository;

  @Test
  public void metricTest() {

    metricRepository.save(new Metric("e2352352352", "Upload", 23525323L, null, null));

    given()
      .port(port)
      .when()
      .get(MetricController.URI)
      .then()
      .statusCode(200)
      .body("[0].action", equalTo("Upload"));

  }
}
