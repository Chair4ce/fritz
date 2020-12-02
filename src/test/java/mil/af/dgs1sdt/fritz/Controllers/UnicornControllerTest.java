package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import org.junit.Test;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@ActiveProfiles("test")
public class UnicornControllerTest extends BaseIntegrationTest {

  @Test
  public void targets() {
    given()
      .port(port)
      .when()
      .get(UnicornController.URI + "/targets/stubmission")
      .then()
      .statusCode(200)
      .body("size", equalTo(3))
      .body("[0].activity", equalTo("act1"))
      .body("[0].tot", equalTo(1556542860))
      .body("[1].tot", equalTo(1556542920));
  }
}