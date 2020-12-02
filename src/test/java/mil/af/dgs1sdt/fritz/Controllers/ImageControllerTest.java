package mil.af.dgs1sdt.fritz.Controllers;

import io.restassured.http.Header;
import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import org.junit.Test;
import org.springframework.http.MediaType;

import java.io.File;

import static io.restassured.RestAssured.given;

public class ImageControllerTest extends BaseIntegrationTest {

  @Test
  public void imageTest() throws Exception {
    File file = new File("/tmp/complete/test");
    File newImage = new File("/tmp/complete/test/test.jpg");
    file.mkdirs();
    newImage.createNewFile();

    given()
      .port(port)
      .header(new Header("Cookie", "id=test"))
      .when()
      .get(ImageController.URI + "/test/test")
      .then()
      .statusCode(200)
      .contentType(MediaType.IMAGE_JPEG_VALUE);

    newImage.delete();
    file.delete();
  }
}
