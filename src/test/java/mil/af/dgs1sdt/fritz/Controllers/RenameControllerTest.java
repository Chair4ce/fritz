package mil.af.dgs1sdt.fritz.Controllers;

import io.restassured.http.Header;
import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import mil.af.dgs1sdt.fritz.Models.RenameModel;
import org.junit.Test;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;


public class RenameControllerTest extends BaseIntegrationTest {

  RenameModel rn1 = new RenameModel("image-1.jpg", "14TTTTZMAR19_TEST_ACTY_TEST_TEST1", false);
  RenameModel rn2 = new RenameModel("image-0.jpg", "14TTTTZMAR19_TEST_ACTY_TEST_TEST2", false);

  List<RenameModel> renameList = new ArrayList<>();

  @Test
  public void renameTest() throws Exception {
    renameList.add(rn1);
    renameList.add(rn2);

    given()
      .port(port)
      .multiPart(new File("./PDFExample.pdf"))
      .when()
      .post(UploadController.URI)
      .then()
      .statusCode(200)
      .body("file", equalTo("PDFExample.pdf"));

    File dir = new File("/tmp/complete/219b24ae5d31dad0b8d57774b606c4ca/");
    dir.mkdir();

    Thread.sleep(5000);
//    while dir does not exist, sleep

    given()
      .port(port)
      .header(new Header("Cookie", "id=219b24ae5d31dad0b8d57774b606c4ca"))
      .contentType("application/json")
      .body(renameList)
      .when()
      .post(RenameController.URI)
      .then()
      .statusCode(200);

    assert (
      new File("/tmp/complete/219b24ae5d31dad0b8d57774b606c4ca/")
        .listFiles()[0]
        .toString()
        .contains
          (
            "14TTTTZMAR19_TEST_ACTY_TEST_TEST"
          )
    );
  }
}
